from flask import Flask, request, render_template
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy import String, DateTime, Text, MetaData
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from werkzeug import SharedDataMiddleware
from hashlib import sha1
from settings import DEBUG, AWS_ACCESS_KEY, AWS_SECRET, MIME_TYPE, BUCKET
from settings import ENGINE, PORT

import os
import hmac
import base64
import time
import json
import random


## The Upload DB Model
engine = create_engine(ENGINE, convert_unicode=True)
db = scoped_session(sessionmaker(
    autocommit=False, autoflush=True, bind=engine))

Base = declarative_base()
Base.query = db.query_property()
metadata = MetaData()


class Upload(Base):
    __tablename__ = 'upload'
    id = Column(Integer, primary_key=True)
    filename = Column(String(256))
    filesize = Column(String(64))
    last_modified = Column(String(64))

    upload_start = Column(DateTime)
    last_information = Column(DateTime)

    key = Column(String(256))
    upload_id = Column(String(128))
    chunks_uploaded = Column(Text)

Upload.metadata.create_all(bind=engine)


## Boilerplate
app = Flask(__name__)
app.debug = DEBUG


def init_db():
    metadata.create_all(bind=engine)
init_db()


@app.teardown_request
def teardown_db(exception=None):
    db.remove()


## Helper Functions

def _process_string(string):
    return base64.b64encode(
        hmac.new(AWS_SECRET,
                 string, sha1).digest())


def _http_date():
    return time.strftime("%a, %d %b %Y %X %Z", time.localtime())


def _action_init(key, date=None):
    date = date or _http_date()
    print "POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:{}\n/{}/{}?uploads".format(
            date, BUCKET, key)
    return _process_string(
        "POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:{}\n/{}/{}?uploads".format(
            date, BUCKET, key)), date


def _action_chunk(key, upload_id, chunk, date=None):
    date = date or _http_date()
    return _process_string(
        "PUT\n\n{}\n\nx-amz-date:{}\n/{}/{}?partNumber={}&uploadId={}".format(
            MIME_TYPE, date, BUCKET, key, chunk, upload_id)), date


def _action_list(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string(
        "GET\n\n\n\nx-amz-date:{}\n/{}/{}?uploadId={}".format(
            date, BUCKET, key, upload_id)), date


def _action_end(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string(
        "POST\n\n{}\n\nx-amz-date:{}\n/{}/{}?uploadId={}".format(
        MIME_TYPE, date, BUCKET, key, upload_id)), date


def _action_delete(key, upload_id, date=None):
    date = date or _http_date()
    return _process_string("DELETE\n\n\n\nx-amz-date:{}\n/{}/{}?uploadId={}".format(
                           date, BUCKET, key, upload_id)), date

## Actual backend


@app.route("/upload-backend/<action>/")
def upload_action(action):
    key = request.args.get('key')
    upload_id = request.args.get('upload_id')
    chunk = request.args.get('chunk')
    string = date = None

    if action == 'chunk_loaded':
        filename = request.args['filename']
        filesize = request.args['filesize']
        last_modified = request.args['last_modified']
        chunk = int(request.args['chunk'])

        if filesize > 6 * 1024 * 1024:  # 6MB
            try:
                u = db.query(Upload).filter(
                    Upload.filename == filename,
                    Upload.filesize == filesize,
                    Upload.last_modified == last_modified
                ).first()
                assert u

                chunks = set(map(int, u.chunks_uploaded.split(',')))
                chunks.add(chunk)
                u.chunks_uploaded = ','.join(map(str, chunks))
                db.commit()

            except AssertionError:
                u = Upload(
                    filename=filename,
                    filesize=filesize,
                    last_modified=last_modified,
                    chunks_uploaded=str(chunk),
                    key=key,
                    upload_id=upload_id,
                )
                db.add(u)
                db.commit()

        return ''

    if action == 'get_all_signatures':
        date = _http_date()
        list_signature, _ = _action_list(key, upload_id, date)
        end_signature, _ = _action_end(key, upload_id, date)
        delete_signature, _ = _action_delete(key, upload_id, date)
        num_chunks = int(request.args['num_chunks'])
        chunk_signatures = dict([(chunk, (_action_chunk(key, upload_id, chunk, date)))
                                for chunk in xrange(1, num_chunks + 1)])

        return json.dumps({
            'list_signature': [list_signature, date],
            'end_signature': [end_signature, date],
            'chunk_signatures': chunk_signatures,
        })

    if action == 'get_init_signature':
        filename = request.args['filename']
        filesize = request.args['filesize']
        last_modified = request.args['last_modified']

        try:
            assert 'force' not in request.args
            u = db.query(Upload).filter(
                Upload.filename == filename,
                Upload.filesize == filesize,
                Upload.last_modified == last_modified
            ).first()
            assert u

            string, date = _action_init(u.key)
            return json.dumps({
                "signature": string,
                "date": date,
                "key": u.key,
                "upload_id": u.upload_id,
                "chunks": map(int, u.chunks_uploaded.split(','))
            })
        except AssertionError:
            pass  # continue normally
        except AssertionError:
            db.query(Upload).filter(
                Upload.filename == filename,
                Upload.filesize == filesize,
                Upload.last_modified == last_modified
            ).delete()

        string, date = _action_init(key)

    elif action == 'get_chunk_signature':
        string, date = _action_chunk(key, upload_id, chunk)

    elif action == 'get_list_signature':
        string, date = _action_list(key, upload_id)

    elif action == 'get_end_signature':
        string, date = _action_end(key, upload_id)

    elif action == 'get_delete_signature':
        string, date = _action_delete(key, upload_id)

    return json.dumps({
        'signature': string,
        'date': date,
    })


## Static files (debugging only)
@app.route("/")
def index():
    return render_template('index.html', aws_access_key=AWS_ACCESS_KEY,
                           mime_type=MIME_TYPE, bucket=BUCKET,
                           key=str(random.randint(1, 1000000)))


if app.debug:
    app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
        '/': os.path.join(os.path.dirname(__file__), '')
    })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)
