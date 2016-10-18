var settings = {
  aws_access_key: '[your-access-key]',
  aws_secret: '[your-secret]',
  region: '[aws-region-id]',
  bucket: '[s3-bucket-id]',

  mime_type: 'application/octet-stream',
  chunk_size: 6 * 1024 * 1024, //warning: if this changes the DB needs to be flushed

  dbFileName: './uploads.db',
  serverPort: 3000
};
module.exports = settings;