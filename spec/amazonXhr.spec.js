/*jshint expr: true*/

import should from 'should';
import sinon from 'sinon';
import { XMLHttpRequest, location } from './stubs';
import mockery from 'mockery';
import path from 'path';

let globalObject = global || window;
let AmazonXHR, XHRMock = sinon.spy();

describe('AmazonXHR', () => {
  const dummyAuth = { date: new Date(), signature: '123' };

  beforeEach(() => {
    globalObject.XMLHttpRequest = XMLHttpRequest;
    globalObject.location = location;
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
    });
    mockery.registerMock('./xhr', {
      XHR: XHRMock,
    });
    AmazonXHR = require('../src/amazonXhr').AmazonXHR;
  });

  afterEach(() => {
    mockery.disable();
    XHRMock.reset();
  });

  it('should instantiate a new object', () => {
    let xhr = new AmazonXHR({ auth: dummyAuth });

    xhr.should.be.ok;
  });

  const verbs = [
    'GET', 'POST', 'PUT', 'DELETE', 'PATCH',
    'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'
  ];
  verbs.map(verb => {
    it(`should send a ${verb} request`, () => {
      let amazonXhr = new AmazonXHR({
        method: verb,
        auth: dummyAuth,
        headers: {},
        querystring: {},
        key: '123123',
      }).send();
      XHRMock.called.should.be.true;
    });
  });

  it('should send a finish request', () => {
    AmazonXHR.finish(
      dummyAuth, '1234', '9876', [[1, 'f12f']], sinon.spy()
    ).should.be.instanceOf(AmazonXHR);
  });

  it('should correctly compute the canonical request', () => {
    const method = "GET";
    const key = '124124';
    const headers = {
      'key1': 'value1',
      'key2': 'value2',
    };
    const querystring = {
      'other_key1': 'other_value1',
      'other_key2': 'other_value2',
    };
    let amazonXhr = new AmazonXHR({
      method,
      auth: dummyAuth,
      headers,
      querystring,
      key,
    });

    const canonicalRequest = amazonXhr.getCanonicalRequest({
      method,
      key,
      querystring,
      headers,
    });

    canonicalRequest.should.be.eql(`
      GET
      /${key}
      other_key1=other_value1&amp;other_key2=other_value2
      key1:value1
      key2:value2

      key1;key2
      UNSIGNED-PAYLOAD
    `.replace(/\n +/gm, '\n').slice(1, -1));
  });

  it('should correctly compute the string to sign', () => {
    const method = 'GET';
    const key = '124124';
    const headers = {
      'key1': 'value1',
      'key2': 'value2',
    };
    const querystring = {
      'other_key1': 'other_value1',
      'other_key2': 'other_value2',
    };
    const region = 'eu-west-1';
    const signature = 'blablablabla';
    const canonicalRequest = `
      ${method}
      /${key}
      other_key1=other_value1&amp;other_key2=other_value2
      key1:value1
      key2:value2

      key1;key2
      UNSIGNED-PAYLOAD
    `.replace(/\n +/gm, '\n').slice(1, -1);
    const requestDate = new Date('2015-05-13');

    let amazonXhr = new AmazonXHR({
      method,
      auth: dummyAuth,
      headers,
      querystring,
      key,
    });
    const stringToSign = amazonXhr.getStringToSign({
      canonicalRequest,
      requestDate,
      region,
      signature
    });

    stringToSign.should.be.eql(`
      AWS4-HMAC-SHA256
      20150513T000000Z
      20150513/eu-west-1/s3/aws4_request
      7022ed7c0a76a9598308a5c7f0707cd41c4f581a5403018c57c248718be8fb03
    `.replace(/\n +/gm, '\n').slice(1, -1));
  });

  it('should correctly sign request', () => {
    let amazonXhr = new AmazonXHR({
      method: 'GET',
      auth: dummyAuth,
      headers: {},
      querystring: {},
      key: '213123',
    });

    const stringToSign = `
      AWS4-HMAC-SHA256
      20150513T000000Z
      20150513/eu-west-1/s3/aws4_request
      7022ed7c0a76a9598308a5c7f0707cd41c4f581a5403018c57c248718be8fb03
    `.replace(/\n +/gm, '\n').slice(1, -1);

    amazonXhr.signRequest({
      stringToSign,
      signature: 'blablabla',
    }).should.be.eql('953eeab90c441a5f4cddd0899881f2c768697b4ecb283c6f45fa45eeef78e169');
  });
});
