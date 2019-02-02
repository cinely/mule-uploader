const path = require('path');

module.exports = {
  entry: './src/mule-uploader.js',
  output: {
    filename: 'mule-uploader.js',
    path: path.resolve(__dirname, 'dist')
  }
};