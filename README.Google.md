Mule-upload
===========

This is an ES7 javascript implementation of the Google Cloud Storage API which relies on an authorization backend in order to limit in-browser security threats.

It implements multiple parallel chunk uploads in order to boost performance.

# User guide
In order to **control** which files can be uploaded by the browser to a google cloud storage bucket **without** giving it a full access, the library will request a signed identifier from the **backend**.

Bucket selection is made at the backend level.

It is under the responsibility of the backend to make all needed verifications and then sign (or not) an identifier which is then provided the the library, enable subsequent uploads.

The muleUploader library is available as an [UMD package](https://github.com/umdjs/umd) in `dist/MuleUploader.js`.

The library is exposed under multiple module definitions, allowing it to work with CommonJS, AMD and as global variable.

```
	<script src="MuleUploader.js"></script>
	<script>
		var gcs = new muleUploader.GCSUpload();

		gcs.loadFile(myFile);
		gcs.run();
	</script>
```

Alternatively, you can pass an options object in order to fine tune the uploader :
```
{
	uploadAuthorizationURL: "http://localhost:8081/authorize/upload",	// the backend URL to authorize uploads
	composeAuthorizationURL: "http://localhost:8081/authorize/compose",	// the backend URL to authorize composition
	authorizeFetchMode: 'cors',					// cors, no-cors, same-origin, navigate
	authorizeSecurityMode: 'session',					// session, signed-uri
	chunkSize: 256*1024*1024						// maximum content length sent per HTTP PUT call, a small size will reduce content being re-uploaded when an error occurs, at a noticable transfer speed cost
	parallelUploads: 1,							// how many parallel upload runners
	parallelMinSize: 256*1024*1024,					// minimal object size to decide maximum number of runners, should not be lower than chunkSize
	onProgressCallback: null,						// a function that will be called with progress status
	onErrorRetryCount: 2						// how many retries after a fault chunk upload
	averageBitrateSmoothingFactor: 0.8			// how stable the speed should appear (0 mean no smoothing, must be < 1)
}
```

A demo of the browser side javascript implementation is available [here](test/index.html).

A demo of the server side authorization implementation is available [here](backends/python/main.py).

# Developers
You can run the stack through a simple `docker-compose up --build`, you might require a key.json in order to have the backend working.
