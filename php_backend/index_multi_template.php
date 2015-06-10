<!DOCTYPE html>
<html>
    <head>
        <title>Mule Uploader</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
        <script type="text/javascript" id="mule" src="../mule-uploader.js"></script>
        <style>
            body {
                background:
                url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAAHo5CkKAAAABlBMVEUaGhoiIiJbxTWgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAKZJREFUOMuVVFsOgDAMgvtf2o/pRh2rmMykawf0FQEQAAgOq363c9x5+wm1F04tTl4JTbbqUVofFUv9RFXctSqfia5jAS3WvbN8v7Eur3UFa9d5qmnG+GAgZgNUavKdaA+kfef4OqDm5+pogKUvrn/uuJrMJIKqVwLcXX5itKJb3yPRUyNOdde+us2PRZvtSJ9lomkJWUN+in4NKxt9LBqtpft37K4L/ygCEzzKQAwAAAAASUVORK5CYII=);
            }
            .container {
                margin-top: 5px;
            }
            .footer {
                width: 100%;
                text-align: center;
            }
            .progress {
                width: 585px;
                height: 25px;
                margin: 10px 2px;
            }
            .progress .progress-bar {
                padding-top: 2px;
                color: white;
                font-weight: bold;
                overflow: hidden;
            }
            h1 {
                font-family: "Carme";
            }
            #log {
                width: 586px;
            }
            .email {
                unicode-bidi: bidi-override;
                direction: rtl;
            }
        </style>
        <script type="text/javascript">
            var format_size = function(num_bytes) {
                if(num_bytes <= 1024 * 0.8) {
                    return num_bytes + " B";
                } else if(num_bytes <= 1024 * 1024 * 0.8) {
                    return parseInt(num_bytes / 1024, 10) + "." + parseInt(num_bytes / 1024 * 10, 10) % 10 + " KB";
                } else if(num_bytes <= 1024 * 1024 * 1024 * 0.8) {
                    return parseInt(num_bytes / 1024 / 1024, 10) + "." + parseInt(num_bytes / 1024 / 1024 * 10, 10) % 10 + " MB";
                } else {
                    return parseInt(num_bytes / 1024 / 1024 / 1024, 10) + "." + parseInt(num_bytes / 1024 / 1024 / 1024 * 10, 10) % 10 + " GB";
                }
            }
            $(function() {
                var last_update = null;
                var last_uploaded = null;
                var settings = {

                    file_input: document.getElementById("file"),
                    access_key: "<?php echo $backend->AWS_ACCESS_KEY ?>",
                    bucket: "<?php echo $backend->BUCKET ?>",
                    region: "<?php echo $backend->REGION ?>",

                    content_disposition: false, //if false - don't add Content-Disposition:attachment for the uploaded file
                    key_prefix: "test-subdir/", // "subdir" for the uploaded files, used if key is empty or not set, each file will be uploaded under it's own name
                    ajax_base: "backend",


                    max_size: 50 * (1 << 30), // 50 gb
                    on_init: function() {
                        $('#log').prepend("Uploader initialized\n");
                    },
                    on_error: function() {
                        $('#log').prepend("Error occurred! You can help me fix this by filing a bug report here: https://github.com/cinely/mule-uploader/issues\n");
                        $('.progress-bar').removeClass('active');
                    },
                    on_select: function(fileObj, callback) {
                        var u = this;
                        $('#log').prepend("File selected\n");
                        var $cf = $('#current_file');
                        $cf.find('.upload-progress').css('width', null);
                        $cf.find('.progress-bar').addClass('active');
                        $cf.find('.filename').text(fileObj.name);

                        //here we can re-define S3 key file will be uploaded with - set u.settings.key
                        // IF left empty - all files will be uploaded with their own names under key_prefix subdir

                        // OR you may do ajax request to server to get id from the server (for example, if you need to add record to db table and get autoincrement id)
                        // sample server id request code:
                        /*
                        $.getJSON('/url/to/get/server/id', {file: fileObj.name}, function(json, textStatus) {
                            fileObj.server_id = json.id;
                            var file_extension = fileObj.name.split('.').pop();
                            u.settings.key = u.settings.key_prefix + fileObj.server_id + file_extension;
                            callback.call(u, fileObj); //tell mule-uploader to continue upload
                        });
                        return false; //indicate that mule-uploader has to wait for callback() to proceed with file upload
                        */
                    },
                    on_start: function(fileObj) {
                        $('#explanation').animate({'opacity': 0}, 'slow', function() {
                            $(this).text("Now, let the file upload for a bit (more than 6MB, because it uploads in chunks of 6MB), then refresh the page and select the file again. It will blow your mind :) ");
                            $(this).animate({'opacity': 1}, 'slow');
                        });
                        $('#log').prepend("Upload started\n");
                    },
                    on_progress: function(bytes_uploaded, bytes_total) {
                        var u = this;
                        if(!last_update || (new Date - last_update) > 1000) {
                            var percent = bytes_uploaded / bytes_total * 100;
                            var speed = (bytes_uploaded - last_uploaded) / (new Date - last_update) * 1000;
                            last_update = new Date;
                            last_uploaded = bytes_uploaded;

                            var log = "Upload progress: " + format_size(bytes_uploaded) + " / "
                                + format_size(bytes_total) + " (" + parseInt(percent, 10) + "." + parseInt(percent * 10, 10) % 10
                                + "%)";
                            if(speed) {
                                log += "; speed: " + format_size(speed) + "/s";
                            }
                            $('#log').prepend(log + "\n");

                            var text = parseInt(bytes_uploaded / bytes_total * 100) + "%";
                            var $cf = $('#current_file');
                            $cf.find('.progress .progress-bar').css('width', (bytes_uploaded / bytes_total * 100) + "%").text(text);

                            var $ca = $('#all_files');
                            var text = parseInt( (u.files_total_uploaded_size+bytes_uploaded) / u.files_total_size * 100) + "%";
                            $ca.find('.progress .progress-bar').css('width', ( (u.files_total_uploaded_size+bytes_uploaded) / u.files_total_size * 100) + "%").text(text);
                        }
                    },
                    on_chunk_uploaded: function() {
                        $('#log').prepend("Chunk finished uploading\n");
                    },
                    on_complete: function(fileObj) {
                        var u = this;
                        var url = "http://<?php echo $backend->BUCKET ?>.s3.amazonaws.com/" + this.settings.key;
                        $('#log').prepend("Upload complete for file: "+ fileObj.name +"\n");
                        $('#log').prepend("The file url is " + url + "\n");
                        var $cf = $('#current_file');
                        $cf.find('.progress').removeClass('active');
                        u.files_uploaded++;

                        var $ca = $('#all_files');
                        var text = parseInt(u.files_total_uploaded_size / u.files_total_size * 100) + "%";
                        $ca.find('.progress .progress-bar').css('width', (u.files_total_uploaded_size / u.files_total_size * 100) + "%").text(text);
                    },
                    on_complete_all: function(){
                        $('#log').prepend("All files uploaded\n");
                        var $ca = $('#all_files');
                        $ca.find('.progress').removeClass('active');
                    }
                };
                upload = mule_upload(settings);
            });
        </script>
        <link href='http://fonts.googleapis.com/css?family=Carme' rel='stylesheet' type='text/css'>
    </head>
    <body>
        <div class="container">
            <div class="jumbotron">
                <h1>Mule Uploader <small>multi-file example</small></h1>
                <p>
                    <em>Mule Uploader</em> gets your file from your computer to <a href="http://aws.amazon.com/s3/">Amazon S3</a>, no matter what.
                    Wireless just went down? A <a href="http://www.prwatch.org/files/images/angry-badger.jpg">badger</a> ate the power cord?
                    You have to go now and need to resume the upload when you get back? <em>Mule Uploader</em> has you covered.
                </p>
                <p>
                    Why use this? Because having a 3GB file interrupt at <em>87%</em> isn't pretty, not for you and especially not
                    for your users.
                </p>
                <p id="explanation">
                    Go ahead, select one or multiple files. It will start uploading automatically.
                </p>
                <br/>
                <input type="file" id="file" multiple/>

                <div id="current_file">
                    <span class="filename">Current file</span>:
                    <div class="progress progress-striped active">
                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">
                        </div>
                    </div>
                </div>
                <div id="all_files">
                    Total progress:
                    <div class="progress progress-striped active">
                        <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">
                        </div>
                    </div>
                </div>

                <div style="clear: both"></div>
                <textarea id="log" rows="10" class="form-control"></textarea>
                <br/>
                <p>
                    <b>New feature!</b> &ndash; we've upgraded to <a href="http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html">Amazon Signature V4</a>. This release is still <i>experimental</i>, so if you notice a bug please report it to me and / or add a pull request. There is also a new dependency on Web Workers. <a href="https://github.com/cinely/mule-uploader/tree/fa86fb3ef56b23e240975b19fac66fe138a5afb4">The old uploader version</a> will work for all Amazon regions added prior to Jan 30 2014, as per Amazon's documentation. Also, the backend is much simpler, needing only 2 endpoints instead of 6.
                </p>
                <p>
                    For more information, visit <a href="https://github.com/cinely/mule-uploader#mule-upload">the GitHub page</a>.
                    (you can see the source code for this demo there, <em>and</em> you get free cookies!)
                </p>
                <p>If have any questions about this, drop me a line at
                    <a href="mailto:&#103;&#97;&#98;&#105;&#64;&#112;&#117;&#114;&#99;&#97;&#114;&#117;&#46;&#99;&#111;&#109;">
                        <span class="email">moc&#46;uracrup&#64;ibag</span>
                    </a>
                </p>
            </div>
        </div>
        <div class="footer">
            Patterns thanks to <a href="http://subtlepatterns.com/">subtlepatterns.com</a>
        </div>
    </body>
</html>
