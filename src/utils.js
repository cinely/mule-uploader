/* @flow */

declare function escape(source: string): string;

export default class Utils {
  static regionString(region) {
    // Given an AWS region, it either returns an empty string for
    // US-based regions or the region name preceded by a dash for non-US-based
    // regions.
    // See this for more details:
    // http://docs.aws.amazon.com/AmazonS3/latest/dev/VirtualHosting.html
    if(region && region.slice(0, 2) !== 'us') {
      return '-' + region;
    }
    return '';
  }
  static zfill(str, num) {
    let zeros = '';
    for(var i = 0; i < num; i++) {
      zeros += '0';
    }

    return (zeros + str).substr(-Math.max(num, str.toString().length));
  }
  static uriencode(string) {
    var output = encodeURIComponent(string);
    output = output.replace(/[^A-Za-z0-9_.~\-%]+/g, escape);
    output = output.replace(/;/g, '%3B');

    // AWS percent-encodes some extra non-standard characters in a URI
    output = output.replace(/[*]/g, function(ch) {
      return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
    });

    return output;
  }
  static iso8601(date) {
    return [
      date.getUTCFullYear(),
      Utils.zfill(date.getUTCMonth() + 1, 2),
      Utils.zfill(date.getUTCDate(), 2),
      'T',
      Utils.zfill(date.getUTCHours(), 2),
      Utils.zfill(date.getUTCMinutes(), 2),
      Utils.zfill(date.getUTCSeconds(), 2),
      'Z',
    ].join('');

  }
}
