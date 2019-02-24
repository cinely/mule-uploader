import json
import urllib
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession
from wsgiref.simple_server import make_server

RESPONSE_HEADERS = [
	('Content-Type','application/json'),
	('Access-Control-Allow-Origin', '*')
	]

GOOGLE_CLOUD_SCOPE = 'https://www.googleapis.com/auth/cloud-platform'

BUCKET="arched-album-228205"

HEADER_UPLOAD_ID = 'X-GUploader-UploadID'
HEADER_UPLOAD_URI = 'Location'

def prepareMessage(object):
	serialized = json.dumps(object)
	return serialized.encode('utf-8')

def composeAuthorization(environ, start_response):
	headers = [('Content-type', 'text/plain; charset=utf-8')]
	start_response('500 ', headers)
	return [b'not implemented']

def uploadAuthorization(environ, start_response):
	parameters = urllib.parse.parse_qs(environ['QUERY_STRING'])
	if not 'fileName' in parameters or not 'fileSize' in parameters:
		start_response('400 missing parameters', RESPONSE_HEADERS)
		return [prepareMessage("missing parameters")]
	try:
		credentials = service_account.Credentials.from_service_account_file('key.json')
		scoped_credentials = credentials.with_scopes([GOOGLE_CLOUD_SCOPE])

		# request = google.auth.transport.requests.Request()
		# credentials.refresh(request)

		authed_session = AuthorizedSession(scoped_credentials)
		args = {
			'uploadType': 'resumable',
			'name': parameters['fileName'][0],
			}
		headers = {
			'Origin': 'http://localhost:8080',
			'X-Upload-Content-Length': parameters['fileSize'][0]
		}
		# X-Upload-Content-Type. Optional. Set to the MIME type of the file data, which is transferred in subsequent requests. If the MIME type of the data is not specified in metadata or through this header, the object is served as application/octet-stream.
		# X-Upload-Content-Length. Optional. Set to the number of bytes of file data, which will be transferred in subsequent requests.
		# Content-Type. Required if you have metadata for the file. Set to application/json; charset=UTF-8.
		# Content-Length. Required unless you are using chunked transfer encoding. Set to the number of bytes in the body of this initial request.
		# Origin, if you have enabled Cross-Origin Resource Sharing. You must also use this header in subsequent upload requests.

		response = authed_session.post("https://www.googleapis.com/upload/storage/v1/b/%s/o"%BUCKET, params = args, headers = headers, verify = True)
		print(response.headers)

		if ( response.status_code < 200 or response.status_code > 299 ):
			raise Exception("error while getting resumable session URI", response.reason)
		if not (HEADER_UPLOAD_ID in response.headers and HEADER_UPLOAD_URI in response.headers):
			raise Exception("error while getting resumable session URI", response.reason)
		answer = {
			'uploadId': response.headers[HEADER_UPLOAD_ID],
			'uploadURI': response.headers[HEADER_UPLOAD_URI],
		}
	except FileNotFoundError:
		start_response('500 File not found', RESPONSE_HEADERS)
		return [prepareMessage(None)]
	start_response('200 OK', RESPONSE_HEADERS)
	return [prepareMessage(answer)]


def muleUploaderBackend(environ, start_response):
	routes = {
		'/authorize/upload': uploadAuthorization,
		'/authorize/compose': composeAuthorization
	}
	if environ['PATH_INFO'] not in routes.keys():
		status = '404 OK'
		headers = [('Content-type', 'text/plain; charset=utf-8')]
		start_response(status, headers)
		return [b'Not found']
	return routes[environ['PATH_INFO']](environ, start_response)

with make_server('', 80, muleUploaderBackend) as httpd:
    print("Serving HTTP on port 80...")

    # Respond to requests until process is killed
    httpd.serve_forever()




