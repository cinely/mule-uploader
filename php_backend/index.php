<!DOCTYPE html>
<html>
    <head>
        <title>Mule Uploader</title>
        <link href="../bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script src="../bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="../mule-uploader.js"></script>
        <script type="text/javascript">
            $(function() {
                var file = document.getElementById("file")
                var settings = {

                    access_key: "<?php echo $backend->AWS_ACCESS_KEY ?>",
                    content_type: "<?php echo $backend->MIME_TYPE ?>",
                    bucket: "<?php echo $backend->BUCKET ?>",
                    key: "<?php echo $key ?>",
                    ajax_base: "backend",


                    max_size: 5 * (1 << 30), // 5gb
                    on_error: function() {
                        $('#log').prepend("Error occurred! You can help me fix this by filing a bug report here: https://github.com/cinely/mule-uploader/issues\n");
                    },
                    on_select: function(fileObj) {
                        $('#log').prepend("File selected\n");
                    },
                    on_start: function(fileObj) {
                        $('#explanation').animate({'opacity': 0}, 'slow', function() {
                            $(this).text("Now, let the file upload for a bit (more than 6MB, because it uploads in chunks of 6MB), then refresh the page and select the file again. It will blow your mind :) ");
                            $(this).animate({'opacity': 1}, 'slow');
                        });
                        $('#log').prepend("Upload started\n");
                    },
                    on_progress: function(bytesUploaded, bytesTotal) {
                        var percent = bytesUploaded / bytesTotal * 100;
                        $('.progress .bar').width(percent / 100 * $('.progress').width());
                        $('#log').prepend("Upload progress: " + bytesUploaded + " / "
                            + bytesTotal + " (" + parseInt(percent) + "." + parseInt(percent * 10) % 10
                            + "%)\n");
                    },
                    on_init: function() {
                        $('#log').prepend("Uploader initialized\n");
                    },
                    on_complete: function() {
                        var url = "http://<?php echo $backend->BUCKET ?>.s3.amazonaws.com/<?php echo $key ?>";
                        $('#log').prepend("Upload complete!\n");
                        $('#log').prepend("The file url is " + url + ".\n");
                    },
                    on_chunk_uploaded: function() {
                        $('#log').prepend("Chunk finished uploading\n");
                    }
                };
                upload = mule_upload(file, settings);
            });
        </script>
        <link href='http://fonts.googleapis.com/css?family=Carme' rel='stylesheet' type='text/css'>
        <style>
            h1 {
                font-family: "Carme";
            }
            .progress {
                width: 600px;
                height: 20px;
            }
            #log {
                width: 586px;
            }
            .email {
                unicode-bidi: bidi-override;
                direction: rtl;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="hero-unit">
                <h1>Mule Uploader</h1>
                <p>
                    <em>Mule Uploader</em> gets your file from your computer to <a href="http://aws.amazon.com/s3/">Amazon S3</a>, no matter what.
                    Wireless just went down? A <a href="http://en.wikipedia.org/wiki/Badger">badger</a> ate the power cord?
                    You have to go now and need to resume the upload when you get back? <em>Mule Uploader</em> has you covered.
                </p>
                <p>
                    Why use this? Because having a 3GB file interrupt at <em>87%</em> isn't pretty, not for you and especially not
                    for your users.
                </p>
                <span id="explanation">
                    Go ahead, select a file. It will start uploading automatically.
                </span>
                <br/>
                <input type="file" id="file" />
                <div class="progress progress-striped active">
                    <div class="bar"></div>
                </div>
                <div style="clear: both"></div>
                <textarea id="log" rows="10"></textarea>
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
    </body>
</html>
