/* @flow */

import XHR from './xhr';
import { AmazonXHR, XHREvent } from './amazonXhr';
import log from './log';
import utils from './utils';
import { KB, MB, GB, SECONDS } from './constants';

type UploaderSettings = {
  fileInput: any;
  file: any;
  autostart: any;
  chunkSize: number;
  maxSize: number;
  numWorkers: number;
  key: string;
  backupKey: string;
  bucket: string;
  accessKey: string;
  contentType: string;
  acl: string;
  onProgress: () => void;
  onChunkProgress: () => void;
  onSelect: () => void;
  onError: () => void;
  onComplete: () => void;
  onInit: () => void;
  onStart: () => void;
  onChunkUploaded: () => void;
  ajaxBase: string;
  acceptedExtensions: string;
};

export default class Uploader {
  input: any;
  file: any;
  settings: UploaderSettings;
  auth: any;
  uploadId: any;
  chunks: Array<boolean>;
  loadedChunks: Array<Number>;
  progress: { [key: number]: number };
  totalProgress: number;
  loadedChunks: any;
  uploadingChunks: any;
  startFired: boolean;
  intervals: any;
  chunkXhr: Array<XMLHttpRequest>;
  state: string;

  constructor(settings: UploaderSettings) {
    let self = this;

    settings = settings || {};

    // Make the input element another possible setting
    // in some cases (e.g. drag & drop) there is no input element
    this.input = settings.fileInput;
    this.file  = settings.file;

    // The file starts automatically by default; you have to set
    // autostart: false explicitly if you want to use a start button
    // if autostart is false, you can use the Uploader.prototype.start()
    // function. Note that the user has to select a file first
    settings.autostart = ('autostart' in settings ? settings.autostart : true);

    // NOTE: For Amazon S3, the minimum chunk size is 5MB
    // we are using 6 for safe measure. Note that the maximum number of chunks
    // is 10,000, so for example, if the chunk size is 6MB, the maximum
    // possible file size is 6MB * 10,000 = ~58GB
    settings.chunkSize = settings.chunkSize || (6 * MB); // default 6MB
    settings.maxSize = settings.maxSize || 5 * GB; // 5GB

    // The number of parallel upload xhr's
    settings.numWorkers = settings.numWorkers || 4;

    // The S3 object key; I recommend to generate this dynamically (e.g.
    // a random string) to avoid unwanted overwrites.
    settings.key = settings.key || 'the_key';

    // The Amazon S3 bucket where you'll store the uploads
    settings.bucket = settings.bucket;

    // The Amazon S3 access key. DO NOT give the AWS Secret code!
    settings.accessKey = settings.accessKey;

    // The Mime-Type of the content. You must match this with the backend value
    // or you'll get an Invalid Signature error. If unsure about the
    // mime type, use application/octet-stream
    settings.contentType = settings.contentType || 'application/octet-stream';


    // ACL can be set to:
    // private
    // public-read (* default)
    // public-read-write
    // authenticated-read
    // bucket-owner-read
    // bucket-owner-full-control
    // log-delivery-write
    settings.acl = settings.acl || 'public-read';

    // Various callbacks
    settings.onProgress = settings.onProgress             || function() {};
    settings.onChunkProgress = settings.onChunkProgress   || function() {};
    settings.onSelect = settings.onSelect                 || function() {};
    settings.onError = settings.onError                   || function() {};
    settings.onComplete = settings.onComplete             || function() {};
    settings.onInit = settings.onInit                     || function() {};
    settings.onStart = settings.onStart                   || function() {};
    settings.onChunkUploaded = settings.onChunkUploaded   || function() {};

    // The location prefix of the uploader's backend
    settings.ajaxBase = settings.ajaxBase || '/upload-backend';

    // Extensions comma delimited without period (jpg,jpeg,png,gif)
    settings.acceptedExtensions = settings.acceptedExtensions || '';

    // Set the values so that they can be used everywhere, as needed
    self.settings = settings;

    // The "waiting" state means the uploader is waiting for the user
    // to select a file
    self.setState('waiting');

    if(self.input) {
      self.input.onchange = function(e, force) {
        if(!self.settings.autostart) {
          return true;
        }
        // the `onchange` event may be triggered multiple times, so we
        // must ensure that the callback is only executed the first time
        if(self.getState() !== 'waiting') {
          return false;
        }

        // the uploader doesn't support multiple uploads at this time,
        // so we get the first file
        var file = e.target.files[0];
        self.uploadFile(file, force);
        return true;
      };
    }

    // trigger the init event callback
    setTimeout(function() {
      self.settings.onInit.apply(self);
    }, 100);
  }

  start() {
    if(this.input && this.input.files && this.input.files.length > 0) {
      return this.uploadFile(this.input.files[0], false);
    } else {
      alert('No file selected');
    }
  }

  uploadFile(file: any, force: boolean) {
    var self = this;

    // The `onchange` event may be triggered multiple times, so we
    // must ensure that the callback is only executed the first time
    // also make sure the file is not already set.
    if(self.getState() !== 'waiting') {
      return false;
    }

    if(file) {
      self.file = file;
    }

    if(!self.file) {
      return false;
    }

    // We use the lastModifiedDate, the file name and size to uniquely
    // identify a file. There may be false positives and negatives,
    // but the chance for a false positive is basically zero
    // some browsers don't report the last modified date, so we default
    // to a blank date
    try {
      self.file.lastModifiedDate = this.file.lastModifiedDate || new Date(0);
    } catch(e) {
      // ...
    }

    if(self.file.size > self.settings.maxSize) {
      alert([
        'The maximum allowed file size is ',
        (self.settings.maxSize / GB),
        'GB. Please select another file.',
      ].join(''));
      return false;
    }

    // Check for accepted extensions, if applicable
    if(self.settings.acceptedExtensions) {
      // Get the file extension
      var fileExtension = file.name.split('.').pop();

      // Split the given extensions into an array
      var extensionsArray = self.settings.acceptedExtensions.split(',');

      // And match the extension against the given extension list
      var fileAccepted = false;
      for(var i = 0; i < extensionsArray.length; i++) {
        if(fileExtension === extensionsArray[i]) {
          fileAccepted = true;
          break;
        }
      }

      // If the file is not accepted, notify the user and return
      if(!fileAccepted) {
        alert([
          'This file format is not accepted. ',
          'Please use a file with an extension like ',
          self.settings.acceptedExtensions,
        ].join(''));
        return false;
      }
    }

    // Initialize the file upload
    // also, allow the library user to programatically cancel the upload if,
    // for example, the file is too large
    const result = self.settings.onSelect.call(this, file);
    if(result === false) {
      self.file = null;
      self.input.value = '';
      return;
    }

    var args = Object.assign(this.settings.extraParams || {}, {
      filename: file.name,
      filesize: file.size,
      lastModified: file.lastModifiedDate.valueOf(),
    });

    if(force) {
      args.force = true;
    }

    // Get the signing key. It will also return
    // a file key + uploadId pair if the selected file
    // is already uploading. It also returns a
    // backup_key in case that file upload already completed.
    // The signing key is valid for 7 days
    XHR({
      url: self.settings.ajaxBase + '/signing_key/',
      extraParams: args,
      headers: {},
      method: 'GET',
      loadCallback: function(e) {
        var json = JSON.parse(e.target.responseText);
        json.date = new Date(json.date);
        self.auth = json;
        self.uploadId = json.uploadId;
        self.chunks = json.chunks;
        self.settings.key = json.key || self.settings.key;
        self.settings.backupKey = self.settings.key;

        if(!self.uploadId) {
          AmazonXHR.init(json, self.settings.key, file, function(e) {
            var xml = e.target.responseXML;

            // Get the given upload id
            self.uploadId = xml.getElementsByTagName('UploadId')[0].textContent;

            self.loadFile();
          });
        } else {
          // Resume a previus upload
          if(!force) {
            // Get the uploaded parts from S3
            AmazonXHR.list(
              self.auth, self.file, self.settings.key,
              self.uploadId, self.settings.chunkSize, function(parts) {
                for(var i = 0; i < parts.length; i++) {
                  var chunk = parts[i][0] - 1;
                  self.setProgress(chunk, self.getChunkSize(chunk));
                  self.setChunkFinished(chunk);
                  self.setChunkUploading(chunk, false);
                }
                self.loadFile();
              }, function() {
                // If it fails, re-initiate the upload, and force
                // it to start a new upload
                self.uploadId = null;
                self.loadedChunks = null;
                self.progress = {};
                self.totalProgress = 0;
                self.loadedChunks = null;
                self.uploadingChunks = null;
                self.chunks = [];
                self.settings.key = self.settings.backupKey;
                self.uploadFile(file, true); // Force reload
              }
            );
          } else {
            // force-start the upload
            self.loadFile();
          }
        }
      },
    });
  }

  loadFile() {
    var self = this;

    // We can't start the upload if we are waiting for user input
    if(self.getState() !== 'waiting') {
      return;
    }

    // Make sure we only trigger the start event once
    if(!self._startFired) {
      // Trigger the start event callback
      self.settings.onStart.call(self, self.file);

      // And also trigger a progress callback with 0%
      self.settings.onProgress.call(self, 0, self.file.size);
      self.startFired = true;
    }

    // From now on, we are "processing" the file upload
    self.setState('processing');

    // At this point we may have some chunks already uploaded,
    // So we may trigger a progress callback with the reported progress
    self.settings.onProgress.call(
      self, self.getTotalProgress(), self.file.size
    );

    // Get the next chunk
    var nextChunk = self.getNextChunk();

    if(nextChunk !== -1) {
      // And start uploading it
      self.uploadChunk(nextChunk);
    } else if(self.uploadFinished()) {
      // If we finished, trigger the upload finish sequence
      log('All done; finish upload');
      self.finishUpload();
    }

    for(var i = 0; i < this.settings.numWorkers - 1; i++) {
      nextChunk = self.getNextChunk();
      if(nextChunk !== -1) {
        self.uploadChunk(nextChunk);
      } else {
        break;
      }
    }
  }

  uploadChunk(chunk: number) {
    var self = this;

    // Make sure we're in processing mode
    if(self.getState() !== 'processing') {
      log('NOT processing; return');
      return;
    }

    // Also make sure we're not already uploading this chunk
    if(self.getChunkUploading(chunk)) {
      log('Already Uploading');
      setTimeout(function() {
        var nextChunk = self.getNextChunk();
        if(nextChunk !== -1) {
          self.uploadChunk(self.getNextChunk());
        }
      }, 1000);
      return;
    } else {
      // Mark this chunk as uploading
      self.setChunkUploading(chunk);
    }
    log(`Uploading Chunk: ${chunk}`);

    // If we already uploaded this chunk, get to the next one
    // if there is no next chunk, finish the upload
    if(self.isChunkLoaded(chunk)) {
      var nextChunk = self.getNextChunk();
      if(nextChunk !== -1) {
        self.uploadChunk(nextChunk);
      } else {
        if(self.uploadFinished()) {
          log('No next chunk; finish upload');
          self.finishUpload();
        }
      }
    }

    var length = self.settings.chunkSize;

    // Get the start and end bytes for the needed chunk
    var start = chunk * length;
    var end = Math.min(start + length, self.file.size);

    // We need the last progress time in order to detect hanging
    // uploads
    var lastProgressTime = new Date();
    self.intervals = self.intervals || {};

    var errorHandled = false;
    var errorHandler: () => void = function() {
      var errorArguments = arguments;
      var xhr = this;
      // The upload may have finished, so check for that
      self.checkAlreadyUploaded(function() {
        // If already uploaded
        self.setState('finished');

        // TODO: what is this?
        // self.notifyUploadFinished();

        // Trigger a final progress event callback, with 100%
        self.settings.onProgress.call(self, self.file.size, self.file.size);

        // Also trigger the complete event callback
        self.settings.onComplete.call(self);
      }, function() {
        // We have a genuine error
        log(`Error: ${errorArguments}`);

        // make sure we don't handle the same error more than once
        if(errorHandled) {
          return;
        }
        errorHandled = true;

        // abort the chunk upload
        self.setChunkUploading(chunk, false);
        self.setChunkFinished(chunk, false);
        self.setProgress(chunk, 0);
        log('Abort');
        try {
          xhr.abort();
        } catch(e) {
          log(e);
        }

        log(`Retry chunk: ${chunk}`);

        // Clear the watcher interval
        clearInterval(self.intervals[chunk]);

        // Re-try the upload
        setTimeout(function() {
          if(self.getState() === 'processing') {
            // And proceed
            var nextChunk = self.getNextChunk(chunk);
            if(nextChunk !== -1) {
              self.uploadChunk(nextChunk);
            }
          }
        }, 1000);
      });
    };

    // The "readystatechange" handler
    var handler = function(e) {
      // We care about the "done" event triggered while processing
      if(e.target.readyState !== this.DONE ||
          self.getState() !== 'processing') {
        log(e);
        return;
      }

      // If we don't receive a 2XX response, trigger an error
      if(parseInt(e.target.status) / 100 !== 2) {
        if(typeof errorHandler === 'function') {
          return errorHandler.apply(this);
        }
      }

      // At this point, we know that this chunk finished uploading
      log(`Chunk uploaded: ${chunk}`);

      // Notify the server of the uploaded chunk
      self.notifyChunkUploaded(chunk);

      // And also trigger the chunk_uploaded callback
      self.settings.onChunkUploaded.call(self, chunk);

      // Cancel the xhr watcher interval
      clearInterval(self.intervals[chunk]);

      // Mark the chunk as finished
      self.setProgress(chunk, self.getChunkSize(chunk));
      self.setChunkFinished(chunk);
      self.setChunkUploading(chunk, false);

      // Get next chunk; if we're out of chunks,
      // finish the upload
      var nextChunk = self.getNextChunk();
      if(nextChunk !== -1) {
        self.uploadChunk(nextChunk);
      } else if(self.uploadFinished()) {
        log('Done');
        self.finishUpload();
      } else {
        var interval = setInterval(function() {
          var chunk = self.getNextChunk();
          if(chunk !== -1) {
            clearInterval(interval);
            self.uploadChunk(chunk);
          } else if(self.uploadFinished()) {
            clearInterval(interval);
            self.finishUpload();
          }
        }, 1000);
      }
    };

    // The upload progress handler
    var progressHandler = function(e) {
      // Set the internal chunk's progress value to the reported amount
      self.setProgress(chunk, e.loaded);

      // Trigger the progress event callback
      self.settings.onProgress.call(
        self, self.getTotalProgress(), self.file.size
      );

      // Update the last_progress_time for the watcher interval
      lastProgressTime = new Date();
    };

    AmazonXHR.uploadChunk(
      self.auth, self.settings.key, self.uploadId,
      chunk, self.file.slice(start, end), {
        progressCallback: progressHandler,
        stateChangeCallback: handler,
        errorCallback: errorHandler,
        timeoutCallback: errorHandler,
      }, function(xhr) {
        self.chunkXhr = self.chunkXhr || [];
        self.chunkXhr.push(xhr);

        // The watcher interval; it cancels the xhr if it times out
        self.intervals[chunk] = setInterval(function() {
          if(lastProgressTime &&
              (new Date() - lastProgressTime) > 15 * SECONDS) { // 15s
            log('Chunk Failed; retry');
            clearInterval(self.intervals[chunk]);
            if(self.getState() === 'processing') {
              xhr.abort();
              errorHandler.call(xhr);

              if (typeof self.chunkXhr[this._chunkXhr.indexOf(xhr)]
                    !== 'undefined') {
                delete self.chunkXhr[this._chunkXhr.indexOf(xhr)];
              }
            }
          }
        }, 4 * SECONDS); // Every 4s
      }
    );
  }

  finishUpload() {
    var self = this;

    // Make sure it's not triggered when not processing (e.g. multiple times)
    if(self.getState() !== 'processing') {
      return;
    }

    // Change the upload's state
    self.setState('finishing');

    self.settings.onProgress.call(
      self, self.file.size, self.file.size
    ); // 100% done.


    var handler = function(e: XHREvent) {
      // I.e. if it's a 2XX response
      if(Math.floor(e.target.status / 100) === 2) {
        log('Finished file.');
        self.setState('finished');
        self.settings.onProgress.call(
          self, self.file.size, self.file.size
        ); // It's 100% done

        // Trigger the complete event callback
        self.settings.onComplete.call(self);
      } else if(e.target.status === 400 &&
          e.target.responseText.indexOf('EntityTooSmall') !== -1) {
        // An "EntityTooSmall" error means that we missed a chunk
        AmazonXHR.list(
          self.auth,
          self.file,
          self.settings.key,
          self.uploadId,
          self.settings.chunkSize,
          (parts) => {
            self.updateChunks(parts);
            var nextChunk = self.getNextChunk();
            self.setState('processing');
            self.uploadChunk(nextChunk);
          },
          () => {}
        );
      } else if(e.target.status === 404) {
        // 404 = NoSuchUpload = check if already finished
        // If so, start a new upload
        self.cancel(function() {
          self.uploadFile(self.file, true);
        });
      } else {
        self.checkAlreadyUploaded(function() {
          handler({
            target: {
              status: 200,
              responseXML: '',
              responseText: '',
            },
          });
        }, function() {
          handler({
            target: {
              status: 404,
              responseXML: '',
              responseText: '',
            },
          });
        });
      }
    };

    AmazonXHR.list(
      self.auth, self.file, self.settings.key,
      self.uploadId, self.settings.chunkSize,
      (parts) => {
        var numChunks = Math.ceil(self.file.size / self.settings.chunkSize);

        // Check that we uploaded all the chunks; if we didn't,
        // start uploading the missing ones
        if(parts.length !== numChunks) {
          self.updateChunks(parts);
          var nextChunk = self.getNextChunk();
          self.setState('processing');
          self.uploadChunk(nextChunk);
          return;
        }

        AmazonXHR.finish(
          self.auth, self.settings.key, self.uploadId, parts, handler
        );
      },
      () => {},
    );
  }

  notifyChunkUploaded(chunk: number) {
    var self = this;
    if(self.getState() !== 'processing') {
      return;
    }
    var key = self.settings.key;
    var uploadId = self.uploadId;
    var url = `${self.settings.ajaxBase}/chunk_loaded/`;

    var args = Object.assign(self.settings.extraParams || {}, {
      chunk,
      key,
      uploadId,
      filename: self.file.name,
      filesize: self.file.size,
      lastModified: self.file.lastModifiedDate.valueOf(),
    });

    XHR({
      url,
      headers: {},
      method: 'GET',
      extraParams: args,
    });
  }

  checkAlreadyUploaded(callback: () => void, errorCallback: () => void) {
    var self = this;
    var method = 'HEAD';
    var path = `/${self.settings.key}`;
    var innerHandler = function(e) {
      // The handler only checks for status code;
      // if the HEAD returns 404, re-upload,
      // else, it returns 200 and finish the upload
      if(Math.ceil(e.target.status / 100) === 2) {
        log('Already Uploaded');
        callback();
      } else {
        log('Error!');
        errorCallback();
      }
    };

    if(!errorCallback && typeof(errorCallback) !== 'function') {
      errorCallback = function() {
        setTimeout(function() {
          return self.checkAlreadyUploaded(callback, errorCallback);
        }, 2500);
      };
    }


    const regionString = utils.regionString(self.auth.region);
    const protocol = location.protocol;
    const bucket = self.auth.bucket;
    var host = `s3${regionString}.amazonaws.com`;
    var url = `${protocol}//${host}/${bucket}/${path}`;
    XHR({
      url,
      method,
      headers: {},
      loadCallback: innerHandler,
      errorCallback: errorCallback,
    });
  }

  cancel(callback: () => void) {
    // Empty all fields, cancel all intervals, abort all xhr's
    this.chunkXhr.map((chunk) => {
      log(`Abort chunk: ${chunk}`);
      chunk.abort();
    });
    this.intervals = this._intervals || {};
    for(let key in this.intervals) {
      if(this.intervals.hasOwnProperty(key)) {
        clearInterval(this.intervals[key]);
      }
    }
    callback = callback || function() {};
    this.setState('canceled');
    this.chunkXhr = this._chunkXhr || [];
    this.settings.onProgress.call(this, 0, 0);
    this.chunkXhr = [];
    this.chunks = [];
    this.uploadingChunks = null;
    this.loadedChunks = null;
    this.startFired = false;
    this.uploadId = null;
    this.progress = {};
    this.setState('waiting'); // wait for a new upload
    callback();
  }

  updateChunks(parts: Array<any>) {
    var loaded = [];
    var numChunks = Math.ceil(this.file.size / this.settings.chunkSize);

    this._initChunks(true);
    this.uploadingChunks = [];
    this.loadedChunks = [];

    parts.map((part) => {
      var partNumber = parseInt(part[0], 10);
      this.addLoadedChunk(partNumber - 1);
      this.setChunkFinished(partNumber - 1);
      loaded.push(partNumber - 1);
    });

    for(let chunkNum = 0; chunkNum < numChunks; chunkNum++) {
      if(loaded.indexOf(chunkNum) === -1) {
        log(`Chunk not uploaded: ${chunkNum}`);
        this.setProgress(chunkNum, 0);
      }
    }
  }

  isSelected(): boolean {
    return !!this.file;
  }

  getState(): string {
    return this.state;
  }

  setState(state: string): string {
    this.state = state;
    return state;
  }

  setProgress(chunk: number, loaded: number) {
    this.progress = this.progress || {};
    this.totalProgress = (this.totalProgress || 0) +
      loaded - (this.progress[chunk] || 0);
    this.progress[chunk] = loaded;
    this.settings.onChunkProgress.call(
      this, chunk, loaded, this.getChunkSize(chunk));
  }

  getTotalProgress(): number {
    return this.totalProgress || 0;
  }

  isChunkLoaded(chunk: number): boolean {
    this.loadedChunks = this.loadedChunks || [];
    return this.loadedChunks.indexOf(chunk) !== -1;
  }

  addLoadedChunk(chunk: number) {
    this.loadedChunks = this.loadedChunks || [];
    this.loadedChunks.push(chunk);
    this.setProgress(chunk, this.getChunkSize(chunk));
  }

  getChunkUploading(chunk: number): boolean {
    this.uploadingChunks = this.uploadingChunks || [];
    return this.uploadingChunks.indexOf(chunk) !== -1;
  }

  setChunkUploading(chunk: number, val: boolean = true) {
    this.uploadingChunks = this.uploadingChunks || [];
    if(val) {
      this.uploadingChunks.push(chunk);
    } else {
      let idx;
      while(true) {
        idx = this.uploadingChunks.indexOf(chunk);
        if(idx === -1) {
          break;
        }
        this.uploadingChunks.splice(idx, 1);
      }
    }
  }

  _initChunks(force: boolean = false) {
    if(!this.chunks || force) {
      this.chunks = [];
      var numChunks = Math.ceil(this.file.size / this.settings.chunkSize);
      for(var i = 0; i < numChunks; i++) {
        this.chunks.push(false);
      }
    }
  }

  setChunkFinished(chunk: number, val: boolean = true) {
    this._initChunks();
    this.chunks[chunk] = !!val;
  }

  getNextChunk(chunk: ?number = null): number {
    this._initChunks();
    if(chunk && !this.chunks[chunk] && !this.getChunkUploading(chunk)) {
      return chunk;
    }
    for(let i = 0; i < this.chunks.length; i++) {
      if(!this.chunks[i] && !this.getChunkUploading(i)) {
        return i;
      }
    }
    return -1;
  }

  uploadFinished(): boolean {
    this._initChunks();
    for(let i = 0; i < this.chunks.length; i++) {
      if(!this.chunks[i] || this.getChunkUploading(i)) {
        return false;
      }
    }
    return true;
  }

  isLastChunk(chunk: number): boolean {
    return Math.ceil(this.file.size / this.settings.chunkSize) - 1 === chunk;
  }

  getChunkSize(chunk: number): number {
    if(this.isLastChunk(chunk)) {
      return this.file.size % this.settings.chunkSize;
    } else {
      return this.settings.chunkSize;
    }
  }

  onChunkProgress(f: () => void) {
    this.settings.onChunkProgress = f;
  }

  onProgress(f: () => void) {
    this.settings.onProgress = f;
  }

  onSelect(f: () => void) {
    this.settings.onSelect = f;
  }

  onError(f: () => void) {
    this.settings.onError = f;
  }

  onComplete(f: () => void) {
    this.settings.onComplete = f;
  }

  onInit(f: () => void) {
    this.settings.onInit = f;
  }

  onStart(f: () => void) {
    this.settings.onStart = f;
  }

  onChunkUploaded(f: () => void) {
    this.settings.onChunkUploaded = f;
  }
}
