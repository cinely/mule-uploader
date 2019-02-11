const path = require('path');

module.exports = {
  entry: './src/MuleUploader.js',
  output: {
    filename: 'MuleUploader.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'muleUploader',
    libraryTarget: 'umd'
    // libraryExport: 'default'
  }
};