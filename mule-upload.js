/**
 * mule-upload.js
 *
 * Copyright 2012, Gabriel Purcaru
 * Released under GPL License.
 * License: http://www.gnu.org/copyleft/gpl.html
 */

var mule_upload = function(input, settings) {
    var KB = 1024;
    var MB = 1024 * KB;
    var GB = 1024 * MB;

    // for new webkit browsers, the .slice() method is named .webkitSlice()
    File.prototype.slice = File.prototype.slice || File.prototype.webkitSlice || File.prototype.mozSlice;

    if(!(window.File && window.FileList && window.Blob)) {
        throw "No html5 support on this browser.";
    }
    function Uploader(input, settings) {
        var u = this;

        settings = settings || {};

        // NOTE: For Amazon S3, the minimum chunk size is 5MB
        settings.chunk_size = settings.chunk_size || (6 * MB); // default 6MB
        settings.key = settings.key || "x-unconverted/default_key";
        settings.bucket = settings.bucket || "akiai-raw";
        settings.host = settings.host || "http://" + settings.bucket + ".s3.amazonaws.com";
        settings.access_key = settings.access_key || "AKIAI5ZJJJBHYIH5YUQQ";
        settings.content_type = settings.content_type || "application/octet-stream";
        settings.on_progress = settings.on_progress || function() {};
        settings.on_select = settings.on_select || function() {};
        settings.on_error = settings.on_error || function() {};
        settings.on_complete = settings.on_complete || function() {};
        settings.on_init = settings.on_init || function() {};
        u.settings = settings;

        u.input = input;
        this.set_state("waiting");

        u.input.onchange = function(e) {
            var file = e.target.files[0];
            u.file = file;
            u.file.key = u.settings.key;
            if(!u._start_fired) {
                u.settings.on_start(u.file);
                u._start_fired = true;
            }

            // initialize file upload
            u.get_init_signature(function(signature, date) {
                if(!u.upload_id) {
                    var path = "/" + settings.key + "?uploads";
                    var method = "POST";
                    var authorization = "AWS " + settings.access_key + ":" + signature;

                    var xhr = new XMLHttpRequest();
                    var handler = function(e) {
                        u.settings.on_select(file);
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
                    u.get_all_signatures(function() {
                        u.load_file(file);
                    });
                }
            });
        }
        u.settings.on_init();
    }

    Uploader.prototype.load_file = function(file) {
        if(this.get_state() != "waiting") {
            console.log("Not waiting: " + this.get_state());
            return;
        }
        this.set_state("processing");
        this.upload_chunk(0);
    }
    Uploader.prototype.upload_chunk = function(chunk) {
        console.log(">>> UPLOADING CHUNK: " + chunk);
        var u = this;
        u.get_chunk_signature(chunk, function(signature, date) {

            var length = u.settings.chunk_size;
            var start = chunk * length;
            var end = Math.min(start + length, u.file.size);

            if(u.is_chunk_loaded(chunk)) {
                if(end < u.file.size) {
                    return u.upload_chunk(chunk + 1);
                } else {
                    return u.finish_upload();
                }
            }

            var blob = u.file.slice(start, end);
            var xhr = new XMLHttpRequest();
            var handler = function(e) {
                if(e.target.readyState != 4) { // 4 = XHR done
                    return;
                }
                console.log("CHUNK " + chunk + " UPLOADED");
                u.notify_chunk_uploaded(chunk);
                if(end < u.file.size) {
                    u.upload_chunk(chunk + 1);
                } else {
                    console.log("Done");
                    u.finish_upload();
                }

            }
            var progress_handler = function(e) {
                u.set_progress(chunk, e.loaded);
                u.settings.on_progress(u.get_total_progress(), u.file.size);
            }
            var error_handler = function(e) {
                console.log("-- ERROR ------------");
                console.debug(arguments);
                console.log("-- ERROR ------------");
                xhr.abort();
                console.log("RETRY CHUNK >> " + chunk);
                setTimeout(function() {
                    u.upload_chunk(chunk);
                }, 1000);
            }
            var path = "/" + u.settings.key;

            // The chunk number is 0-indexed to simplify the calculations,
            // but S3 requires 1-indexed part numbers
            path += "?partNumber=" + (chunk + 1) + "&uploadId=" + u.upload_id;
            var method = "PUT";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            xhr.upload.addEventListener("progress", progress_handler, true);
            xhr.addEventListener("readystatechange", handler, true);

            xhr.addEventListener("error", error_handler, true);
            xhr.addEventListener("timeout", error_handler, true);

            xhr.open(method, u.settings.host + path, true);

            xhr.setRequestHeader("x-amz-date", date);
            xhr.setRequestHeader("Authorization", authorization);
            xhr.setRequestHeader("Content-Type", u.settings.content_type);
            xhr.send(blob);
        });
    }
    Uploader.prototype.finish_upload = function() {
        var u = this;
        u.settings.on_progress(u.file.size, u.file.size); // 100% done.
        this.get_end_signature(function(signature, date) {
            var path = "/" + u.settings.key + "?uploadId=" + u.upload_id;
            var method = "POST";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            var xhr = new XMLHttpRequest();
            var handler = function(e) {
                console.log("Finished file.");
                u.settings.on_complete();
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
                xhr.send(data);
            })
        });
    }
    Uploader.prototype.list_parts = function(callback) {
        var u = this;
        this.get_list_signature(function(signature, date) {
            var path = "/" + u.settings.key + "?uploadId=" + u.upload_id;
            var method = "GET";
            var authorization = "AWS " + u.settings.access_key + ":" + signature;

            var xhr = new XMLHttpRequest();
            var handler = function(e) {
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
            xhr.addEventListener("error", handler, true);

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
            var response = JSON.parse(e.target.response);
            callback(response.signature, response.date);
        }
        var error_handler = function() {
            setTimeout(function() {
                u.get_end_signature(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", "/ajax/upload/get_end_signature/?upload_id=" + escape(this.upload_id)
                + "&key=" + this.settings.key);
        xhr.send();
    }
    Uploader.prototype.get_list_signature = function(callback) {
        var u = this;
        if(u._list_signature) {
            callback(u._list_signature[0], u._list_signature[1]);
            return;
        }
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            var response = JSON.parse(e.target.response);
            callback(response.signature, response.date);
        }
        var error_handler = function() {
            setTimeout(function() {
                u.get_list_signature(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", "/ajax/upload/get_list_signature/?upload_id=" + escape(this.upload_id)
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
            var response = JSON.parse(e.target.response);
            callback(response.signature, response.date);
        }
        var error_handler = function(e) {
            setTimeout(function() {
                u.get_chunk_signature(chunk, callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", "/ajax/upload/get_chunk_signature/?chunk=" + (chunk + 1) + "&upload_id=" + escape(this.upload_id)
                + "&key=" + this.settings.key);
        xhr.send();
    }
    Uploader.prototype.get_init_signature = function(callback) {
        var u = this;
        var xhr = new XMLHttpRequest();
        var handler = function(e) {
            var response = JSON.parse(e.target.response);

            // the server may also respond with chunks already loaded
            if(response.chunks) {
                console.log("Resume upload...")
                var chunks = response.chunks;
                u._progress = u._progress || [];
                for(var i=0; i<chunks.length; i++) {
                    u._progress[chunks[i]] = u.settings.chunk_size;
                    u.add_loaded_chunk(chunks[i] - 1);
                }
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
        xhr.open("GET", "/ajax/upload/get_init_signature/?key=" + this.settings.key
                + "&filename=" + this.file.name + "&filesize=" + this.file.size
                + "&last_modified=" + this.file.lastModifiedDate.valueOf());
        xhr.send();
    }
    Uploader.prototype.get_all_signatures = function(callback) {
        var u = this;
        var key = u.settings.key;
        var num_chunks = Math.ceil(u.file.size / u.settings.chunk_size);
        var upload_id = u.upload_id;
        var xhr = new XMLHttpRequest()
        var handler = function(e) {
            var response = JSON.parse(e.target.response);
            u._chunk_signatures = response.chunk_signatures;
            u._list_signature = response.list_signature;
            u._end_signature = response.end_signature;
            callback();
        }
        var error_handler = function() {
            setTimeout(function() {
                u.get_all_signatures(callback);
            }, 1000);
        }
        xhr.addEventListener("load", handler, true);
        xhr.addEventListener("error", error_handler, true);
        xhr.open("GET", "/ajax/upload/get_all_signatures/?key=" + key + "&num_chunks="
            + num_chunks + "&upload_id=" + upload_id + "&filename=" + escape(u.file.name)
            + "&filesize=" + u.file.size + "&last_modified=" + u.file.lastModifiedDate.valueOf());
        xhr.send()
    }
    Uploader.prototype.notify_chunk_uploaded = function(chunk) {
        var u = this;
        var xhr = new XMLHttpRequest();
        var key = u.settings.key;
        var upload_id = u.upload_id;
        xhr.open("GET", '/ajax/upload/chunk_loaded/?key=' + key + "&chunk=" + (chunk + 1)
            + "&upload_id=" + upload_id + "&filename=" + escape(u.file.name)
            + "&filesize=" + u.file.size + "&last_modified=" + u.file.lastModifiedDate.valueOf());
        xhr.send();
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
        self._loaded_chunks = self._loaded_chunks || [];
        return self._loaded_chunks.indexOf(chunk) !== -1;
    }
    Uploader.prototype.add_loaded_chunk = function(chunk) {
        self._loaded_chunks = self._loaded_chunks || [];
        self._loaded_chunks.push(chunk);
    }
    return new Uploader(input, settings);
};
