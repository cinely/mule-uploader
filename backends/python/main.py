#!/usr/bin/env python3

import json
import urllib
from google.oauth2 import service_account
from google.auth.transport.requests import AuthorizedSession

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

def application(environ, start_response):
	parameters = urllib.parse.parse_qs(environ['QUERY_STRING'])
	if not 'fileName' in parameters:
		start_response('400', RESPONSE_HEADERS)
		return [prepareMessage(None)]
	try:
		credentials = service_account.Credentials.from_service_account_file('key.json')
		scoped_credentials = credentials.with_scopes([GOOGLE_CLOUD_SCOPE])

		# request = google.auth.transport.requests.Request()
		# credentials.refresh(request)

		authed_session = AuthorizedSession(scoped_credentials)
		args = {
			'uploadType': 'resumable',
			'name': parameters['fileName']
			}
		response = authed_session.post("https://www.googleapis.com/upload/storage/v1/b/%s/o"%BUCKET, params = args, verify = True)
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
		start_response('500', RESPONSE_HEADERS)
		return [prepareMessage(None)]
	start_response('200 OK', RESPONSE_HEADERS)
	return [prepareMessage(answer)]
