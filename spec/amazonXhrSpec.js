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
    mockery.registerMock('./xhr', XHRMock);
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
      }).send();
      XHRMock.called.should.be.true;
    });
  });

  it('should send a finish request', () => {
    AmazonXHR.finish(
      dummyAuth, '1234', '9876', [[1, 'f12f']], sinon.spy()
    ).should.be.instanceOf(AmazonXHR);
  });
});
