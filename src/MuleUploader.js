class Upload {
	constructor(options, defaultOptions) {
		this.options = Object.assign({}, defaultOptions, options);
		this.fetchOptions = {
			mode: this.options.backendFetchMode || 'same-origin'
		}
		// console.debug(this.options, this.fetchOptions)
	}
	setFile(file) {
		this.fileName = 'test.mule'
	}
	upload() {

	}
}

const BACKEND_SECURITY_MODE_SESSION = 'session'
const BACKEND_SECURITY_MODE_SIGNED_URI = 'signed-uri'

export class GCSUpload extends Upload {
	constructor(options) {
		super(options, {
			backendURL: "http://localhost:8081/signature",
			backendSecurityMode: BACKEND_SECURITY_MODE_SESSION
			});
	}
	async upload() {
		if ( this.options.backendSecurityMode != BACKEND_SECURITY_MODE_SESSION )
			throw "backend security mode not implemented";
		try {
			await this._getResumableSessionURI();
		} catch(error) {
			throw `Not able to upload, ${error}`;
		}
	}
	async _getResumableSessionURI() {
		var parameters = new URLSearchParams();
		parameters.append("fileName", this.fileName)

		var request = new Request(this.options.backendURL + '?' + parameters.toString(), {
			method: 'GET',
			cache: 'no-store'
		});

		let response = await fetch(request, this.fetchOptions);
		console.debug('response', response);
		if (response.status < 200 || response.status > 299)
			throw `error while getting signed API call: ${response.statusText}`;
	}
};