from django.http import HttpResponse
from django.core.cache import cache
from django.conf import settings

from etc.common.utils import HttpResponseJson
from hashlib import sha1
from upload.models import UploadInformation

import hmac
import base64
import time
import re


# UploadInformation db model
class UploadInformation(models.Model):
    filename = models.CharField(max_length=256)
    filesize = models.CharField(max_length=64)
    last_modified = models.CharField(max_length=64) # timestamp

    upload_start = models.DateTimeField(auto_now_add=True)
    last_information = models.DateTimeField(auto_now=True) # last update of this object

    key = models.CharField(max_length=256)
    upload_id = models.CharField(max_length=128)
    chunks_uploaded = models.TextField()



# view
MIME_TYPE = "the_mime_type"
BUCKET = "your_bucket"

def _process_string(string):
    return base64.b64encode(hmac.new( \
            'aws_secret_access_key', string, sha1).digest())

def _http_date():
    return time.strftime("%a, %d %b %Y %X %Z", time.localtime())

def _action_init(key, date=None):
    date = date or _http_date()
    return _process_string("POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:{}\n/{}/{}?uploads".format(
            date, BUCKET, key)), date

def _action_chunk(key, upload_id, chunk, date=None):
    date = date or _http_date()
    return _process_string("PUT\n\n{}\n\nx-amz-date:{}\n/{}/{}?partNumber={}&uploadId={}".format(
            MIME_TYPE, date, BUCKET, key, chunk, upload_id)), date

def _action_list(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string("GET\n\n\n\nx-amz-date:{}\n/{}/{}?uploadId={}".format(
            date, BUCKET, key, upload_id)), date

def _action_end(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string("POST\n\n{}\n\nx-amz-date:{}\n/{}/{}?uploadId={}".format(
            MIME_TYPE, date, BUCKET, key, upload_id)), date

def _action_delete(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string("DELETE\n\n\n\nx-amz-date:{}\n/{}/{}?uploadId={}".format(
            date, BUCKET, key, upload_id)), date

def upload_action(request, action):
    key = request.GET.get('key')
    upload_id = request.GET.get('upload_id')
    chunk = request.GET.get('chunk')
    string = date = None

    if action == 'chunk_loaded':
        filename = request.GET['filename']
        filesize = request.GET['filesize']
        last_modified = request.GET['last_modified']
        chunk = int(request.GET['chunk'])

        if filesize > 6 * 1024 * 1024: # 6MB
            try:
                u = UploadInformation.objects.get(
                    filename=filename,
                    filesize=filesize,
                    last_modified=last_modified
                )
                chunks = set(map(int, u.chunks_uploaded.split(',')))
                chunks.add(chunk)
                u.chunks_uploaded = ','.join(map(str, chunks))
                u.save()
            except UploadInformation.DoesNotExist:
                UploadInformation.objects.create(
                    filename=filename,
                    filesize=filesize,
                    last_modified=last_modified,
                    chunks_uploaded=str(chunk),
                    key=key,
                    upload_id=upload_id,
                )

        return HttpResponse()

    if action == 'get_all_signatures':
        date = _http_date()
        list_signature, _ = _action_list(key, upload_id, date)
        end_signature, _ = _action_end(key, upload_id, date)
        delete_signature, _ = _action_delete(key, upload_id, date)
        num_chunks = int(request.GET['num_chunks'])
        chunk_signatures = dict([(chunk, (_action_chunk(key, upload_id, chunk, date))) for chunk in xrange(1, num_chunks+1)])

        return HttpResponseJson({
            'list_signature': [list_signature, date],
            'end_signature': [end_signature, date],
            'chunk_signatures': chunk_signatures,
        })

    if action == 'get_init_signature':
        filename = request.GET['filename']
        filesize = request.GET['filesize']
        last_modified = request.GET['last_modified']

        try:
            assert 'force' not in request.GET
            u = UploadInformation.objects.get(
                filename=filename,
                filesize=filesize,
                last_modified=last_modified
            )
            string, date = _action_init(u.key)
            return HttpResponseJson({
                "signature": string,
                "date": date,
                "key": u.key,
                "upload_id": u.upload_id,
                "chunks": map(int, u.chunks_uploaded.split(','))
            })
        except UploadInformation.DoesNotExist:
            pass # continue normally
        except AssertionError:
            UploadInformation.objects.filter(filename=filename, filesize=filesize,
                    last_modified=last_modified).delete()

        string, date = _action_init(key)

    elif action == 'get_chunk_signature':
        string, date = _action_chunk(key, upload_id, chunk)

    elif action == 'get_list_signature':
        string, date = _action_list(key, upload_id)

    elif action == 'get_end_signature':
        string, date = _action_end(key, upload_id)

    elif action == 'get_delete_signature':
        string, date = _action_delete(key, upload_id)

    return HttpResponseJson({
        'signature': string,
        'date': date,
    });
