/**
 * mule-uploader.js
 *
 * Copyright 2015-2016, Gabriel Purcaru
 * Released under MIT License.
 * License: https://opensource.org/licenses/MIT
 */


(function(namespace){
    
    // AJAX helper. It takes an object that contains load_callback, error_callback,
    // url, method, headers, state_change_callback, progress_callback
    var XHR = function(args) {
        // the user may or may not pass any headers
        args.headers = args.headers || {};

        // if no method is given, default to GET
        args.method = args.method || "GET";

        var xhr = new XMLHttpRequest();

        // set the "load" callback if given
        if(args.load_callback && typeof args.load_callback == 'function') {
            xhr.addEventListener("load", args.load_callback, true);
        }

        // set the "error" callback if given
        if(args.error_callback && typeof args.error_callback == 'function') {
            xhr.addEventListener("error", args.error_callback, true);
        }

        // set the "readystatechange" callback if given
        if(args.state_change_callback && typeof args.state_change_callback == 'function') {
            xhr.addEventListener("readystatechange", args.state_change_callback);
        }

        // set the "progress" callback if given
        if(args.progress_callback && typeof args.progress_callback == 'function') {
            xhr.upload.addEventListener("progress", args.progress_callback);
        }

        // set the "timeout" callback if given
        if(args.timeout_callback && typeof args.timeout_callback == 'function') {
            xhr.addEventListener('timeout', args.timeout_callback);
        }

        // adding extra params as needed
        var url = args.url;
        if(args.extra_params) {
            for(var param_name in args.extra_params) {
                if(args.extra_params.hasOwnProperty(param_name)) {
                    if(url.indexOf('?') !== -1) {
                        url += "&";
                    } else {
                        url += "?";
                    }

                    url += encodeURIComponent(param_name) + "=";
                    url += encodeURIComponent(args.extra_params[param_name]);
                }
            }
        }

        // open the xhr connection
        xhr.open(args.method, url);

        // set the headers
        for(var header in args.headers) {
            if(args.headers.hasOwnProperty(header)) {
                xhr.setRequestHeader(header, args.headers[header]);
            }
        }

        // send the ajax call
        if(args.body) {
            xhr.send(args.body);
        } else {
            xhr.send();
        }
        return xhr;
    };

    namespace.mule_upload = function(settings) {
        var debug = true;

        // custom logging function that prepends a text for easy identification;
        // it is also toggled by the `debug` flag
        var log = function() {};
        if(debug && console && console.log) {
            log = function() {
                var args = ["[MuleUploader]"];
                for(var i=0; i<arguments.length; i++) {
                    args.push(arguments[i]);
                }
                return console.log.apply(console, args);
            };
        }

        // helper constants for more readable code
        var KB = 1024;
        var MB = 1024 * KB;
        var GB = 1024 * MB;

        // for new webkit browsers, the .slice() method is named .webkitSlice()
        // similar for mozilla
        File.prototype.slice = File.prototype.webkitSlice || File.prototype.mozSlice || File.prototype.slice;

        // verify that the browser has the needed HTML5 capabilities
        if(!(namespace.File && namespace.FileList && namespace.Blob)) {
            log("HTML5 APIs not available.");
            return -1;
        }
        if(navigator.userAgent.indexOf("Firefox") !== -1) {
            try {
                new Blob(["something"]);
            } catch(e) {
                return -1;
            }
        }
        log("OK");

        function Uploader(settings) {
            // `u` is often used as an alias for `this` to be used in nested closures
            var u = this;

            settings = settings || {};

            // make the input element another possible setting
            // in some cases (e.g. drag & drop) there is no input element
            u.input = settings.file_input;
            u.file  = settings.file;

            // the file starts automatically by default; you have to set
            // autostart: false explicitly if you want to use a start button
            // if autostart is false, you can use the Uploader.prototype.start()
            // function. Note that the user has to select a file first
            settings.autostart = ('autostart' in settings ? settings.autostart : true);

            // NOTE: For Amazon S3, the minimum chunk size is 5MB
            // we are using 6 for safe measure. Note that the maximum number of chunks
            // is 10,000, so for example, if the chunk size is 6MB, the maximum
            // possible file size is 6MB * 10,000 = ~58GB
            settings.chunk_size = settings.chunk_size || (6 * MB); // default 6MB
            settings.max_size = settings.max_size || 5 * GB; // 5GB

            // the number of parallel upload xhr's
            settings.num_workers = settings.num_workers || 4;

            // the S3 object key; I recommend to generate this dynamically (e.g.
            // a random string) to avoid unwanted overwrites.
            settings.key = settings.key || "the_key";

            // the Amazon S3 bucket where you'll store the uploads
            settings.bucket = settings.bucket;

            // the Amazon S3 access key. DO NOT give the AWS Secret code!
            settings.access_key = settings.access_key;

            // the Mime-Type of the content. You must match this with the backend value
            // or you'll get an Invalid Signature error. If unsure about the
            // mime type, use application/octet-stream
            settings.content_type = settings.content_type || "application/octet-stream";


            // acl can be set to:
            // private
            // public-read (* default)
            // public-read-write
            // authenticated-read
            // bucket-owner-read
            // bucket-owner-full-control
            // log-delivery-write
            settings.acl = settings.acl || 'public-read';

            // various callbacks
            settings.on_progress = settings.on_progress             || function() {};
            settings.on_chunk_progress = settings.on_chunk_progress || function() {};
            settings.on_select = settings.on_select                 || function() {};
            settings.on_error = settings.on_error                   || function() {};
            settings.on_complete = settings.on_complete             || function() {};
            settings.on_init = settings.on_init                     || function() {};
            settings.on_start = settings.on_start                   || function() {};
            settings.on_chunk_uploaded = settings.on_chunk_uploaded || function() {};

            // the location prefix of the uploader's backend
            settings.ajax_base = settings.ajax_base || "/upload-backend";

            //extensions comma delimited without period (jpg,jpeg,png,gif)
            settings.accepted_extensions = settings.accepted_extensions || "";

            // set the values so that they can be used everywhere, as needed
            u.settings = settings;

            // the "waiting" state means the uploader is waiting for the user
            // to select a file
            u.set_state("waiting");

            if (u.input) {
                u.input.onchange = function(e, force) {
                    if(!u.settings.autostart) {
                        return true;
                    }
                    // the `onchange` event may be triggered multiple times, so we
                    // must ensure that the callback is only executed the first time
                    if(u.get_state() != "waiting") {
                        return false;
                    }

                    // the uploader doesn't support multiple uploads at this time,
                    // so we get the first file
                    var file = e.target.files[0];
                    u.upload_file(file, force);
                    return true;
                };
            }

            // trigger the init event callback
            setTimeout(function() {
                u.settings.on_init.apply(u);
            }, 100);
        }

        Uploader.prototype.start = function() {
            if(this.input && this.input.files && this.input.files.length > 0) {
                return this.upload_file(this.input.files[0], false);
            } else {
                alert("No file selected");
            }
        };

        Uploader.prototype.upload_file = function(file, force) {
            var u = this;
            // the `onchange` event may be triggered multiple times, so we
            // must ensure that the callback is only executed the first time
            // also make sure the file is not already set.
            if(u.get_state() != "waiting") {
                return false;
            }

            if (file) {
                u.file = file;
            }

            if (!u.file) {
                return false;
            }

            // we use the lastModifiedDate, the file name and size to uniquely
            // identify a file. There may be false positives and negatives,
            // but the chance for a false positive is basically zero
            // some browsers don't report the last modified date, so we default
            // to a blank date
            u.file.lastModifiedDate = u.file.lastModifiedDate || new Date(0);

            if(u.file.size > u.settings.max_size) {
                alert(
                    ["The maximum allowed file size is ",
                    (u.settings.max_size / GB),
                    "GB. Please select another file."].join('')
                );
                return false;
            }

            // check for accepted extensions, if applicable
            if(u.settings.accepted_extensions) {
                // get the file extension
                var file_extension = file.name.split('.').pop();

                // split the given extensions into an array
                var extensions_array = u.settings.accepted_extensions.split(',');

                // and match the extension against the given extension list
                var file_accepted = false;
                for(var i=0; i<extensions_array.length; i++) {
                    if(file_extension == extensions_array[i]) {
                        file_accepted = true;
                        break;
                    }
                }

                // if the file is not accepted, notify the user and return
                if(!file_accepted) {
                    alert(
                        ["This file format is not accepted. ",
                        "Please use a file with an extension like ",
                        u.settings.accepted_extensions].join('')
                    );
                    return false;
                }
            }

            // initialize the file upload
            u.settings.on_select.call(u, file);

            var args = utils.extend_object(u.settings.extra_params || {}, {
                filename: file.name,
                filesize: file.size,
                content_type: file.type,
                last_modified: file.lastModifiedDate.valueOf()
            });

            if(force) {
                args.force = true;
            }

            // get the signing key. It will also return
            // a file key + upload_id pair if the selected file
            // is already uploading. It also returns a
            // backup_key in case that file upload already completed.
            // The signing key is valid for 7 days
            XHR({
                url: u.settings.ajax_base + "/signing_key/",
                extra_params: args,
                load_callback: function(e) {
                    var json = JSON.parse(e.target.responseText);
                    var utc_suffix = /Z|\+00:?00$/.test(json.date.toString()) ? '' : 'Z';
                    json.date = new Date(json.date + utc_suffix);
                    u.auth = json;
                    u.upload_id = json.upload_id;
                    u.chunks = json.chunks;
                    u.settings.key = json.key || u.settings.key;
                    u.settings.backup_key = u.settings.key;

                    if(!u.upload_id) {
                        AmazonXHR.init(json, u.settings.key, file, function(e) {
                            var xml = e.target.responseXML;

                            // get the given upload id
                            u.upload_id = xml.getElementsByTagName('UploadId')[0].textContent;

                            u.load_file();
                        });
                    } else {
                        // resume a previus upload
                        if(!force) {
                            // get the uploaded parts from S3
                            AmazonXHR.list(u.auth, u.file, u.settings.key, u.upload_id, u.settings.chunk_size, function(parts) {
                                for(var i=0; i<parts.length; i++) {
                                    var chunk = parts[i][0] - 1;
                                    u.set_progress(chunk, u.get_chunk_size(chunk));
                                    u.set_chunk_finished(chunk);
                                    u.set_chunk_uploading(chunk, false);
                                }
                                u.load_file();
                            }, function() {
                                // if it fails, re-initiate the upload, and force
                                // it to start a new upload
                                u.upload_id = null;
                                this._loaded_chunks = null;
                                u._progress = null;
                                u._total_progress = null;
                                u._loaded_chunks = null;
                                u._uploading_chunks = null;
                                u._chunks = null;
                                u.settings.key = u.settings.backup_key;
                                u.upload_file(file, true); // force reload
                            });
                        } else {
                            // force-start the upload
                            u.load_file();
                        }
                    }
                }
            });
        };

        // this initiates the file upload
        Uploader.prototype.load_file = function() {
            var u = this;

            // we can't start the upload if we are waiting for user input
            if(u.get_state() != "waiting") {
                return;
            }

            // make sure we only trigger the start event once
            if(!u._start_fired) {
                // trigger the start event callback
                u.settings.on_start.call(u, u.file);

                // and also trigger a progress callback with 0%
                u.settings.on_progress.call(u, 0, u.file.size);
                u._start_fired = true;
            }

            // from now on, we are "processing" the file upload
            u.set_state("processing");

            // at this point we may have some chunks already uploaded,
            // so we may trigger a progress callback with the reported progress
            u.settings.on_progress.call(u, u.get_total_progress(), u.file.size);

            // get the next chunk
            var next_chunk = u.get_next_chunk();

            if(next_chunk != -1) {
                // and start uploading it
                u.upload_chunk(next_chunk);
            } else if(u.upload_finished()) {
                // if we finished, trigger the upload finish sequence
                log("All done; finish upload");
                u.finish_upload();
            }

            for(var i=0; i < u.settings.num_workers - 1; i++) {
                next_chunk = u.get_next_chunk();
                if(next_chunk !== -1) {
                    u.upload_chunk(next_chunk);
                } else {
                    break;
                }
            }
        };

        // this uploads a single chunk to S3
        Uploader.prototype.upload_chunk = function(chunk) {
            var u = this;
            // make sure we're in processing mode
            if(u.get_state() != "processing") {
                log("NOT processing; return");
                return;
            }

            // also make sure we're not already uploading this chunk
            if(u.get_chunk_uploading(chunk)) {
                log("Already Uploading");
                setTimeout(function() {
                    var next_chunk = u.get_next_chunk();
                    if(next_chunk !== -1) {
                        u.upload_chunk(u.get_next_chunk());
                    }
                }, 1000);
                return;
            } else {
                // mark this chunk as uploading
                u.set_chunk_uploading(chunk);
            }
            log("Uploading Chunk: " + chunk);

            // if we already uploaded this chunk, get to the next one
            // if there is no next chunk, finish the upload
            if(u.is_chunk_loaded(chunk)) {
                var next_chunk = u.get_next_chunk();
                if(next_chunk != -1) {
                    u.upload_chunk(next_chunk);
                } else {
                    if(u.upload_finished()) {
                        log("No next chunk; finish upload");
                        u.finish_upload();
                    }
                }
            }

            var length = u.settings.chunk_size;

            // get the start and end bytes for the needed chunk
            var start = chunk * length;
            var end = Math.min(start + length, u.file.size);

            // we need the last progress time in order to detect hanging
            // uploads
            var last_progress_time = new Date();
            u._intervals = u._intervals || {};


            // the "readystatechange" handler
            var handler = function(e) {
                // we care about the "done" event triggered while processing
                if(e.target.readyState != this.DONE || u.get_state() != "processing") {
                    log(e);
                    return;
                }

                // if we don't receive a 2XX response, trigger an error
                if(e.target.status / 100 != 2) {
                    return error_handler();
                }

                // at this point, we know that this chunk finished uploading
                log("Chunk uploaded: " + chunk);

                // notify the server of the uploaded chunk
                u.notify_chunk_uploaded(chunk);

                // and also trigger the chunk_uploaded callback
                u.settings.on_chunk_uploaded.call(u, chunk);

                // cancel the xhr watcher interval
                clearInterval(u._intervals[chunk]);

                // mark the chunk as finished
                u.set_progress(chunk, u.get_chunk_size(chunk));
                u.set_chunk_finished(chunk);
                u.set_chunk_uploading(chunk, false);

                // get next chunk; if we're out of chunks,
                // finish the upload
                var next_chunk = u.get_next_chunk();
                if(next_chunk != -1) {
                    u.upload_chunk(next_chunk);
                } else if(u.upload_finished()) {
                    log("Done");
                    u.finish_upload();
                } else {
                    var interval = setInterval(function() {
                        var chunk = u.get_next_chunk();
                        if(chunk != -1) {
                            clearInterval(interval);
                            u.upload_chunk(chunk);
                        } else if(u.upload_finished()) {
                            clearInterval(interval);
                            u.finish_upload();
                        }
                    }, 1000);
                }
            };

            // the upload progress handler
            var progress_handler = function(e) {
                // set the internal chunk's progress value to the reported amount
                u.set_progress(chunk, e.loaded);

                // trigger the progress event callback
                u.settings.on_progress.call(u, u.get_total_progress(), u.file.size);

                // update the last_progress_time for the watcher interval
                last_progress_time = new Date();
            };
            var error_handled = false;
            var error_handler = function() {
                var error_arguments = arguments;
                var xhr = this;
                // the upload may have finished, so check for that
                u.check_already_uploaded(function() {
                    // if already uploaded
                    u.set_state("finished");

                    u.notify_upload_finished();

                    // trigger a final progress event callback, with 100%
                    u.settings.on_progress.call(u, u.file.size, u.file.size);

                    // also trigger the complete event callback
                    u.settings.on_complete.call(u);
                }, function() {
                    // we have a genuine error
                    log("Error: ");
                    log(error_arguments);

                    // make sure we don't handle the same error more than once
                    if(error_handled) {
                        return;
                    }
                    error_handled = true;

                    // abort the chunk upload
                    u.set_chunk_uploading(chunk, false);
                    u.set_chunk_finished(chunk, false);
                    u.set_progress(chunk, 0);
                    log("Abort");
                    try {
                        xhr.abort();
                    } catch(e) {
                        log(e);
                    }

                    log("Retry chunk: " + chunk);

                    // clear the watcher interval
                    clearInterval(u._intervals[chunk]);

                    // re-try the upload
                    setTimeout(function() {
                        if(u.get_state() == "processing") {
                            // and proceed
                            var next_chunk = u.get_next_chunk(chunk);
                            if(next_chunk !== -1) {
                                u.upload_chunk(next_chunk);
                            }
                        }
                    }, 1000);
                });
            };

            AmazonXHR.upload_chunk(u.auth, u.settings.key, u.upload_id, chunk, u.file.slice(start, end), {
                progress_callback: progress_handler,
                state_change_callback: handler,
                error_callback: error_handler,
                timeout_callback: error_handler
            }, function(xhr) {
                u._chunk_xhr = u._chunk_xhr || [];
                u._chunk_xhr.push(xhr);

                // the watcher interval; it cancels the xhr if it times out
                u._intervals[chunk] = setInterval(function() {
                    if(last_progress_time && (new Date() - last_progress_time) > 15000) { // 15s
                        log("Chunk Failed; retry");
                        clearInterval(u._intervals[chunk]);
                        if(u.get_state() == "processing") {
                            xhr.abort();
                            error_handler.call(xhr);
                            u._chunk_xhr[u._chunk_xhr.indexOf(xhr)] = null;
                        }
                    }
                }, 4000); // every 4s
            });
        };

        // initiates the upload finish sequence
        Uploader.prototype.finish_upload = function() {
            var u = this;

            // make sure it's not triggered when not processing (e.g. multiple times)
            if(u.get_state() != "processing") {
                return;
            }

            // change the upload's state
            u.set_state("finishing");

            u.settings.on_progress.call(u, u.file.size, u.file.size); // 100% done.


            var handler = function(e) {
                // i.e. if it's a 2XX response
                if(e.target.status / 100 == 2) {
                    log("Finished file.");
                    u.set_state("finished");
                    u.settings.on_progress.call(u, u.file.size, u.file.size); // it's 100% done

                    // trigger the complete event callback
                    u.settings.on_complete.call(u);
                } else if(e.target.status == 400 &&
                    e.target.responseText.indexOf("EntityTooSmall") !== -1) {
                    // an "EntityTooSmall" error means that we missed a chunk
                    AmazonXHR.list(u.auth, u.file, u.settings.key, u.upload_id, u.settings.chunk_size, function(parts) {
                        u.update_chunks(parts);
                        var next_chunk = u.get_next_chunk();
                        u.set_state("processing");
                        u.upload_chunk(next_chunk);
                    });
                } else if(e.target.status == 404) {
                    // 404 = NoSuchUpload = check if already finished
                    // if so, start a new upload
                    u.cancel(function() {
                        u.upload_file(u.file, true);
                    });
                } else {
                    u.check_already_uploaded(function() {
                        handler({
                            target: {
                                status: 200
                            }
                        });
                    }, function() {
                        handler({
                            target: {
                                status: 404
                            }
                        });
                    });
                }
            };

            AmazonXHR.list(u.auth, u.file, u.settings.key, u.upload_id, u.settings.chunk_size, function(parts) {
                var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);

                // check that we uploaded all the chunks; if we didn't,
                // start uploading the missing ones
                if(parts.length != num_chunks) {
                    u.update_chunks(parts);
                    var next_chunk = u.get_next_chunk();
                    u.set_state("processing");
                    u.upload_chunk(next_chunk);
                    return;
                }

                AmazonXHR.finish(u.auth, u.file, u.settings.key, u.upload_id, parts, u.settings.chunk_size, handler, handler);
            });
        };


        // notify the server that a chunk finished uploading. This is needed for
        // upload resumes
        Uploader.prototype.notify_chunk_uploaded = function(chunk) {
            var u = this;
            if(u.get_state() != "processing") {
                return;
            }
            var key = u.settings.key;
            var upload_id = u.upload_id;
            var url = u.settings.ajax_base + '/chunk_loaded/';

            var args = utils.extend_object(u.settings.extra_params || {}, {
                chunk: chunk,
                key: key,
                upload_id: upload_id,
                filename: u.file.name,
                filesize: u.file.size,
                content_type: u.file.type,
                last_modified: u.file.lastModifiedDate.valueOf()
            });

            XHR({
                url:url,
                extra_params:args
            });

        };

        // check whether the file is already uploaded
        Uploader.prototype.check_already_uploaded = function(callback, error_callback) {
            var u = this;
            var method = "HEAD";
            var path = "/" + u.settings.key;
            var inner_handler = function(e) {
                // the handler only checks for status code;
                // if the HEAD returns 404, re-upload,
                // else, it returns 200 and finish the upload
                if(e.target.status / 100 == 2) {
                    log("Already Uploaded");
                    callback();
                } else {
                    log("Error!");
                    error_callback();
                }
            };

            if(!error_callback && typeof(error_callback) !== "function") {
                error_callback = function() {
                    setTimeout(function() {
                        return u.check_already_uploaded(callback, error_callback);
                    }, 2500);
                };
            }

            console.log(u.settings);
            var host = "s3" + utils.region_string(u.settings.region) + ".amazonaws.com";
            var url = location.protocol + "//" + host + "/" + u.settings.bucket + "/" + path;
            XHR({
                url: url,
                method: method,
                load_callback: inner_handler,
                error_callback: error_callback
            });
        };

        // cancels an upload
        Uploader.prototype.cancel = function(callback) {
            // empty all fields, cancel all intervals, abort all xhr's
            var u = this;
            for(var i=0; i < u._chunk_xhr.length; i++) {
                log("Abort chunk: " + u._chunk_xhr[i]);
                u._chunk_xhr[i].abort();
            }
            u._intervals = u._intervals || {};
            for(var x in u._intervals) {
                if(u._intervals.hasOwnProperty(x)) {
                    clearInterval(u._intervals[x]);
                }
            }
            callback = callback || function() {};
            u.set_state("canceled");
            u._chunk_xhr = u._chunk_xhr || [];
            u.settings.on_progress.call(u, 0, 0);
            u._chunk_xhr = null;
            u._chunks = null;
            u._uploading_chunks = null;
            u._loaded_chunks = null;
            u._start_fired = false;
            u.upload_id = null;
            u._progress = null;
            u.set_state("waiting"); // wait for a new upload
            callback();
        };

        // updates the chunk history with the given chunks
        Uploader.prototype.update_chunks = function(parts) {
            var u = this;
            var loaded = [];
            var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);

            u._init_chunks(true);
            u._uploading_chunks = [];
            u._loaded_chunks = [];

            var i;
            for(i=0; i < parts.length; i++) {
                var part_number = parseInt(parts[i][0], 10);
                u.add_loaded_chunk(part_number - 1);
                u.set_chunk_finished(part_number - 1);
                loaded.push(part_number - 1);
            }
            for(i=0; i < num_chunks; i++) {
                if(loaded.indexOf(i) === -1) {
                    log("Chunk not uploaded: ", i);
                    u.set_progress(i, 0);
                }
            }
        };

        // returns true if a file is selected
        Uploader.prototype.is_selected = function() {
            return !!this.file;
        };

        // returns the uploader's state
        Uploader.prototype.get_state = function() {
            return this._state;
        };

        // sets the uploader's state
        Uploader.prototype.set_state = function(state) {
            this._state = state;
            return state;
        };

        // set a chunk's progress
        Uploader.prototype.set_progress = function(chunk, loaded) {
            this.log_status();
            this._progress = this._progress || {};
            this._total_progress = (this._total_progress || 0 ) + loaded - (this._progress[chunk] || 0);
            this._progress[chunk] = loaded;
            this.settings.on_chunk_progress.call(
                this, chunk, loaded, this.get_chunk_size(chunk));
        };

        // gets the total bytes uploaded
        Uploader.prototype.get_total_progress = function() {
            return this._total_progress || 0;
        };

        // returns true if a chunk is already uploaded
        Uploader.prototype.is_chunk_loaded = function(chunk) {
            this._loaded_chunks = this._loaded_chunks || [];
            return this._loaded_chunks.indexOf(chunk) !== -1;
        };

        // adds a chunk to the uploaded list
        Uploader.prototype.add_loaded_chunk = function(chunk) {
            this._loaded_chunks = this._loaded_chunks || [];
            this._loaded_chunks.push(chunk);
            this.set_progress(chunk, this.get_chunk_size(chunk));
        };

        // returns true if the chunk is currently uploading
        Uploader.prototype.get_chunk_uploading = function(chunk) {
            this._uploading_chunks = this._uploading_chunks || [];
            return this._uploading_chunks.indexOf(chunk) !== -1;
        };

        // sets whether a chunk is currently uploading or not
        Uploader.prototype.set_chunk_uploading = function(chunk, val) {
            if(typeof val == "undefined") {
                val = true;
            }
            this._uploading_chunks = this._uploading_chunks || [];
            if(val) {
                this._uploading_chunks.push(chunk);
            } else {
                var list = [];
                for(var i=0; i < this._uploading_chunks.length; i++) {
                    if(this._uploading_chunks[i] != chunk) {
                        list.push(this._uploading_chunks[i]);
                    }
                }
                this._uploading_chunks = list;
            }
        };

        // initialize inner representation of chunks
        Uploader.prototype._init_chunks = function(force) {
            var u = this;
            if(!u._chunks || force) {
                u._chunks = [];
                var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);
                for(var i=0; i < num_chunks; i++) {
                    u._chunks.push(false);
                }
            }
        };

        // sets whether a chunk finished uploading
        Uploader.prototype.set_chunk_finished = function(chunk, val) {
            if(typeof val == "undefined") {
                val = true;
            }
            var u = this;
            u._init_chunks();
            u._chunks[chunk] = val;
        };

        // get next chunk to be uploaded; if all chunks are done, return -1
        Uploader.prototype.get_next_chunk = function(chunk) {
            var u = this;
            u._init_chunks();
            if(chunk && !u._chunks[chunk] && !u.get_chunk_uploading(chunk)) {
                return chunk;
            }
            for(var i=0; i < u._chunks.length; i++) {
                if(!u._chunks[i] && !u.get_chunk_uploading(i)) {
                    return i;
                }
            }
            return -1;
        };

        // returns true if all chunks finished uploaded
        Uploader.prototype.upload_finished = function() {
            var u = this;
            u._init_chunks();
            for(var i=0; i < u._chunks.length; i++) {
                if(!u._chunks[i] || u.get_chunk_uploading(i)) {
                    return false;
                }
            }
            return true;
        };

        Uploader.prototype.is_last_chunk = function(chunk) {
            return Math.ceil(this.file.size / this.settings.chunk_size) - 1 == chunk;
        };

        Uploader.prototype.get_chunk_size = function(chunk) {
            if(this.is_last_chunk(chunk)) {
                return this.file.size % this.settings.chunk_size;
            } else {
                return this.settings.chunk_size;
            }
        };

        Uploader.prototype.log_status = function() {
            // log(this.get_total_progress() / this.file.size * 100);
        };

        Uploader.prototype.on_chunk_progress = function(f) { this.settings.on_chunk_progress = f; };
        Uploader.prototype.on_progress = function(f) { this.settings.on_progress = f; };
        Uploader.prototype.on_select = function(f) { this.settings.on_select = f; };
        Uploader.prototype.on_error = function(f) { this.settings.on_error = f; };
        Uploader.prototype.on_complete = function(f) { this.settings.on_complete = f; };
        Uploader.prototype.on_init = function(f) { this.settings.on_init = f; };
        Uploader.prototype.on_start = function(f) { this.settings.on_start = f; };
        Uploader.prototype.on_chunk_uploaded = function(f) { this.settings.on_chunk_uploaded = f; };

        return new Uploader(settings);
    };


    var AmazonXHR = function(settings) {
        this.settings = settings;
    };
    AmazonXHR.finish = function(auth, file, key, upload_id, parts, chunk_size, callback) {
        var querystring = {"uploadId": upload_id};

        // compose the CompleteMultipartUpload request for putting
        // the chunks together
        var data = "<CompleteMultipartUpload>";
        for(var i=0; i<parts.length; i++) {
            data += "<Part>";
            data += "<PartNumber>" + parts[i][0] + "</PartNumber>";
            data += "<ETag>" + parts[i][1] + "</ETag>";
            data += "</Part>";
        }
        data += "</CompleteMultipartUpload>";

        // firefox requires a small hack
        if(navigator.userAgent.indexOf("Firefox") !== -1) {
            data = new Blob([data]);
        }

        return new AmazonXHR({
            auth: auth,
            key: key,
            method: "POST",
            querystring: querystring,
            headers: {},
            payload: data,
            load_callback: callback
        }).send();
    };
    AmazonXHR.list = function(auth, file, key, upload_id, chunk_size, callback, error_callback, marker) {
        var querystring = {"uploadId": upload_id};
        if(marker) {
            querystring['part-number-marker'] = marker;
        }
        return new AmazonXHR({
            auth: auth,
            key: key,
            method: "GET",
            querystring: querystring,
            headers: {},
            payload: "",
            error_callback: error_callback,
            load_callback: function(e) {
                if(e.target.status === 404) {
                    // i.e. the file was already uploaded; start fresh
                    if(error_callback) {
                        error_callback();
                    }
                    return;
                }

                // process the parts, and return an array of
                // [part_number, etag, size] through the given callback
                window.debug = e;
                var xml = e.target.responseXML;
                var parts = [];
                var xml_parts = xml.getElementsByTagName("Part");
                var num_chunks = Math.ceil(file.size / chunk_size);
                for(var i=0; i < xml_parts.length; i++) {
                    var part_number = parseInt(xml_parts[i].getElementsByTagName("PartNumber")[0].textContent, 10);
                    var etag = xml_parts[i].getElementsByTagName("ETag")[0].textContent;
                    var size = parseInt(xml_parts[i].getElementsByTagName("Size")[0].textContent, 10);

                    if(part_number != num_chunks && size != chunk_size) {
                        continue; // chunk corrupted
                    } else if(part_number == num_chunks &&
                            size != file.size % chunk_size) {
                        continue; // final chunk corrupted
                    }

                    parts.push([
                        part_number,
                        etag,
                        size
                    ]);
                }
                var is_truncated = xml.getElementsByTagName("IsTruncated")[0].textContent;
                if(is_truncated === "true") {
                    var part_marker = xml.getElementsByTagName("NextPartNumberMarker")[0].textContent;
                    AmazonXHR.list(auth, file, key, upload_id, chunk_size, function(new_parts) {
                        callback(parts.concat(new_parts));
                    }, error_callback, part_marker);
                } else {
                    callback(parts);
                }
            }
        }).send();
    };

    AmazonXHR.upload_chunk = function(auth, key, upload_id, chunk_num, chunk, callbacks, xhr_callback) {
        var callback, error_callback, progress_callback, readystate_callback;
        if(callbacks instanceof Object) {
            callback = callbacks.load_callback;
            error_callback = callbacks.error_callback;
            progress_callback = callbacks.progress_callback;
            readystate_callback = callbacks.state_change_callback;
        } else {
            callback = callbacks;
        }
        var querystring = {
            partNumber: chunk_num + 1,
            uploadId: upload_id
        };
        return (new AmazonXHR({
            auth: auth,
            key: key,
            method: "PUT",
            querystring: querystring,
            headers: {},
            payload: chunk,
            load_callback: callback,
            error_callback: error_callback,
            progress_callback: progress_callback,
            state_change_callback: readystate_callback
        })).send(xhr_callback);
    };
    AmazonXHR.init = function(auth, key, file, callback) {
        return new AmazonXHR({
            auth: auth,
            key: key,
            method: "POST",
            querystring: {
                "uploads": ""
            },
            headers: {
                "x-amz-acl": "public-read",
                "Content-Disposition": "attachment; filename=" + encodeURIComponent(file.name),
                "Content-Type": auth.content_type || "application/octet-stream"
            },
            payload: "",
            load_callback: callback
        }).send();
    };
    AmazonXHR.prototype = {
        send: function(callback) {
            var self = this;
            self.request_date = new Date();

            self.headers = self.settings.headers;
            self.headers['host'] = self.settings.auth.bucket + ".s3" + utils.region_string(self.settings.auth.region) + ".amazonaws.com";

            var date_string = [
                self.settings.auth.date.getUTCFullYear(),
                utils.zfill(self.settings.auth.date.getUTCMonth() + 1, 2),
                utils.zfill(self.settings.auth.date.getUTCDate(), 2)
            ].join('');

            self.settings.querystring['X-Amz-Date'] = utils.uriencode(utils.iso8601(self.request_date));
            self.settings.querystring["X-Amz-Algorithm"] = "AWS4-HMAC-SHA256";
            self.settings.querystring["X-Amz-Expires"] =  86400;
            self.settings.querystring["X-Amz-Credential"] = utils.uriencode([
                self.settings.auth.access_key,
                "/" + date_string + "/",
                self.settings.auth.region + "/s3/aws4_request"
            ].join(''));
            self.settings.querystring["X-Amz-SignedHeaders"] = "";

            var header_keys = []
            for(var key in self.headers) {
                header_keys.push(key);
            }
            header_keys.sort();
            self.settings.querystring["X-Amz-SignedHeaders"] = utils.uriencode(header_keys.join(';'));

            self.settings.querystring["X-Amz-Signature"] = self.get_authorization_header();

            var url = location.protocol + "//" + self.headers['host'] + "/" + self.settings.key;
            delete self.headers['host'];  // keep this header only for hashing

            var first = true;
            for(var key in self.settings.querystring) {
                if(self.settings.querystring.hasOwnProperty(key)) {
                    if(first) {
                        url += "?";
                    }
                    first = false;
                    url += key + "=" + self.settings.querystring[key] + "&";
                }
            }
            url = url.slice(0, -1);  // remove extra ampersand

            var xhr = XHR({
                url: url,
                method: self.settings.method,
                headers: self.headers,
                body: self.settings.payload,

                load_callback: self.settings.load_callback,
                progress_callback: self.settings.progress_callback,
                state_change_callback: self.settings.state_change_callback,
                error_callback: self.settings.error_callback,
                timeout_callback: self.settings.timeout_callback
            });
            if(callback) {
                callback(xhr);
            }
        },
        get_authorization_header: function() {
            if(!this.settings.auth.date) {
                throw "Invalid date given.";
            }

            var header = "";

            var header_keys = utils.get_sorted_keys(this.headers);

            // signed headers
            var signed_headers = "";
            for(var i=0; i<header_keys.length; i++) {
                signed_headers += header_keys[i].toLowerCase() + ";";
            }
            signed_headers = signed_headers.slice(0, -1);

            var canonical_request = this.get_canonical_request();
            var string_to_sign = this.get_string_to_sign(canonical_request, this.request_date);
            var signature = this.sign_request(string_to_sign);

            return signature;
        },
        get_canonical_request: function() {
            var request = "";

            // verb
            request += this.settings.method.toUpperCase() + "\n";

            // path
            request += "/" + utils.uriencode(this.settings.key).replace(/%2F/g, "/") + "\n";

            // querystring
            var querystring_keys = utils.get_sorted_keys(this.settings.querystring);
            var key, value, i;
            for(i=0; i<querystring_keys.length; i++) {
                key = querystring_keys[i];
                value = this.settings.querystring[key];
                request += utils.uriencode(key) + "=" + value + "&amp;";
            }
            request = request.slice(0, -"&amp;".length) + "\n";  // remove extra ampersand

            // headers
            var header_keys = utils.get_sorted_keys(this.headers);
            for(i=0; i<header_keys.length; i++) {
                key = header_keys[i];
                value = this.headers[key];
                request += key.toLowerCase() + ":" + value.trim() + "\n";
            }
            request += "\n";

            // signed headers
            for(i=0; i<header_keys.length; i++) {
                request += header_keys[i].toLowerCase() + ";";
            }

            request = request.slice(0, -1) + "\n";
            request += "UNSIGNED-PAYLOAD";

            return request;
        },
        get_string_to_sign: function(canonical_request, time) {
            var to_sign = "";
            to_sign += "AWS4-HMAC-SHA256\n";
            to_sign += utils.iso8601(time) + "\n";
            to_sign += [
                time.getUTCFullYear(),
                utils.zfill(time.getUTCMonth() + 1, 2),
                utils.zfill(time.getUTCDate(), 2),
                "/" + this.settings.auth.region + "/s3/aws4_request\n"
            ].join('');

            to_sign += CryptoJS.SHA256(canonical_request.replace(/&amp;/g, "&")).toString();

            return to_sign;
        },
        sign_request: function(string_to_sign) {
            if(!this.settings.auth.signature) {
                throw "No signature provided.";
            }

            var res = CryptoJS.HmacSHA256(
                string_to_sign,
                CryptoJS.enc.Hex.parse(this.settings.auth.signature)
            ).toString();
            return res;
        }
    };

    var utils = {
        uriencode: function(string) {
            var output = encodeURIComponent(string);
            output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);
            output = output.replace(/;/g, "%3B");

            // AWS percent-encodes some extra non-standard characters in a URI
            output = output.replace(/[*]/g, function(ch) {
              return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
            });

            return output;
        },
        get_sorted_keys: function(obj) {
            var keys = [];
            for(var key in obj) {
                if(obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
            return keys.sort();
        },
        iso8601: function(date) {
            return [
                date.getUTCFullYear(),
                utils.zfill(date.getUTCMonth() + 1, 2),
                utils.zfill(date.getUTCDate(), 2),
                "T",
                utils.zfill(date.getUTCHours(), 2),
                utils.zfill(date.getUTCMinutes(), 2),
                utils.zfill(date.getUTCSeconds(), 2),
                "Z"
            ].join("")
        },
        zfill: function(str, num) {
            return ("00000000000" + str).substr(-num);
        },
        region_string: function(region) {
            // given an AWS region, it either returns an empty string for US-based regions
            // or the region name preceded by a dash for non-US-based regions
            // see this for more details: http://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html
            if(region && region.slice(0,2) !== 'us') {
                return '-' + region;
            }
            return '';
        },
        extend_object: function(base, extension) {
            var result = base;
            for(var key in extension) {
                result[key] = extension[key];
            }
            return result;
        }

    };

})(this);
