import os

MIME_TYPE = os.environ.get('MIME_TYPE', "application/octet-stream")
BUCKET = os.environ.get('BUCKET', "my_bucket")
AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")
AWS_SECRET = os.environ.get('AWS_SECRET', "the_secret_access_key")
AWS_ACCESS_KEY = os.environ.get('AWS_ACCESS_KEY', "the_public_access_key")
DEBUG = bool(int(os.environ.get('DEBUG', 1)))
ENGINE = os.environ.get('DATABASE_URL', 'sqlite:///database.db')
PORT = int(os.environ.get('PORT', 5000))
CHUNK_SIZE = 6 * 1024 * 1024  # CAREFUL! If you modify this, you have to
                              # clear the chunk database; I recommend
                              # setting it before having any real upload data
