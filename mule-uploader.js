/**
 * mule-upload.js
 *
 * Copyright 2012, Gabriel Purcaru
 * Released under GPL License.
 * License: http://www.gnu.org/copyleft/gpl.html
 */

function mule_upload(input, settings) {
    console = console || function() {};
    var KB = 1024;
    var MB = 1024 * KB;
    var GB = 1024 * MB;

    // for new webkit browsers, the .slice() method is named .webkitSlice()
    File.prototype.slice = File.prototype.webkitSlice || File.prototype.mozSlice || File.prototype.slice;

    if(!(window.File && window.FileList && window.Blob)) {
        return -1;
    }
    if(navigator.userAgent.indexOf("Firefox") !== -1) {
        try {
            new Blob(["something"]);
        } catch(e) {
            return -1;
        }
    }
    console.log("OK")

    function Uploader(input, settings) {
        var u = this;

        settings = settings || {};

        // NOTE: For Amazon S3, the minimum chunk size is 5MB
        settings.chunk_size = settings.chunk_size || (6 * MB); // default 6MB
        settings.key = settings.key || "the_key";
        settings.bucket = settings.bucket || "akiai-raw";
        settings.host = settings.host || "http://" + settings.bucket + ".s3.amazonaws.com";
        settings.access_key = settings.access_key || "YOUR AWS ACCESS KEY";
        settings.content_type = settings.content_type || "the_mime_type";
        settings.on_progress = settings.on_progress || function() {};
        settings.on_select = settings.on_select || function() {};
        settings.on_error = settings.on_error || function() {};
        settings.on_complete = settings.on_complete || function() {};
        settings.on_init = settings.on_init || function() {};
        settings.on_start = settings.on_start || function() {};
        settings.on_chunk_uploaded = settings.on_chunk_uploaded || function() {};
        settings.ajax_base = settings.ajax_base || "/upload-backend";
        settings.max_size = settings.max_size || 5 * (1 << 30); // 5GB
        u.settings = settings;

        u.input = input;
        this.set_state("waiting");

        u.input.onchange = function(e, force) {
            if(u.get_state() != "waiting") {
                return false;
            }

            var file = e.target.files[0];
            u.file = file;
            u.file.lastModifiedDate = u.file.lastModifiedDate || new Date(0);

            if(file.size > u.settings.max_size) {
                alert("The maximum allowed file size is 5GB. Please select another file.");
                return;
            }

            // initialize file upload
            u.get_init_signature(function(signature, date) {
                if(!u.upload_id) {
                    var path = "/" + settings.key + "?uploads";
                    var method = "POST";
                    var authorization = "AWS " + settings.access_key + ":" + signature;

                    var xhr = new XMLHttpRequest();
                    var handler = function(e) {
                        u.settings.on_select.call(u, file);
                        // hackish, should be changed
                        u.upload_id = e.target.responseText.match(/<UploadId>([^<]+)/)[1];
                        u.get_all_signatures(function() {
                            u.load_file(file);
                        });
                    };
                    xhr.addEventListener("load", handler, true);
                    xhr.addEventListener("error", handler, true);

                    xhr.open(method, settings.host + path, true);

                    xhr.setRequestHeader("x-amz-date", date);
                    xhr.setRequestHeader("x-amz-acl", "public-read");
                    xhr.setRequestHeader("Authorization", authorization);
                    xhr.setRequestHeader("Content-Disposition", "attachment; filename=" + u.file.name);
                    xhr.send();
                } else {
                    if(!force) {
                        u.list_parts(function() {
                            // success means succeed
                            u.get_all_signatures(function() {
                                console.log("1");
                                u.load_file(file);
                            });
                        }, function() {
                            u.upload_id = null;
                            this._loaded_chunks = null;
                            u._progress = null;
                            u._loaded_chunks = null;
                            u._uploading_chunks = null;
                            u._chunks = null;
                            return u.input.onchange(e, true); // force reload
                        });
                    } else {
                        u.get_all_signatures(function() {
                            u.load_file(file);
                        });
                    }
                }
            }, force);
        }
        u.settings.on_init.apply(u);
    }

    Uploader.prototype.load_file = function(file) {
        var u = this;
        if(u.get_state() != "waiting") {
            return;
        }
        if(!u._start_fired) {
            u.settings.on_start.call(u, u.file);
            console.log("here?")
            u.settings.on_progress.call(u, 0, u.file.size);
            u._start_fired = true;
        }
        u.set_state("processing");
        u.settings.on_progress.call(u, u.get_total_progress(), u.file.size);

        var next_chunk = u.get_next_chunk();
        if(next_chunk != -1) {
            u.upload_chunk(next_chunk);
        } else {
            console.log("All done; finish upload");
            u.finish_upload();
        }
    }
    Uploader.prototype.upload_chunk = function(chunk) {
        var u = this;
        if(u.get_state() != "processing") {
            console.log("NOT processing; return");
            return;
        }
        if(u.get_chunk_uploading(chunk)) {
            console.log("ALREADY UPLOADING")
            return;
        } else {
            u.set_chunk_uploading(chunk);
        }
        console.log(">>> UPLOADING CHUNK: " + chunk);
        u.get_chunk_signature(chunk, function(signature, date) {
            var length = u.settings.chunk_size;
            var start = chunk * length;
            var end = Math.min(start + length, u.file.size);
            var last_progress_time = new Date;
            u._intervals = u._intervals || {};

            if(u.is_chunk_loaded(chunk)) {
                var next_chunk = u.get_next_chunk();
                if(next_chunk != -1) {
                    u.upload_chunk(next_chunk);
                } else {
                    if(u.upload_finished()) {
                        u.finish_upload();
                    }
                }
            }

            var xhr = new XMLHttpRequest();
            var handler = function(e) {
                if(e.target.readyState != xhr.DONE || u.get_state() != "processing" || e.target.status == 0) {
                    return;
                }
                if(e.target.status / 100 != 2) {
                    return error_handler();
                }
                console.log("CHUNK " + chunk + " UPLOADED");
                u.notify_chunk_uploaded(chunk);
                u.settings.on_chunk_uploaded.call(u, chunk);
                xhr.abort();
                delete xhr;
                clearInterval(u._intervals[chunk]);
                u.set_chunk_finished(chunk);
                var next_chunk = u.get_next_chunk();
                if(next_chunk != -1) {
                    u.upload_chunk(next_chunk);
                } else {
                    console.log("Done");
                    u.finish_upload();
                }
            }
            var progress_handler = function(e) {
                u.set_progress(chunk, e.loaded);
                u.settings.on_progress.call(u, u.get_total_progress(), u.file.size);
                last_progress_time = new Date;
            }
            var error_handled = false;
            var error_handler = function() {
                var error_arguments = arguments;
                u.check_already_uploaded(function() {
                    // if already uploaded
                    u.set_state("finished");
                    u.settings.on_progress.call(u, u.file.size, u.file.size); // it's 100% done
                    u.settings.on_complete.call(u);
                }, function() {
                    console.log("-- ERROR ------------");
                    console.debug(error_arguments);
                    console.log("-- ERROR ------------");
                    // if not already uploaded
                    if(error_handled) {
                        return;
                    }
                    error_handled = true;
                    window.debug = u;

                    console.log("ABORT 1!!!!");
                    xhr.abort();
                    console.log("RETRY CHUNK >> " + chunk);
                    clearInterval(u._intervals[chunk]);
                    setTimeout(function() {
                        if(u.get_state() == "processing") {
                            u.set_chunk_uploading(chunk, false);
                            var next_chunk = u.get_next_chunk();
                            if(next_chunk !== -1) {
                                u.get_all_signatures(function() {
                                    u.upload_chunk(u.get_next_chunk());
                                });
                            }
                        }
                    }, 1000);
                })
            }

            var path = "/" + u.settings.key;

            // The chunk number is 0-indexed to simplify the calculations,
            // but S3 requires 1-indexed part numbers
            path += "?partNumber=" + (chunk + 1) + "&uploadId=" + u.upload_id;
            var method = "PUT";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;
            var blob = u.file.slice(start, end);

            xhr.upload.addEventListener("progress", progress_handler);
            xhr.addEventListener("readystatechange", handler);
            xhr.addEventListener("error", error_handler);
            xhr.addEventListener("timeout", error_handler);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.setRequestHeader("Content-Type", u.settings.content_type);
            xhr.setRequestHeader("Content-Disposition", "attachment; filename=" + u.file.name);

            xhr.send(blob);

            window.xhrs = window.xhrs || [];
            window.xhrs.push(xhr);

            u._chunk_xhr = u._chunk_xhr || [];
            u._chunk_xhr.push(xhr);

            u._intervals[chunk] = setInterval(function() {
                if(last_progress_time && (new Date - last_progress_time) > 15000) { // 15s
                    console.log("CHUNK FAILED; RETRY");
                    clearInterval(u._intervals[chunk]);
                    if(u.get_state() == "processing") {
                        xhr.abort();
                        error_handler();
                    }
                }
            }, 4000); // every 4s
        });
    }
    Uploader.prototype.finish_upload = function() {
        var u = this;
        if(u.get_state() != "processing") {
            return;
        }
        u.set_state("finishing");

        u.settings.on_progress.call(u, u.file.size, u.file.size); // 100% done.
        this.get_end_signature(function(signature, date) {
            var path = "/" + u.settings.key + "?uploadId=" + u.upload_id;
            var method = "POST";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            var xhr = new XMLHttpRequest();
            var handler = function(e, is_head) {
                console.log("HERE !! 3 -- " + e.target.status + ",  " + is_head);
                if(e.target.status / 100 == 2) {
                    console.log("Finished file.");
                    u.set_state("finished");
                    u.settings.on_progress.call(u, u.file.size, u.file.size); // it's 100% done
                    u.settings.on_complete.call(u);
                } else if(e.target.status == 400 &&
                        e.target.responseText.indexOf("EntityTooSmall") !== -1) {
                    console.log("HEre << 1");
                    u.list_parts(function(parts) {
                        console.log("HEre << 2", parts);
                        u.update_chunks(parts);
                        var next_chunk = u.get_next_chunk();
                        console.log("NEXT CHUNKKK >> ", next_chunk);
                        u.set_state("processing");
                        u.upload_chunk(next_chunk);
                    });
                } else {
                    if(!is_head) {
                        console.log("HERE !! 2");
                        u.check_already_uploaded(function() {
                            console.log("??!?!?")
                            handler({
                                target: {
                                    status: 200
                                }
                            }, true);
                        }, function() {
                            handler({
                                target: {
                                    status: 404
                                }
                            }, true);
                        })
                        // 404 = NoSuchUpload = check if already finished

                    } else {
                        u.cancel(function() {
                            u.input.onchange(null, true);
                        });
                    }
                }
            }
            xhr.addEventListener("load", handler, true);
            xhr.addEventListener("error", handler, true);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.setRequestHeader("Content-Type", u.settings.content_type);
            xhr.setRequestHeader("Content-Disposition", "attachment; filename=" + u.file.name);

            u.list_parts(function(parts) {
                var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);
                if(parts.length != num_chunks) {
                    console.log("Uh Oh");
                    u.update_chunks(parts);
                    var next_chunk = u.get_next_chunk();
                    console.log(">>>><<<", next_chunk)
                    u.set_state("processing");
                    u.upload_chunk(next_chunk);
                    return;
                }
                var data = "<CompleteMultipartUpload>";
                for(var i=0; i<parts.length; i++) {
                    data += "<Part>";
                    data += "<PartNumber>" + parts[i][0] + "</PartNumber>";
                    data += "<ETag>" + parts[i][1] + "</ETag>";
                    data += "</Part>";
                }
                data += "</CompleteMultipartUpload>";
                if(navigator.userAgent.indexOf("Firefox") !== -1) {
                    xhr.send(new Blob([data]));
                } else {
                    xhr.send(data);
                }
            })
        });
    }
    Uploader.prototype.list_parts = function(callback, error_callback) {
        var u = this;
        this.get_list_signature(function(signature, date) {
            var path = "/" + u.settings.key + "?uploadId=" + u.upload_id;
            var method = "GET";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            var xhr = new XMLHttpRequest();
            var handler = function(e) {
                if(e.target.status / 100 != 2 && error_callback) {
                    return error_callback(e);
                }
                var xml = e.target.responseText;
                var parts = [];
                $(xml).find('Part').each(function() {
                    var part_number = parseInt($(this).find("PartNumber").text());
                    var etag = $(this).find("ETag").text();
                    var size = parseInt($(this).find("Size").text());
                    var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);

                    if(part_number != num_chunks && size != u.settings.chunk_size) {
                        return; // chunk corrupted
                    } else if(part_number == num_chunks &&
                            size != u.file.size % u.settings.chunk_size) {
                        return; // final chunk corrupted
                    }

                    parts.push([
                        part_number,
                        etag,
                        size
                    ]);
                });
                console.log(">>>")
                console.debug(e);
                callback(parts);
            }
            xhr.addEventListener("load", handler, true);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.send();
        });
    }
    Uploader.prototype.get_end_signature = function(callback) {
        var u = this;
        if(u._end_signature) {
            callback(u._end_signature[0], u._end_signature[1]);
            return;
        }
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            var response = JSON.parse(e.target.responseText);
            callback(response.signature, response.date);
        }
        var error_handler = function() {
            setTimeout(function() {
                u.get_end_signature(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", u.settings.ajax_base + "/get_end_signature/?upload_id=" + escape(this.upload_id)
                + "&key=" + this.settings.key);
        xhr.send();
    }
    Uploader.prototype.get_list_signature = function(callback, error_callback) {
        var u = this;
        error_callback = error_callback || function() {};
        if(u._list_signature) {
            callback(u._list_signature[0], u._list_signature[1]);
            return;
        }
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            var response = JSON.parse(e.target.responseText);
            callback(response.signature, response.date);
        }
        var error_handler = function(e) {
            setTimeout(function() {
                u.get_list_signature(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", u.settings.ajax_base + "/get_list_signature/?upload_id=" + escape(this.upload_id)
                + "&key=" + this.settings.key);
        xhr.send();
    }
    Uploader.prototype.get_chunk_signature = function(chunk, callback) {
        var u = this;
        if(u._chunk_signatures && u._chunk_signatures[chunk + 1]) {
            callback(u._chunk_signatures[chunk + 1][0], u._chunk_signatures[chunk + 1][1]);
            return;
        }
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            var response = JSON.parse(e.target.responseText);
            callback(response.signature, response.date);
        }
        var error_handler = function(e) {
            setTimeout(function() {
                u.get_chunk_signature(chunk, callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", u.settings.ajax_base + "/get_chunk_signature/?chunk="
            + (chunk + 1) + "&upload_id=" + escape(this.upload_id)
            + "&key=" + this.settings.key);
        xhr.send();
    }
    Uploader.prototype.get_init_signature = function(callback, force) {
        var u = this;
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            console.debug(e);
            var response = JSON.parse(e.target.responseText);

            // the server may also respond with chunks already loaded
            if(response.chunks) {
                console.log("Resume upload...")
                var chunks = response.chunks;
                u._progress = u._progress || [];
                console.debug(response);
                for(var i=0; i<chunks.length; i++) {
                    console.log("Chunk already loaded >>>" + (chunks[i] - 1))
                    u._progress[chunks[i]] = u.settings.chunk_size;
                    u.add_loaded_chunk(chunks[i] - 1);
                    u.set_chunk_finished(chunks[i] - 1);
                    u.bytes_started = (u.bytes_started || 0) + u.settings.chunk_size;
                }
                console.log("__" + u.get_total_progress());
                u.upload_id = response.upload_id;
                u.settings.key = response.key;
            }
            callback(response.signature, response.date);
        }
        var error_handler = function() {
            console.log("Failed; trying again");
            setTimeout(function() {
                u.get_init_signature(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", u.settings.ajax_base + "/get_init_signature/?key=" + u.settings.key
                + "&filename=" + escape(u.file.name) + "&filesize=" + u.file.size
                + "&last_modified=" + u.file.lastModifiedDate.valueOf() + (force ? "&force=true" : ""));
        xhr.send();
    }
    Uploader.prototype.get_delete_signature = function(callback) {
        var u = this;
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            var response = JSON.parse(e.target.responseText);
            callback(response.signature, response.date)
        }
        var error_handler = function() {
            console.log("Failed; trying again");
            setTimeout(function() {
                u.get_delete_signature(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", u.settings.ajax_base + "/get_delete_signature/?key=" + u.settings.key
                + "&upload_id=" + u.upload_id);
        xhr.send();
    }
    Uploader.prototype.get_all_signatures = function(callback) {
        var u = this;
        var key = u.settings.key;
        var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);
        var upload_id = u.upload_id;
        var xhr = new XMLHttpRequest()
        var handler = function(e) {
            var response = JSON.parse(e.target.responseText);
            u._chunk_signatures = response.chunk_signatures;
            u._list_signature = response.list_signature;
            u._end_signature = response.end_signature;
            u._delete_signature = response.delete_signature;
            callback();
        }
        var error_handler = function() {
            setTimeout(function() {
                u.get_all_signatures(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", u.settings.ajax_base + "/get_all_signatures/?key=" + key + "&num_chunks="
            + num_chunks + "&upload_id=" + upload_id + "&filename=" + escape(u.file.name)
            + "&filesize=" + u.file.size + "&last_modified=" + u.file.lastModifiedDate.valueOf());
        xhr.send()
    }
    Uploader.prototype.notify_chunk_uploaded = function(chunk) {
        var u = this;
        if(u.get_state() != "processing") {
            return;
        }
        var xhr = new XMLHttpRequest();
        var key = u.settings.key;
        var upload_id = u.upload_id;
        xhr.open("GET", u.settings.ajax_base + '/chunk_loaded/?key=' + key + "&chunk=" + (chunk + 1)
            + "&upload_id=" + upload_id + "&filename=" + escape(u.file.name)
            + "&filesize=" + u.file.size + "&last_modified=" + u.file.lastModifiedDate.valueOf());
        xhr.send();
    }
    Uploader.prototype.check_already_uploaded = function(callback, error_callback) {
        var u = this;
        var xhr = new XMLHttpRequest();
        var method = "HEAD";
        var path = "/" + u.settings.key;
        var inner_handler = function(e) {
            // the handler only checks for status code;
            // if the HEAD returns 404, re-upload,
            // else, it returns 200 and finish the upload
            if(e.target.status / 100 == 2) {
                console.log("ALREADY UPLOADED");
                callback();
            } else {
                console.log(">><< ERROR");
                error_callback();
            }
        }
        xhr.addEventListener("load", inner_handler, true);
        xhr.addEventListener("error", function() {
            setTimeout(function() {
                return u.check_already_uploaded(callback, error_callback);
            }, 2500);
        }, true);
        xhr.open(method, u.settings.host + path)
        xhr.send();
    }
    Uploader.prototype.cancel = function(callback) {
        var u = this;
        for(var i=0; i<u._chunk_xhr.length; i++) {
            console.log("Abort chunk >> " + u._chunk_xhr[i]);
            u._chunk_xhr[i].abort();
        }
        u._intervals = u._intervals || {};
        for(var x in u._intervals) {
            clearInterval(u._intervals[x]);
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
        u._chunk_signatures = null;
        u._list_signature = null;
        u._end_signature = null;
        u._delete_signature = null;
        callback();

        u.set_state("waiting"); // wait for a new upload
    }
    Uploader.prototype.update_chunks = function(parts) {
        var u = this;
        var loaded = [];
        var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);

        u._init_chunks(true);
        u._uploading_chunks = [];
        u._loaded_chunks = [];

        for(var i=0; i<parts.length; i++) {
            var part_number = parseInt(parts[i][0]);
            u.add_loaded_chunk(part_number - 1);
            u.set_chunk_finished(part_number - 1);
            loaded.push(part_number - 1);
        }
        console.log(loaded);
        for(var i=0; i<num_chunks; i++) {
            if(loaded.indexOf(i) === -1) {
                console.log("CHUNK NOT LOADED >>> ", i);
                u.set_progress(i, 0);
            }
        }
    }
    Uploader.prototype.is_selected = function() {
        return !!this.file;
    }
    Uploader.prototype.get_state = function() {
        return this._state;
    }
    Uploader.prototype.set_state = function(state) {
        return this._state = state;
    }
    Uploader.prototype.set_progress = function(chunk, loaded) {
        console.log("PROGRESS --> " + chunk + ": " + loaded);
        this._progress = this._progress || {};
        this._progress[chunk] = loaded;
    }
    Uploader.prototype.get_total_progress = function() {
        var total = 0;
        for(var x in this._progress) {
            total += this._progress[x];
        }
        return total;
    }
    Uploader.prototype.is_chunk_loaded = function(chunk) {
        this._loaded_chunks = this._loaded_chunks || [];
        return this._loaded_chunks.indexOf(chunk) !== -1;
    }
    Uploader.prototype.add_loaded_chunk = function(chunk) {
        this._loaded_chunks = this._loaded_chunks || [];
        this._loaded_chunks.push(chunk);
        this.set_progress(chunk, this.settings.chunk_size);
    }
    Uploader.prototype.get_chunk_uploading = function(chunk) {
        this._uploading_chunks = this._uploading_chunks || [];
        return this._uploading_chunks.indexOf(chunk) !== -1;
    }
    Uploader.prototype.set_chunk_uploading = function(chunk, val) {
        if(typeof val == "undefined") {
            val = true;
        }
        this._uploading_chunks = this._uploading_chunks || [];
        if(val) {
            this._uploading_chunks.push(chunk);
        } else {
            var list = [];
            for(var i=0; i<this._uploading_chunks.length; i++) {
                if(this._uploading_chunks[i] != chunk) {
                    list.push(this._uploading_chunks[i]);
                }
            }
            this._uploading_chunks = list;
        }
    }
    Uploader.prototype._init_chunks = function(force) {
        var u = this;
        if(!u._chunks || force) {
            u._chunks = [];
            var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);
            for(var i=0; i<num_chunks; i++) {
                u._chunks.push(false);
            }
        }
    }
    Uploader.prototype.set_chunk_finished = function(chunk, val) {
        if(typeof val == "undefined") {
            val = true;
        }
        var u = this;
        u._init_chunks();
        u._chunks[chunk] = val;
    }
    Uploader.prototype.get_next_chunk = function() {
        var u = this;
        u._init_chunks();
        for(var i=0; i<u._chunks.length; i++) {
            if(!u._chunks[i] && !u.get_chunk_uploading(i)) {
                return i;
            }
        }
        return -1;
    }
    Uploader.prototype.upload_finished = function() {
        var u = this;
        u._init_chunks();
        for(var i=0; i<u._chunks.length; i++) {
            if(!u._chunks[i] || u.get_chunk_uploading(i)) {
                return false;
            }
        }
        return true;
    }
    Uploader.prototype.get_key = function() {
        return this.settings.key;
    }
    Uploader.prototype.get_upload_id = function() {
        return this.upload_id;
    }
    return new Uploader(input, settings);
};
