import should from 'should';
import sinon from 'sinon';
import utils from '../src/utils';

describe('utils.regionString', () => {
  it('should return "s3" for US', () => {
    utils.regionString('us-east-1').should.equal('');
    utils.regionString('us-west-1').should.equal('');
    utils.regionString('us-east-2').should.equal('');
    utils.regionString('us-west-1').should.equal('');
  });
  it('should return the region name for other regions', () => {
    utils.regionString('eu-west-1').should.equal('-eu-west-1');
  });
});

describe('utils.zfill', () => {
  it('should zero-pad a number up to a given length', () => {
    let cases = [
      [1411, 0, "1411"],
      [1411, 5, "01411"],
      [0, 20, "00000000000000000000"],
    ];

    cases.map(([str, num, expected]) => {
      utils.zfill(str, num).should.equal(expected);
    });
  });
});

describe('utils.uriencode', () => {
  it('should encode correctly', () => {
    utils.uriencode(
      'http://www.google.com/?#aasdas&sdf'
    ).should.equal(
      'http%3A%2F%2Fwww.google.com%2F%3F%23aasdas%26sdf'
    );
  });
});

describe('utils.iso8601', () => {
  it('should properly encode dates', () => {
    utils.iso8601(
      new Date("2014-12-12 12:12:12")
    ).should.equal(
      '20141212T121212Z'
    );
  });
});
