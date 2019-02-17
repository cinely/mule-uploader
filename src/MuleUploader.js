const BACKEND_SECURITY_MODE_SESSION = 'session';
const BACKEND_SECURITY_MODE_SIGNED_URI = 'signed-uri';

console.debug = process.env.DEBUG && console.debug || function() {};

class Upload {
	constructor(options, defaultOptions) {
		console.log(`muleUploader ${process.env.VERSION} ${process.env.DEBUG && 'DEBUG' || ''}`);
		this.options = Object.assign({
			chunkSize: 50*1024*1024
			}, defaultOptions, options);
		this.fetchOptions = {
			mode: this.options.backendFetchMode || 'cors'
		}
		// console.debug(this.options, this.fetchOptions)
	}
	loadFile(file) {
		if (!file.name || !file.size)
			throw "not able to load file"
		this.file = file;
		let chunkCount = Math.ceil(this.file.size / this.options.chunkSize);
		this.chunks = [...Array(chunkCount).keys()];
		this.chunksProgress = [...Array(chunkCount).values()];
		console.debug('File loaded', {
			size: this.file.size,
			chunks: this.chunks,
		});
	}
	async run() {
		if (!this.file)
			throw "file not loaded";
	}
	async _uploadFile() {
		let nextChunk;
		while ((nextChunk = this._getNextChunk()) !== undefined) {
			await this._uploadChunk(nextChunk);
		}
	}
	async _uploadChunk(chunk) {
		let start = chunk * this.options.chunkSize;
		let end = Math.min(start + this.options.chunkSize, this.file.size);
		console.debug(`uploading chunk ${chunk}: ${start}-${end}`);
		let contentType = this.file.type != "" && this.file.type || 'application/octet-stream';
		let contentRange = `bytes ${start}-${end - 1}/${this.file.size}`;
		let contentLength = end - start;
		return this._futch(this.session.uploadURI, {
			method: 'PUT',
			body: this.file.slice(start, end),
			headers: {
				'Content-Type': contentType,
				'Content-Range': contentRange
				// 'Content-Length': contentLength not authorized and computed automatically
			}
		}, this._onChunkProgress.bind(this, chunk));
	}
	_onChunkProgress(chunk, event) {
		if ( event.loaded )
			this.chunksProgress[chunk] = event.loaded;
		this._onProgress();
	}
	_onProgress() {
		let fileProgress = 0;
		for (let chunkProgress of this.chunksProgress) {
			fileProgress += chunkProgress || 0;
		}
		console.debug('_onProgress', fileProgress, this.file.size);
		this.options.progressCallback && this.options.progressCallback(fileProgress, this.file.size);
	}
	_getNextChunk() {
		return this.chunks.shift();
	}
	async _futch(url, opts={}, onProgress) {
		return new Promise( (resolve, reject)=>{
			let xhr = new XMLHttpRequest();
			xhr.open(opts.method || 'get', url);
			for (let k in opts.headers||{})
				xhr.setRequestHeader(k, opts.headers[k]);
			xhr.onload = e => resolve(e.target.responseText);
			xhr.onerror = reject;
			if (xhr.upload && onProgress)
				xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
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
			await this._uploadFile();
		} catch(error) {
			throw `Not able to upload, ${error}`;
		}
	}
	async _getResumableSessionURI() {
		let parameters = new URLSearchParams();
		parameters.append("fileName", this.file.name)
		parameters.append("fileSize", this.file.size)

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