Mule-upload
===========

[You can test the uploader here!](http://mule-uploader.com/)

### Stubborn HTML5 File Uploader for Amazon S3

#### Features:

* VERY resilient against upload interruptions. Even if your internet connection goes down, you accidentally close the browser or you want to continue the upload tomorrow, your upload progress is saved. Hell, it even works if you switch browsers or wifi connections!
* HTML5 - uses the `File`, `FileList`, and `Blob` objects
* Speed - it uses multiple workers for (potentially) four time increase in upload speed. E.g. on my computer I got 2.5-3 MB/s vs. < 1MB/s using only one worker. There is a tradeoff between upload speed and CPU consumption though.

#### What people think of it:

> We use Mule Uploader to archive audio in our Rails/AngularJS application www.popuparchive.org. I tried many projects that integrate with S3 in various ways before using this. By using the multipart upload API, multiple threads, and resumable uploads, it met our essential needs for handling large media files, and without requiring a specific UI or DOM elements.  It also came with no dependencies on jQuery or other libraries, making it easy to add to our AngularJS front-end. 
>
> -- Andrew Kuklewicz, Tech Director prx.org, Lead Developer www.popuparchive.org.


#### Set up:

In order to use this library, you need the following:

* an Amazon S3 bucket where the files will get uploaded
* CORS settings allowing REST operations from your domain
* a backend that generates signatures, and optionally keeps track of uploaded chunks (for smart resume, e.g. after you refresh your browser)

1. You need to create an Amazon S3 bucket for uploads
2. You need to edit your Amazon S3 CORS configuration to allow communication from your domain. Here is what I use:

     ```xml
     <CORSRule>
         <AllowedOrigin>[your domain]</AllowedOrigin>
         <AllowedMethod>PUT</AllowedMethod>
         <AllowedMethod>POST</AllowedMethod>
         <AllowedMethod>GET</AllowedMethod>
         <AllowedMethod>HEAD</AllowedMethod>
         <MaxAgeSeconds>3000</MaxAgeSeconds>
         <AllowedHeader>*</AllowedHeader>
     </CORSRule>
     ```

3. You need a backend to sign your REST requests (a Flask + SQLAlchemy one is available at example_backend.py). 
Here are code samples for creating the signing key: http://docs.aws.amazon.com/general/latest/gr/signature-v4-examples.html

4. For detailed instructions about how each of the ajax actions should respond, read the source code; there are two actions:
  * `signing_key` - returns a signature for authentication -- http://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html . Also returns key/upload\_id/chunks if the file upload can be resumed. Should also return a backup\_key to be used in case that the first one is not usable.
  * `chunk_loaded` - (optional) notifies the server that a chunk has been uploaded; this is needed for browser-refresh resume (the backend will store the chunks in a database, and give the user the file key + upload id + chunks uploaded for the file to be uploaded)


If you'd want example backends in other languages/with other frameworks, let me know.


#### How do I run the example locally?

1. Navigate to the project's root, e.g. `cd mule-uploader`
2. Install requirements.txt: `pip install -r requirements.txt`
3. Set up environment variables:
   1. `export AWS_ACCESS_KEY=[your access_key]`
   2. `export AWS_SECRET=[your access_key's secret]`
   3. `export AWS_REGION=[your bucket's region]`
   4. `export BUCKET=[your AWS bucket]`
   5. (optionally) `export MIME_TYPE=[your desired mime-type]`. Defaults to `application/octet-stream`
   6. (optionally) `export DATABASE_URL=[your db url]`. Notice that the db url looks like `postgres://user:password@location:port/db_name` or `sqlite:///file`. Defaults to `sqlite:///database.db`
   7. (optionally) `export PORT=[your desired port]`. Defaults to `5000`
   8. (optionally) `export CHUNK_SIZE=[chunk size in bytes]`. Defaults to 6MB i.e. `6291456`

   You can see and modify these options in `settings.py`.

4. Run `python example_backend.py`
5. Navigate to `http://localhost:[PORT]/`, where `[PORT]` is the value given at 3.7.

#### The fine print

Due to the new technology used by this library, it's only compatible with the following browsers:

* Updated Chrome
* Updated Firefox
* Safari 6+
* not sure about IE
