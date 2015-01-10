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
                    content_type: "<?php echo $backend->MIME_TYPE ?>",
                    bucket: "<?php echo $backend->BUCKET ?>",
                    region: "<?php echo $backend->REGION ?>",
                    key: "<?php echo $key ?>",
                    ajax_base: "backend",


                    max_size: 50 * (1 << 30), // 50 gb
                    on_error: function() {
                        $('#log').prepend("Error occurred! You can help me fix this by filing a bug report here: https://github.com/cinely/mule-uploader/issues\n");
                    },
                    on_select: function(fileObj) {
                        $('#log').prepend("File selected\n");
                        $('.upload-progress').css('width', null);
                    },
                    on_start: function(fileObj) {
                        $('#explanation').animate({'opacity': 0}, 'slow', function() {
                            $(this).text("Now, let the file upload for a bit (more than 6MB, because it uploads in chunks of 6MB), then refresh the page and select the file again. It will blow your mind :) ");
                            $(this).animate({'opacity': 1}, 'slow');
                        });
                        $('#log').prepend("Upload started\n");
                    },
                    on_progress: function(bytes_uploaded, bytes_total) {
                        if(!last_update || (new Date - last_update) > 1000) {
                            var percent = bytes_uploaded / bytes_total * 100;
                            var speed = (bytes_uploaded - last_uploaded) / (new Date - last_update) * 1000;
                            last_update = new Date;
                            last_uploaded = bytes_uploaded;
                            $('.progress .bar').width(percent / 100 * $('.progress').width());
                            var log = "Upload progress: " + format_size(bytes_uploaded) + " / "
                                + format_size(bytes_total) + " (" + parseInt(percent, 10) + "." + parseInt(percent * 10, 10) % 10
                                + "%)";
                            if(speed) {
                                log += "; speed: " + format_size(speed) + "/s";
                            }
                            $('#log').prepend(log + "\n");

                            var text = parseInt(bytes_uploaded / bytes_total * 100) + "%";
                            $('.progress .progress-bar').css('width', (bytes_uploaded / bytes_total * 100) + "%").text(text);
                        }
                    },
                    on_init: function() {
                        $('#log').prepend("Uploader initialized\n");
                    },
                    on_complete: function() {
                        var url = "http://<?php echo $backend->BUCKET ?>.s3.amazonaws.com/" + this.settings.key;
                        $('#log').prepend("Upload complete!\n");
                        $('#log').prepend("The file url is " + url + ".\n");
                        $('.progress').removeClass('active');
                    },
                    on_chunk_uploaded: function() {
                        $('#log').prepend("Chunk finished uploading\n");
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
                <h1>Mule Uploader</h1>
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
                    Go ahead, select a file. It will start uploading automatically.
                </p>
                <br/>
                <input type="file" id="file" />
                <div class="progress progress-striped active">
                    <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0">
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
