/*
 *
 * Written by Gabriel Purcaru
 * Copyright 2012 Cinely, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

function mule_upload(input, settings) {

    // in order to disable debugging statements, replace this with
    // console = function() {};
    var console = console || function() {};

    var KB = 1024;
    var MB = 1024 * KB;
    var GB = 1024 * MB;

    // for some webkit/mozilla browsers, the .slice() method is named .webkitSlice()
    File.prototype.slice = File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice;

    // if the browser doesn't support the new File API, abort
    if(!(window.File && window.FileList && window.Blob)) {
        return -1;
    }

    // for safari <6, the uploader doesn't work (no slice method, or no Blob at all)
    if((navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrom") === -1)
            && navigator.userAgent.indexOf("Version/6") === -1) {
        return -1;
    }

    // IE sucks
    if(navigator.userAgent.indexOf("MSIE") !== -1) {
        return -1;
    }

    // constructor
    function Uploader(input, settings) {
        var u = this;

        settings = settings || {};

        // NOTE: For Amazon S3, the minimum chunk size is 5MB
        settings.chunk_size = settings.chunk_size || (6 * MB); // default 6MB
        settings.key = settings.key || "default_key"; // sensible defaults (helps with debugging)
        settings.bucket = settings.bucket || "your_bucket";
        settings.host = settings.host || "http://" + settings.bucket + ".s3.amazonaws.com";
        settings.access_key = settings.access_key || "AWSACCESSKEY";
        settings.content_type = settings.content_type || "the_mime_type"; // must match the backend
        settings.ajax_base = settings.ajax_base || "/ajax/upload"; // e.g. the get_init_signature url is
                                                                   // /ajax/upload/get_init_signature/
        settings.max_size = settings.max_size || 5 * (1 << 30); // 5GB

        // callbacks
        settings.on_progress = settings.on_progress || function() {};
        settings.on_select = settings.on_select || function() {};
        settings.on_error = settings.on_error || function() {};
        settings.on_complete = settings.on_complete || function() {};
        settings.on_init = settings.on_init || function() {};
        settings.on_start = settings.on_start || function() {};
        u.settings = settings;

        u.input = input;
        this.set_state("waiting");

        u.input.onchange = function(e, force) {
            if(u.get_state() != "waiting") {
                // make sure the event is only fired once
                return false;
            }

            var file = e.target.files[0];
            u.file = file;

            // some browsers don't support lastModifiedDate
            u.file.lastModifiedDate = u.file.lastModifiedDate || new Date(0);

            if(file.size > u.settings.max_size) {
                // TODO: make sure the alert reflects the max_size setting
                alert("The maximum allowed file size is 5GB. Please select another file.");
                return;
            }

            // initialize the file upload
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
                        })
                    }
                    xhr.addEventListener("load", handler, true);
                    xhr.addEventListener("error", handler, true);

                    xhr.open(method, settings.host + path, true);

                    xhr.setRequestHeader("x-amz-date", date);
                    xhr.setRequestHeader("x-amz-acl", "public-read");
                    xhr.setRequestHeader("Authorization", authorization);
                    xhr.send();
                } else {
                    if(!force) {
                        u.list_parts(function() {
                            // success means succeed
                            u.get_all_signatures(function() {
                                u.load_file(file);
                            });
                        }, function() {
                            u.upload_id = null;
                            u.settings.key = u.reset_key();
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
            u.settings.on_progress(u, 0, u.file.size);
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
            var error_handler = function(e) {
                if(error_handled) {
                    return
                }
                error_handled = true;

                console.log("-- ERROR ------------");
                console.debug(arguments);
                console.log("-- ERROR ------------");
                window.debug = u;
                xhr.abort();
                console.log("RETRY CHUNK >> " + chunk);
                clearInterval(u._intervals[chunk]);
                setTimeout(function() {
                    if(u.get_state() == "processing") {
                        u.set_chunk_uploading(chunk, false);
                        var next_chunk = u.get_next_chunk();
                        if(next_chunk !== -1) {
                            u.upload_chunk(u.get_next_chunk());
                        }
                    }
                }, 1000);
            }
            var path = "/" + u.settings.key;

            // The chunk number is 0-indexed to simplify the calculations,
            // but S3 requires 1-indexed part numbers
            path += "?partNumber=" + (chunk + 1) + "&uploadId=" + u.upload_id;
            var method = "PUT";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;
            var blob = u.file.slice(start, end);

            xhr.upload.addEventListener("progress", progress_handler, true);
            xhr.addEventListener("readystatechange", handler, true);

            // xhr.addEventListener("error", error_handler, true);
            xhr.addEventListener("timeout", error_handler, true);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.setRequestHeader("Content-Type", u.settings.content_type);
            xhr.send(blob);

            u._chunk_xhr = u._chunk_xhr || [];
            u._chunk_xhr.push(xhr);

            u._intervals[chunk] = setInterval(function() {
                if(last_progress_time && (new Date - last_progress_time) > 15000) { // 15s
                    console.log("CHUNK FAILED; RETRY");
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
        u.settings.on_progress.call(u, u.file.size, u.file.size); // 100% done.
        this.get_end_signature(function(signature, date) {
            var path = "/" + u.settings.key + "?uploadId=" + u.upload_id;
            var method = "POST";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            var xhr = new XMLHttpRequest();
            var handler = function(e) {
                if(e.target.status / 100 == 2) {
                    console.log("Finished file.");
                    u.settings.on_progress.call(u, u.file.size, u.file.size); // it's 100% done
                    u.settings.on_complete.call(u);
                } else {
                    // 404 = NoSuchUpload = Upload already finished, need to re-upload
                    u.cancel(function() {
                        u.input.onchange(null, true);
                    });
                }
            }
            xhr.addEventListener("load", handler, true);
            xhr.addEventListener("error", handler, true);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.setRequestHeader("Content-Type", u.settings.content_type);
            u.list_parts(function(parts) {
                var data = "<CompleteMultipartUpload>";
                for(var i=0; i<parts.length; i++) {
                    data += "<Part>";
                    data += "<PartNumber>" + parts[i][0] + "</PartNumber>";
                    data += "<ETag>" + parts[i][1] + "</ETag>";
                    data += "</Part>";
                }
                data += "</CompleteMultipartUpload>";
                xhr.send(new Blob([data]));
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
                if(e.target.status / 100 != 2) {
                    return error_callback(e);
                }
                var xml = e.target.responseText;
                var parts = [];
                $(xml).find('Part').each(function() {
                    parts.push([
                        $(this).find("PartNumber").text(),
                        $(this).find("ETag").text()
                    ]);
                });
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
            var response = JSON.parse(e.target.responseText);

            // the server may also respond with chunks already loaded
            if(response.chunks) {
                console.log("Resume upload...")
                var chunks = response.chunks;
                u._progress = u._progress || [];
                for(var i=0; i<chunks.length; i++) {
                    console.log("Chunk already loaded >>>" + (chunks[i] - 1))
                    u._progress[chunks[i]] = u.settings.chunk_size;
                    u.add_loaded_chunk(chunks[i] - 1);
                    u.set_chunk_finished(chunks[i] - 1);
                }
                console.log("Bytes loaded: " + u.get_total_progress());
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
    Uploader.prototype.cancel = function(callback) {
        var u = this;
        this.get_delete_signature(function(signature, date) {
            callback = callback || function() {};
            var xhr = new XMLHttpRequest();
            var method = "DELETE";
            var path = "/" + u.settings.key + "?uploadId=" + u.upload_id;
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            var handler = function() {
                u.set_state("canceled");
                u._chunk_xhr = u._chunk_xhr || [];
                for(var i=0; i<u._chunk_xhr.length; i++) {
                    console.log("Abort chunk >> " + u._chunk_xhr[i]);
                    u._chunk_xhr[i].abort();
                }
                u._intervals = u._intervals || {};
                for(var x in u._intervals) {
                    clearInterval(u._intervals[x]);
                }
                u.settings.on_progress.call(u, 0, 0);
                callback();
                u._chunk_xhr = null;
                u._chunks = null;
                u._uploading_chunks = null;
                u._loaded_chunks = null;
                u._start_fired = false;
                u.upload_id = null;
                u.settings.key = u.reset_key();
                u._progress = null;
                u._chunk_signatures = null;
                u._list_signature = null;
                u._end_signature = null;
                u._delete_signature = null;

                u.set_state("waiting"); // wait for a new upload
            }
            xhr.addEventListener("load", handler, true);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.send();
        });
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
    Uploader.prototype._init_chunks = function() {
        var u = this;
        if(!u._chunks) {
            u._chunks = [];
            var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);
            for(var i=0; i<num_chunks; i++) {
                u._chunks.push(false);
            }
        }
    }
    Uploader.prototype.set_chunk_finished = function(chunk) {
        var u = this;
        u._init_chunks();
        u._chunks[chunk] = true;
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
    Uploader.prototype.reset_key = function() {
        return 'x-unconverted/' + 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
    return new Uploader(input, settings);
};
