import os

MIME_TYPE = os.environ.get('MIME_TYPE', "the_mime_type")
BUCKET = os.environ.get('BUCKET', "my-bucket")
AWS_SECRET = os.environ.get('AWS_SECRET', 'TheSecretAcessKey')
AWS_ACCESS_KEY = os.environ.get('AWS_ACCESS_KEY', "ThePublicAccessKey")
DEBUG = bool(int(os.environ.get('DEBUG', 1)))
ENGINE = os.environ.get('HEROKU_POSTGRESQL_OLIVE_URL', 'sqlite:///database.db')
PORT = os.environ.get('PORT', 5000)
