/* @flow */

import { XHR, TEvent } from './xhr';
import utils from './utils';
import SHA256 from 'crypto-js/sha256';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Hex from 'crypto-js/enc-hex';

export type TAuth = {
  bucket: string;
  region: string;
  date: Date;
  accessKey: string;
  signature: string;
};

type TQuerystring = { [key: string]: string };

type THeaders = { [key: string]: string };

type TPayload = string | Blob;

type TSettings = {
  auth: TAuth;
  headers: THeaders;
  querystring: TQuerystring;
  key: ?string;
  method: string;
  payload: TPayload;
  loadCallback: (event: TEvent) => void;
  progressCallback: () => void;
  stateChangeCallback: () => void;
  errorCallback: () => void;
  timeoutCallback: () => void;
};

type SendCallback = (() => void);

export class AmazonXHR {
  settings: TSettings;
  requestDate: Date;
  headers: Object;
  xhr: ?XHR;

  constructor(settings: TSettings) {
    this.settings = settings;
  };

  send(callback: ?SendCallback): AmazonXHR {
    this.requestDate = new Date();

    this.headers = this.settings.headers;

    const bucket = this.settings.auth.bucket;
    const regionString = utils.regionString(this.settings.auth.region);
    this.headers.host = `${bucket}.s3${regionString}.amazonaws.com`;

    const date = this.settings.auth.date;
    var dateString = [
      date.getUTCFullYear(),
      utils.zfill(date.getUTCMonth() + 1, 2),
      utils.zfill(date.getUTCDate(), 2),
    ].join('');

    const encodedDate = utils.uriencode(utils.iso8601(this.requestDate));
    let querystring = {};
    for(var key in this.settings.querystring ) {
      querystring[key] = this.settings.querystring[key];
    }
    querystring['X-Amz-Date'] = encodedDate;
    querystring['X-Amz-Algorithm'] = 'AWS4-HMAC-SHA256';
    querystring['X-Amz-Expires'] = '86400'; // One day

    const accessKey = this.settings.auth.accessKey;
    const region = this.settings.auth.region;
    querystring['X-Amz-Credential'] = utils.uriencode(
      `${accessKey}/${dateString}/${region}/s3/aws4_request`
    );
    querystring['X-Amz-SignedHeaders'] = '';

    let headerKeys = Object.keys(this.headers);

    headerKeys.sort();
    querystring['X-Amz-SignedHeaders'] = utils.uriencode(
      headerKeys.join(';')
    );

    querystring['X-Amz-Signature'] = this.getAuthorizationHeader(
      querystring
    );

    var url = `${location.protocol}//${this.headers.host}/${this.settings.key}`;
    delete this.headers.host;  // keep this header only for hashing

    var first = true;
    Object.keys(querystring).map(key => {
      const value = querystring[key];
      if(first) {
        url += '?';
      }
      first = false;
      url += `${key}=${value}&`;
    });
    url = url.slice(0, -1);  // remove extra ampersand

    this.xhr = XHR({
      url: url,
      method: this.settings.method,
      headers: this.headers,
      body: this.settings.payload,

      loadCallback: this.settings.loadCallback,
      progressCallback: this.settings.progressCallback,
      stateChangeCallback: this.settings.stateChangeCallback,
      errorCallback: this.settings.errorCallback,
      timeoutCallback: this.settings.timeoutCallback,
    });
    if(callback) {
      callback(this.xhr);
    }

    return this;
  }

  getAuthorizationHeader(querystring: TQuerystring): string {
    let header = '';

    const headerKeys = Object.keys(this.headers).sort();

    const signedKeys = headerKeys.reduce((acc, val) => {
      return acc + ';' + val;
    });

    let canonicalRequest = this.getCanonicalRequest(querystring);
    let stringToSign = this.getStringToSign(canonicalRequest, this.requestDate);
    let signature = this.signRequest(stringToSign);

    return signature;
  }

  getCanonicalRequest(querystring: TQuerystring): string {
    let request = `
      ${this.settings.method.toUpperCase()}
      /${utils.uriencode(this.settings.key).replace(/%2F/g, '/')}
    `;
    request = request.trim().replace(/^\s+/gm, '') + '\n';

    // querystring
    request += Object.keys(
      querystring
    ).sort().reduce((acc, key) => {
      const value = querystring[key];
      if(acc) {
        return `${acc}&amp;${utils.uriencode(key)}=${value}`;
      } else {
        return `${utils.uriencode(key)}=${value}`;
      }
    }, '');
    request += '\n';

    // headers
    const headerKeys = Object.keys(this.headers).sort();
    request += headerKeys.reduce((acc, key) => {
      const value = this.headers[key];
      if(acc) {
        return `${acc}\n${key.toLowerCase()}:${value.trim()}`;
      } else {
        return `${key.toLowerCase()}:${value.trim()}`;
      }
    }, '');
    request += '\n\n';

    // signed headers
    request += headerKeys.reduce((acc, val) => {
      if(acc) {
        return `${acc};${val.toLowerCase()}`;
      } else {
        return val.toLowerCase();
      }
    }, '');

    request += '\n';

    request += 'UNSIGNED-PAYLOAD';

    return request;
  }

  getStringToSign(canonicalRequest: string, time: Date): string {
    return `
      AWS4-HMAC-SHA256
      ${utils.iso8601(time)}
      ${
        [
          time.getUTCFullYear(),
          utils.zfill(time.getUTCMonth() + 1, 2),
          utils.zfill(time.getUTCDate(), 2),
          '/' + this.settings.auth.region + '/s3/aws4_request\n',
        ].join('')
      }
      ${SHA256(canonicalRequest.replace(/&amp;/g, '&')).toString()}
    `.trim().replace(/^\s+/gm, '');
  }

  signRequest(stringToSign: string): string {
    var res = HmacSHA256(
      stringToSign,
      Hex.parse(this.settings.auth.signature)
    ).toString();
    return res;
  }

  // static
  static init(auth, key, file, callback): XHR {
    return new AmazonXHR({
      auth: auth,
      key: key,
      method: 'POST',
      querystring: {
        uploads: '',
      },
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Disposition': `attachment; filename=${file.name}`,
        'Content-Type': auth.contentType || 'application/octet-stream',
      },
      payload: '',
      loadCallback: callback,
      errorCallback: () => {},
      progressCallback: () => {},
      stateChangeCallback: () => {},
      timeoutCallback: () => {},
    }).send();
  }

  static uploadChunk(auth, key, uploadId, chunkNum,
                     chunk, callbacks, xhrCallback) {
    let callback, errorCallback, progressCallback, readystateCallback;
    if(callbacks instanceof Object) {
      callback = callbacks.loadCallback;
      errorCallback = callbacks.errorCallback;
      progressCallback = callbacks.progressCallback;
      readystateCallback = callbacks.stateChangeCallback;
    } else {
      callback = callbacks;
      errorCallback = () => {};
      progressCallback = () => {};
      readystateCallback = () => {};
    }
    var querystring = {
      partNumber: chunkNum + 1,
      uploadId,
    };
    return (new AmazonXHR({
      auth: auth,
      key: key,
      method: 'PUT',
      querystring: querystring,
      headers: {},
      payload: chunk,
      loadCallback: callback,
      errorCallback: errorCallback,
      progressCallback: progressCallback,
      stateChangeCallback: readystateCallback,
      timeoutCallback: () => {},
    })).send(xhrCallback);
  }

  static list(auth, file: File, key: string, uploadId, chunkSize, callback,
              errorCallback: () => void, marker) {
    var querystring: { [key: string]: string } = {
      uploadId,
    };
    if(marker) {
      querystring['part-number​-marker'] = marker;
    }
    return new AmazonXHR({
      auth,
      key,
      method: 'GET',
      querystring,
      headers: {},
      payload: '',
      errorCallback,
      progressCallback: () => {},
      stateChangeCallback: () => {},
      timeoutCallback: () => {},
      loadCallback: function(e: TEvent) {
        if(e.target.status === 404) {
          // I.e. the file was already uploaded; start fresh
          if(errorCallback) {
            errorCallback();
          }
          return;
        }

        // Process the parts, and return an array of
        // [part_number, etag, size] through the given callback
        var xml = e.target.responseXML;
        var parts = [];
        if(!xml) {
          return;
        }
        var xmlParts = xml.getElementsByTagName('Part');
        var numChunks = Math.ceil(file.size / chunkSize);
        let tagContent = function(tag, prop): string {
          return tag.getElementsByTagName(prop)[0].textContent;
        };
        for(let i = 0; i < xmlParts.length; i++) {
          var partNumber = parseInt(
            tagContent(xmlParts[i], 'PartNumber'), 10
          );
          var etag = tagContent(xmlParts[i], 'ETag');
          var size = parseInt(
            tagContent(xmlParts[i], 'Size'), 10
          );

          if(partNumber !== numChunks && size !== chunkSize) {
            continue; // Chunk corrupted
          } else if(partNumber === numChunks &&
              size !== file.size % chunkSize) {
            continue; // Final chunk corrupted
          }

          parts.push([
            partNumber,
            etag,
            size,
          ]);
        }
        var isTruncated = tagContent(xml, 'IsTruncated');
        if(isTruncated.toString() === 'true') {
          var partMarker = tagContent(xml, 'NextPartNumberMarker');
          AmazonXHR.list(
            auth,
            file,
            key,
            uploadId,
            chunkSize,
            function(newParts) {
              callback(parts.concat(newParts));
            },
            errorCallback,
            partMarker
          );
        } else {
          callback(parts);
        }
      },
    }).send();
  }

  static finish(auth, key, uploadId, parts, callback) {
    var querystring = { uploadId };

    // compose the CompleteMultipartUpload request for putting
    // the chunks together
    var dataString: string = '<CompleteMultipartUpload>';

    parts.map(([number, etag]) => {
      dataString += `
        <Part>
        <PartNumber>${number}</PartNumber>
        <ETag>${etag}</ETag>
        </Part>
      `.trim();
    });
    dataString += '</CompleteMultipartUpload>';

    var data: string | Blob = dataString;
    // firefox requires a small hack
    if(typeof window !== 'undefined' &&
        window.navigator &&
        navigator.userAgent.indexOf('Firefox') !== -1) {
      data = new Blob([data]);
    }

    return new AmazonXHR({
      auth,
      key,
      method: 'POST',
      querystring,
      headers: {},
      payload: data,
      loadCallback: callback,
      errorCallback: () => {},
      progressCallback: () => {},
      stateChangeCallback: () => {},
      timeoutCallback: () => {},
    }).send();
  }
}
