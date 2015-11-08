/* @flow */

type TSettings = {
  headers: { [key: string]: string };
  method: string;
  url: string;
  extraParams?: { [key: string]: string };
};

type TXML = {
  getElementsByTagName: (tag: string) => [TXML];
  textContent: string;
};

export type TEvent = {
  target: {
    status: number;
    responseXML: ?TXML;
    responseText: ?string;
  };
};


export function XHR(args: TSettings): XMLHttpRequest {
  // The user may or may not pass any headers
  args.headers = args.headers || {};

  // If no method is given, default to GET
  args.method = args.method || 'GET';

  var xhr = new XMLHttpRequest();

  // Set the "load" callback if given
  if(args.loadCallback && typeof args.loadCallback === 'function') {
    xhr.addEventListener('load', args.loadCallback, true);
  }

  // Set the "error" callback if given
  if(args.errorCallback && typeof args.errorCallback === 'function') {
    xhr.addEventListener('error', args.errorCallback, true);
  }

  // Set the "readystatechange" callback if given
  if(args.stateChangeCallback &&
      typeof args.stateChangeCallback === 'function') {
    xhr.addEventListener('readystatechange', args.stateChangeCallback);
  }

  // Set the "progress" callback if given
  if(args.progressCallback && typeof args.progressCallback === 'function') {
    xhr.upload.addEventListener('progress', args.progressCallback);
  }

  // Set the "timeout" callback if given
  if(args.timeoutCallback && typeof args.timeoutCallback === 'function') {
    xhr.addEventListener('timeout', args.timeoutCallback);
  }

  // Adding extra params as needed
  var url = args.url;
  if(typeof args.extraParams === 'object') {
    for(var paramName in args.extraParams) {
      if(args.extraParams.hasOwnProperty(paramName)) {
        if(url.indexOf('?') !== -1) {
          url += '&';
        } else {
          url += '?';
        }

        url += encodeURIComponent(paramName) + '=';
        // keep the typechecker happy
        if(typeof args.extraParams === 'object') {
          url += encodeURIComponent(args.extraParams[paramName]);
        }
      }
    }
  }

  // Open the xhr connection
  xhr.open(args.method, url);

  // Set the headers
  for(var header in args.headers) {
    if(args.headers.hasOwnProperty(header)) {
      xhr.setRequestHeader(header, args.headers[header]);
    }
  }

  // Send the ajax call
  if(args.body) {
    xhr.send(args.body);
  } else {
    xhr.send();
  }
  return xhr;
}
