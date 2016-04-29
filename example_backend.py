from flask import Flask, request, render_template
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy import String, DateTime, Text, MetaData
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from werkzeug import SharedDataMiddleware
from hashlib import sha1
from settings import DEBUG, AWS_ACCESS_KEY, AWS_SECRET, MIME_TYPE, BUCKET
from settings import ENGINE, PORT, CHUNK_SIZE, AWS_REGION
from urllib import quote
from datetime import datetime

import os
import hmac
import base64
import time
import json
import random
import hashlib


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

def _sign(key, msg):
    return hmac.new(key, msg.encode("utf-8"), hashlib.sha256).digest()


def _get_signature_key(key, date_stamp, region_name, service_name):
    k_date = _sign(("AWS4" + key).encode("utf-8"), date_stamp)
    k_region = _sign(k_date, region_name)
    k_service = _sign(k_region, service_name)
    k_signing = _sign(k_service, "aws4_request")
    return k_signing


def get_signature(date):
    return _get_signature_key(
        AWS_SECRET, date.strftime("%Y%m%d"), AWS_REGION, "s3").encode('hex')

## Actual backend


@app.route("/upload-backend/signing_key/")
def signing_key():
    date = datetime.utcnow()
    key = get_signature(date)

    filename = request.args['filename']
    filesize = request.args['filesize']
    last_modified = request.args['last_modified']

    data = {
        "date": date.isoformat() + 'Z',
        "signature": key,
        "access_key": AWS_ACCESS_KEY,
        "region": AWS_REGION,
        "bucket": BUCKET,
        "backup_key": str(random.randint(1, 1000000)),
        "content_type": MIME_TYPE,
    }

    try:
        assert 'force' not in request.args
        u = db.query(Upload).filter(
            Upload.filename == filename,
            Upload.filesize == filesize,
            Upload.last_modified == last_modified
        ).first()
        assert u

        data.update({
            "key": u.key,
            "upload_id": u.upload_id,
            "chunks": map(int, u.chunks_uploaded.split(',')),
        })
    except AssertionError:
        db.query(Upload).filter(
            Upload.filename == filename,
            Upload.filesize == filesize,
            Upload.last_modified == last_modified
        ).delete()
        db.commit()

    return json.dumps(data)


@app.route("/upload-backend/chunk_loaded/")
def upload_action():
    key = request.args.get('key')
    upload_id = request.args.get('upload_id')

    filename = request.args['filename']
    filesize = request.args['filesize']
    last_modified = request.args['last_modified']
    chunk = int(request.args['chunk'])

    if filesize > CHUNK_SIZE:
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


## Static files (debugging only)
@app.route("/")
def index():
    return render_template('index.html', aws_access_key=AWS_ACCESS_KEY,
                           mime_type=MIME_TYPE, bucket=BUCKET,
                           region=AWS_REGION,
                           key=str(random.randint(1, 1000000)))


if app.debug:
    app.wsgi_app = SharedDataMiddleware(app.wsgi_app, {
        '/': os.path.join(os.path.dirname(__file__), '')
    })


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)
