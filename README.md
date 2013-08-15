Mule-upload
===========

[You can test the uploader here!](http://mule-uploader.com/)

### Stubborn HTML5 File Uploader for Amazon S3

#### Features:

* VERY resilient against upload interruptions. Even if your internet connection goes down, you accidentally close the browser or you want to continue the upload tomorrow, your upload progress is saved.
* HTML5 - uses the `File`, `FileList` and `Blob` objects
* Speed - it uses four workers for (potentially) four time increase in upload speed. E.g. on my computer I got 2.5-3 MB/s vs. < 1MB/s using only one worker.

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


#### How do I run the example locally?

1. Navigate to the project's root, e.g. `cd mule-uploader`
2. Install requirements.txt: `pip install -r requirements.txt`
3. Set up environment variables:
   1. `export AWS_ACCESS_KEY=[your access_key]`
   2. `export AWS_SECRET=[your access_key's secret]`
   3. `export BUCKET=[your AWS bucket]`
   4. (optionally) `export MIME_TYPE=[your desired mime-type]`. Defaults to `application/octet-stream`
   5. (optionally) `export DATABASE_URL=[your db url]`. Notice that the db url looks like `postgres://user:password@location:port/db_name` or `sqlite:///file`. Defaults to `sqlite:///database.db`
   6. (optionally) `export PORT=[your desired port]`. Defaults to `5000`
   7. (optionally) `export CHUNK_SIZE=[chunk size in bytes]`. Defaults to 6MB i.e. `6291456`

   You can see and modify these options in `settings.py`.

4. Run `python example_backend.py`
5. Navigate to `http://localhost:[PORT]/`, where `[PORT]` is the value given at 3.6.
6. 

#### The fine print

Due to the new technology used by this library, it's only compatible with the following browsers:

* Updated Chrome
* Updated Firefox
* Safari 6+
* not sure about IE
