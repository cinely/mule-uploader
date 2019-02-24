import json
import urllib
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession
from wsgiref.simple_server import make_server

GOOGLE_CLOUD_AUTHENTICATION_FILE = 'key.json'
GOOGLE_CLOUD_SCOPE = 'https://www.googleapis.com/auth/cloud-platform'
GOOGLE_CLOUD_STORAGE_COMPOSE_REQUEST_KIND = 'storage#composeRequest'

BUCKET="arched-album-228205"

HEADER_UPLOAD_ID = 'X-GUploader-UploadID'
HEADER_UPLOAD_URI = 'Location'

def buildResponse(message, start_response):
	serialized	= json.dumps(message, separators=(',', ':'))
	encoded		= bytes(serialized, 'utf-8')
	headers		= [
		('Content-Type', 'application/json'),
		('Access-Control-Allow-Origin', '*')
		]
	start_response("200 OK", headers)
	return [encoded]

def buildErrorResponse(error, start_response):
	headers = [
		('Content-Type','text/plain'),
		('Access-Control-Allow-Origin', '*')
		]
	start_response(bytes(error, 'utf-8'), headers)
	return []

def getAuthorizedSession():
	try:
		credentials = service_account.Credentials.from_service_account_file(GOOGLE_CLOUD_AUTHENTICATION_FILE)
		scoped_credentials = credentials.with_scopes([GOOGLE_CLOUD_SCOPE])
		return AuthorizedSession(scoped_credentials)
	except FileNotFoundError:
		raise Exception("unreadable authentication file"%GOOGLE_CLOUD_AUTHENTICATION_FILE)

def composeAuthorization(environ, start_response):
	parameters = urllib.parse.parse_qs(environ['QUERY_STRING'])
	if not 'fileName' in parameters:
		return buildErrorResponse("400 missing parameters", start_response)

	try:
		request_body_size = int(environ.get('CONTENT_LENGTH', 0))
	except ValueError:
		return buildErrorResponse("400 missing content length", start_response)

	request_body = environ['wsgi.input'].read(request_body_size)
	objectsComposition = json.loads(request_body)

	try:
		session = getAuthorizedSession()
	except Exception:
		return buildErrorResponse("500 authentication failure", start_response)

	body = {
		'sourceObjects': objectsComposition
		}
	headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}

	try:
		response = session.post("https://www.googleapis.com/storage/v1/b/%s/o/%s/compose"%(BUCKET, parameters['fileName'][0]), data=json.dumps(body), headers=headers)
		if ( response.status_code < 200 or response.status_code > 299 ):
			raise Exception("error while authorizing compose", response.status_code, response.reason)
		objectResource = response.json()

		for storageObject in objectsComposition:
			response = session.delete("https://www.googleapis.com/storage/v1/b/%s/o/%s"%(BUCKET, storageObject['name']))
			if ( response.status_code < 200 or response.status_code > 299 ):
				raise Exception("error while deleting storage object", response.status_code, response.reason)

		return buildResponse(objectResource, start_response)
	except Exception as error:
		return buildErrorResponse("500 compositing failure", start_response)

def uploadAuthorization(environ, start_response):
	parameters = urllib.parse.parse_qs(environ['QUERY_STRING'])
	if not 'fileName' in parameters or not 'fileSize' in parameters:
		return buildErrorResponse("400 missing parameters", start_response)

	try:
		session = getAuthorizedSession()
	except Exception:
		return buildErrorResponse("500 authentication failure", start_response)

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

	try:
		response = session.post("https://www.googleapis.com/upload/storage/v1/b/%s/o"%BUCKET, params = args, headers = headers)

		if ( response.status_code < 200 or response.status_code > 299 ):
			raise Exception("error while authorizing upload", response.reason)
		if not (HEADER_UPLOAD_ID in response.headers and HEADER_UPLOAD_URI in response.headers):
			raise Exception("error while authorizing upload", response.reason)
		answer = {
			'uploadId': response.headers[HEADER_UPLOAD_ID],
			'uploadURI': response.headers[HEADER_UPLOAD_URI],
		}
		return buildResponse(answer, start_response)
	except Exception as error:
		return buildErrorResponse("500 request failure", start_response)

def muleUploaderBackend(environ, start_response):
	routes = {
		'/authorize/upload': uploadAuthorization,
		'/authorize/compose': composeAuthorization
	}
	if environ['PATH_INFO'] not in routes.keys():
		return buildErrorResponse("404 not found", start_response)
	return routes[environ['PATH_INFO']](environ, start_response)

with make_server('', 80, muleUploaderBackend) as httpd:
    print("Serving HTTP on port 80...")

    # Respond to requests until process is killed
    httpd.serve_forever()




