Mule-upload
===========

[You can test the uploader here!](http://tranquil-spire-1625.herokuapp.com/)

### Stubborn HTML5 File Uploader for Amazon S3

#### Features:

* VERY resilient against upload interruptions. Even if your internet connection goes down, you accidentally close the browser or you want to continue the upload tomorrow, your upload progress is saved.
* HTML5 - uses the `File`, `FileList` and `Blob` objects

In order to use this library, you need the following:

* an Amazon S3 bucket where the files will get uploaded
* CORS settings allowing REST operations from your domain
* a backend that generates signatures, and optionally keeps track of uploaded chunks (for smart resume, e.g. after you refresh your browser)

#### Set up:

1. You need to create an Amazon S3 bucket for uploads
2. You need to edit your Amazon S3 CORS configuration to allow communication from your domain. Here is what I use:

     ```xml
     <CORSRule>
         <AllowedOrigin>[your domain]</AllowedOrigin>
         <AllowedMethod>PUT</AllowedMethod>
         <AllowedMethod>POST</AllowedMethod>
         <AllowedMethod>DELETE</AllowedMethod>
         <AllowedMethod>GET</AllowedMethod>
         <AllowedMethod>HEAD</AllowedMethod>
         <MaxAgeSeconds>3000</MaxAgeSeconds>
         <AllowedHeader>*</AllowedHeader>
     </CORSRule>
     ```
     
3. You need a backend to sign your REST requests (a Flask + SQLAlchemy one is available at example_backend.py). Here is an example Python snippet to sign an upload start request:

    ```python
    import time
    sign_date = time.strftime("%a, %d %b %Y %X %Z", time.localtime())
    request = "POST\n\n\n\nx-amz-acl:public-read\nx-amz-date:{}\n/some_key?uploads" \
            .format(date)
    signature = base64.b64encode(hmac.new(AWS_SECRET_KEY, request, sha1).digest())
    ````
    
4. For detailed instructions about how each of the ajax actions should respond, read the source code; there are six actions:
  * `get_init_signature` - returns a signature for upload initiation -- http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadInitiate.html
  * `get_chunk_signature` - returns a signature for a part upload -- http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadUploadPart.html
  * `get_list_signature` - returns a signature for listing all the uploaded parts -- http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadListParts.html
  * `get_end_signature` - returns a signature for ending an upload -- http://docs.amazonwebservices.com/AmazonS3/latest/API/mpUploadComplete.html
  * `get_all_signatures` - (optional) based on a file `key` / `upload_id` and file size, it returns the list and end signatures, as well as signatures for all chunk uploads
  * `chunk_loaded` - (optional) notifies the server that a chunk has been uploaded; this is needed for browser-refresh resume (the backend will store the chunks in a database, and give the user the file key + upload id + chunks uploaded for the file to be uploaded)


If you'd want example backends in other languages/with other frameworks, let me know. 