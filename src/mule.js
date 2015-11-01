/* @flow */

import Uploader from './uploader';
import log from './log';

function muleUploader(settings) {
  // Verify that the browser has the needed HTML5 capabilities
  if(!(typeof File !== 'undefined' && typeof FileList !== 'undefined' &&
      typeof Blob !== 'undefined')) {
    log('HTML5 APIs not available.');
    return -1;
  }

  // For new webkit browsers, the .slice() method is named .webkitSlice()
  // similar for mozilla
  if (typeof File === 'object' && typeof File.prototype === 'object') {
    File.prototype.slice = File.prototype.webkitSlice ||
      File.prototype.mozSlice || File.prototype.slice;
  }

  if(typeof navigator !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') !== -1) {
    try {
      var justChecking = new Blob(['something']);
    } catch(e) {
      return -1;
    }
  }
  log('OK');

  return new Uploader(settings);
}

if(typeof window !== 'undefined') {
  window.muleUploader = muleUploader;
}
