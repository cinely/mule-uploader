const BACKEND_SECURITY_MODE_SESSION = 'session'
const BACKEND_SECURITY_MODE_SIGNED_URI = 'signed-uri'

class Upload {
	constructor(options, defaultOptions) {
		this.options = Object.assign({}, defaultOptions, options);
		this.fetchOptions = {
			mode: this.options.backendFetchMode || 'same-origin'
		}
		// console.debug(this.options, this.fetchOptions)
	}
	loadFile(file) {
		if (!file.name || !file.size)
			throw "not able to load file"
		this.file = file;
		console.debug('file loaded', file);
	}
	async run() {
		if (!this.file)
			throw "file not loaded";
	}
	async _futch(url, opts={}, onProgress) {
		return new Promise( (resolve, reject)=>{
			let xhr = new XMLHttpRequest();
			xhr.open(opts.method || 'get', url);
			for (let k in opts.headers||{})
				xhr.setRequestHeader(k, opts.headers[k]);
			xhr.onload = e => resolve(e.target.responseText);
			xhr.onerror = reject;
			if (xhr.upload && this.options.progressCallback)
				xhr.upload.onprogress = this.options.progressCallback; // event.loaded / event.total * 100 ; //event.lengthComputable
			xhr.send(opts.body);
		});
	}
}

export class GCSUpload extends Upload {
	constructor(options) {
		super(options, {
			backendURL: "http://localhost:8081/signature",
			backendSecurityMode: BACKEND_SECURITY_MODE_SESSION
			});
	}
	async run() {
		super.run();
		if ( this.options.backendSecurityMode != BACKEND_SECURITY_MODE_SESSION )
			throw "backend security mode not implemented";
		try {
			this.session = await this._getResumableSessionURI();
			console.log('session received', this.session);
			await this._uploadTest();
		} catch(error) {
			throw `Not able to upload, ${error}`;
		}
	}
	async _uploadTest() {
		return this._futch(this.session.uploadURI, {
			method: 'PUT',
			body: this.file,
			headers: {'Content-Length': this.file.size}
		});
	}
	async _getResumableSessionURI() {
		let parameters = new URLSearchParams();
		parameters.append("fileName", this.file.name)

		let request = new Request(this.options.backendURL + '?' + parameters.toString(), {
			method: 'GET',
			cache: 'no-store'
		});

		let response = await fetch(request, this.fetchOptions);
		if (response.status < 200 || response.status > 299)
			throw `error while getting signed API call: ${response.statusText}`;
		return response.json();
	}
};