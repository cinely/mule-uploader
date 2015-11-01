/* @flow */

import { DEBUG } from './constants';

export default function() {
  if(!(DEBUG && typeof console !== 'undefined' &&
      typeof console.log !== 'undefined')) {
    return;
  }

  var args = ['[MuleUploader]'];
  for(let i = 0; i < arguments.length; i++) {
    args.push(arguments[i]);
  }
  return console.log.apply(console, args);
}
