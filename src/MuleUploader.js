import SpeedMonitor from './SpeedMonitor';
import FileUpload from './FileUpload';

console.debug = process.env.DEBUG && console.debug || function() {};

const BACKEND_SECURITY_MODE_SESSION = 'session';
const BACKEND_SECURITY_MODE_SIGNED_URI = 'signed-uri';

export class GCSUpload {
	constructor(options) {
		console.log(`muleUploader GCSUpload ${process.env.VERSION} ${process.env.DEBUG && 'DEBUG' || ''}`);
		this.options = Object.assign({
			authorizeSecurityMode: BACKEND_SECURITY_MODE_SESSION,
			authorizeFetchMode: 'cors',
			chunkSize: 256*1024*1024,
			parallelUploads: 1,
			parallelMinSize: 256*1024*1024,
			averageBitrateSmoothingFactor: 0.8
		}, options);
		if (!this.options.uploadAuthorizationURL)
			throw "an upload authorization URL is required";
		if (!this.options.composeAuthorizationURL)
			throw "a compose authorization URL is required";
	}
	loadFile(file) {
		if (!file.name || !file.size)
			throw "not able to load file"
		this.file = file;
		console.debug('File loaded', {
			size: this.file.size,
		});
	}
	async run() {
		if (!this.file)
			throw "file not loaded";
		if ( this.options.authorizeSecurityMode != BACKEND_SECURITY_MODE_SESSION )
			throw "backend security mode not implemented";
		try {
			let fileUpload = new FileUpload(this.file, this.options);
			await fileUpload.authorize();
			await fileUpload.run();
		} catch(error) {
			throw `not able to upload, ${error}`;
		}
	}
};



