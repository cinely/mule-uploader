"""
This file is supposed to be a django view, and is
stripped down to show how the backend should look like
The code is NOT intended to be working out of the box.
"""

from django.http import HttpResponse
from django.core.cache import cache
from django.conf import settings

from utils import HttpResponseJson
from hashlib import sha1

import hmac
import base64
import time
import re


MIME_TYPE = "video"
AWS_ACCESS_KEY = "YOURSECRETAWSACCESSKEY"

def _process_string(string):
    return base64.b64encode(hmac.new( \
            AWS_ACCESS_KEY, string, sha1).digest())

def _http_date():
    return time.strftime("%a, %d %b %Y %X %Z", time.localtime())

def _action_init(key, date=None):
    date = date or _http_date()
    return _process_string("""POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:{}\n/akiai-raw/{}?uploads""".format(
            date, key)), date

def _action_chunk(key, upload_id, chunk, date=None):
    date = date or _http_date()
    return _process_string("""PUT\n\n{0}\n\nx-amz-date:{1}\n/akiai-raw/{2}?partNumber={3}&uploadId={4}""".format(
            MIME_TYPE, date, key, chunk, upload_id)), date

def _action_list(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string("""GET\n\n\n\nx-amz-date:{0}\n/akiai-raw/{1}?uploadId={2}""".format(
            date, key, upload_id)), date

def _action_end(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string("""POST\n\n{0}\n\nx-amz-date:{1}\n/akiai-raw/{2}?uploadId={3}""".format(
            MIME_TYPE, date, key, upload_id)), date

def upload_action(request, action):
    key = request.GET.get('key')
    upload_id = request.GET.get('upload_id')
    chunk = request.GET.get('chunk')
    string = date = None

    if action == 'get_all_signatures':
        date = _http_date()
        list_signature, _ = _action_list(key, upload_id)
        end_signature, _ = _action_end(key, upload_id)
        num_chunks = int(request.GET['num_chunks'])
        chunk_signatures = dict([(chunk, (_action_chunk(key, upload_id, chunk))) for chunk in xrange(1, num_chunks+1)])

        return HttpResponseJson({
            'list_signature': [list_signature, date],
            'end_signature': [end_signature, date],
            'chunk_signatures': chunk_signatures,
        })

    if action == 'chunk_loaded':
        filename = request.GET['filename']
        filesize = request.GET['filesize']
        last_modified = request.GET['last_modified']
        chunk = int(request.GET['chunk'])
        filename = re.sub("[^a-zA-Z0-9]", "", filename)
        cache_key = "upload-{}-{}-{}".format(filename, filesize, last_modified)
        v = cache.get(cache_key) or {}
        v["upload_id"] = upload_id
        v["key"] = key
        v["chunks"] = list(set(v.get("chunks", []) + [chunk]))
        cache.set(cache_key, v, 86400 * 365)
        return HttpResponse()

    if action == 'get_init_signature':
        filename = request.GET['filename']
        filesize = request.GET['filesize']
        last_modified = request.GET['last_modified']
        filename = re.sub("[^a-zA-Z0-9]", "", filename)
        cache_key = "upload-{}-{}-{}".format(filename, filesize, last_modified)

        v = cache.get(cache_key)
        if v is not None:
            key = v["key"]
            upload_id = v["upload_id"]
            string, date = _action_init(key)
            chunks = v["chunks"]
            print v
            return HttpResponseJson({
                "signature": string,
                "date": date,
                "key": key,
                "upload_id": upload_id,
                "chunks": chunks
            })

        string, date = _action_init(key)

    elif action == 'get_chunk_signature':
        string, date = _action_chunk(key, upload_id, chunk)

    elif action == 'get_list_signature':
        string, date = _action_list(key, upload_id)

    elif action == 'get_end_signature':
        string, date = _action_end(key, upload_id)

    return HttpResponseJson({
        'signature': string,
        'date': date,
    });
