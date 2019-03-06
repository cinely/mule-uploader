console.debug = process.env.DEBUG && console.debug || function() {};

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class {
	constructor(chunk, options) {
		this.chunk = chunk;
		this.options = Object.assign({
			onErrorRetryCount: 0
		}, options);
		if (!this.chunk.payload)
			throw "chunk must have a payload attribute";
		if (!this.chunk.contentType)
			throw "chunk must have a contentType attribute";
		if (!this.chunk.contentRange)
			throw "chunk must have a contentType attribute";
		if (!this.chunk.expectedReturnCode)
			throw "chunk must have a expectedReturnCode attribute";
		if (this.chunk.rangeStart === undefined)
			throw "chunk must have a rangeStart attribute";
		if (this.chunk.rangeEnd === undefined)
			throw "chunk must have a rangeEnd attribute";
		this.xhr = null;
		this.aborted = false;
	}
	async run() {
		let errors = [];
		for (let i = 0; !this.aborted && i <= this.options.onErrorRetryCount; i++) {
			try {
				let response = await this._futch(this.options.uploadURI, {
					method: 'PUT',
					body: this.chunk.payload,
					onProgressCallback: this.options.onProgressCallback,
					headers: {
						'Content-Type':		this.chunk.contentType,
						'Content-Range':	this.chunk.contentRange
					}
				});
				console.debug('got response', response);
				if (response.status != this.chunk.expectedReturnCode)
					throw `error while pushing chunk: ${response.status} ${response.statusText}`;
				return response;
			}
			catch(error) {
				errors.push(error);
			}
			console.debug('truncated exponential backoff');
			await sleep(Math.pow(2, i) * 1000 + Math.random() * 1000);
		}
		throw errors;
	}
	_futch(url, options={}) { // fetch with progress callback
		return new Promise( (resolve, reject) => {
			this.xhr = new XMLHttpRequest();
			this.xhr.open(options.method || 'get', url);
			for (let k in options.headers||{})
				this.xhr.setRequestHeader(k, options.headers[k]);
			this.xhr.onload = e => resolve(e.target);
			this.xhr.onerror = reject;
			if (this.xhr.upload && options.onProgressCallback)
				this.xhr.upload.onprogress = options.onProgressCallback; // event.loaded / event.total * 100 ; //event.lengthComputable
			this.xhr.send(options.body);
		});
	}
	abort() {
		console.debug("aborting chunkUpload");
		this.aborted = true;
		if (this.xhr && this.xhr.abort)
			this.xhr.abort();
	}
}