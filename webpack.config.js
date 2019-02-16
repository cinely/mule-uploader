const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
	return {
		entry: './src/MuleUploader.js',
		output: {
			filename: 'MuleUploader.js',
			path: path.resolve(__dirname, 'dist'),
			library: 'muleUploader',
			libraryTarget: 'umd'
			// libraryExport: 'default'
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				VERSION: require("./package.json").version,
				DEBUG: argv.mode === 'development'
			})
		],
		devServer: {
			publicPath: '/dist/'
		}		
	}
};