const BACKEND_SECURITY_MODE_SESSION = 'session';
const BACKEND_SECURITY_MODE_SIGNED_URI = 'signed-uri';

const GOOGLE_CLOUD_STORAGE_COMPOSE_MAX_OBJECTS = 32;

console.debug = process.env.DEBUG && console.debug || function() {};

const futch = (url, options={}) => { // fetch with progress callback
	return new Promise( (resolve, reject)=>{
		let xhr = new XMLHttpRequest();
		xhr.open(options.method || 'get', url);
		for (let k in options.headers||{})
			xhr.setRequestHeader(k, options.headers[k]);
		xhr.onload = e => resolve(e.target);
		xhr.onerror = reject;
		if (xhr.upload && options.onProgressCallback)
			xhr.upload.onprogress = options.onProgressCallback; // event.loaded / event.total * 100 ; //event.lengthComputable
		xhr.send(options.body);
	});
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export class GCSUpload {
	constructor(options) {
		console.log(`muleUploader GCSUpload ${process.env.VERSION} ${process.env.DEBUG && 'DEBUG' || ''}`);
		this.options = Object.assign({
			backendSecurityMode: BACKEND_SECURITY_MODE_SESSION,
			chunkSize: 5*1024*1024,
			parallelUploads: 1,
			parallelMinSize: 50*1024*1024,
		}, options);
		if (!this.options.backendURL)
			throw "a backend URL is required";
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
		if ( this.options.backendSecurityMode != BACKEND_SECURITY_MODE_SESSION )
			throw "backend security mode not implemented";
		try {
			let fileUpload = new FileUpload(this.file, this.options);
			await fileUpload.run();
		} catch(error) {
			throw `not able to upload, ${error}`;
		}
	}
};

class ChunkUpload {
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
	}
	async run() {
		let errors = [];
		for (let i = 0; i <= this.options.onErrorRetryCount; i++) {
			try {
				let response = await futch(this.options.uploadURI, {
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
			console.debug('Truncated Exponential Backoff');
			await sleep(Math.pow(2, i) * 1000 + Math.random() * 1000);
		}
		throw errors;
	}
}

class StorageObjectUpload {
	constructor(storageObject, options) {
		this.storageObject = storageObject;
		this.options = Object.assign({
			chunkSize: 5*1024*1024
		}, options);
		if (!this.storageObject.fileName)
			throw "storageObject must have a fileName attribute";
		if (!this.storageObject.payload)
			throw "storageObject must have a payload attribute";
		this.fetchOptions = {
			mode: this.options.backendFetchMode || 'cors'
		};
		console.debug('StorageObject chunk size is', this.options.chunkSize);

		this.chunksCount	= Math.ceil(this.storageObject.payload.size / this.options.chunkSize);
		this.chunks			= [...Array(this.chunksCount).keys()];
		this.chunksProgress	= [...Array(this.chunksCount).values()];

	}
	_getNextChunk() {
		let chunkID = this.chunks.shift();
		if (chunkID === undefined)
			return undefined;

		let rangeStart		= chunkID * this.options.chunkSize;
		let rangeEnd		= Math.min(rangeStart + this.options.chunkSize, this.storageObject.payload.size);
		let contentRange	= `bytes ${rangeStart}-${rangeEnd - 1}/${this.storageObject.payload.size}`;
		return {
			ID:					chunkID,
			payload: 			this.storageObject.payload.slice(rangeStart, rangeEnd),
			contentType:		'application/octet-stream',
			contentRange:		contentRange,
			rangeStart:			rangeStart,
			rangeEnd:			rangeEnd,
			expectedReturnCode:	chunkID + 1 == this.chunksCount && 200 || 308
		};
	}
	_onChunkProgress(chunkID, event) {
		if ( event.loaded )
			this.chunksProgress[chunkID] = event.loaded;
		this._onStorageObjectProgress();
	}
	_onStorageObjectProgress() {
		let storageObjectProgress = 0;
		for (let chunkProgress of this.chunksProgress) {
			storageObjectProgress += chunkProgress || 0;
		}
		console.debug('_onStorageObjectProgress', storageObjectProgress, this.storageObject.payload.size);
		this.options.onProgressCallback && this.options.onProgressCallback(storageObjectProgress, this.storageObject.payload.size);
	}
	async run() {
		this.session = await this._getAuthorization();
		console.debug('StorageObject session received', this.session);

		try {
			let nextChunk;
			while ((nextChunk = this._getNextChunk()) !== undefined) {
				console.debug('nextChunk', nextChunk);
				let chunkUpload = new ChunkUpload(nextChunk, {
					uploadURI: this.session.uploadURI,
					onErrorRetryCount: 2,
					onProgressCallback: this._onChunkProgress.bind(this, nextChunk.ID)
				});
				await chunkUpload.run();
			}
		} catch(error) {
			throw `not able to upload chunk, ${error}`;
		}
	}
	async _getAuthorization() {
		console.debug('getting authorization for', this.storageObject);
		let parameters = new URLSearchParams();
		parameters.append("fileName", this.storageObject.fileName);
		parameters.append("fileSize", this.storageObject.payload.size);

		let request = new Request(this.options.backendURL + '?' + parameters.toString(), {
			method: 'GET',
			cache: 'no-store'
		});

		let response = await fetch(request, this.fetchOptions);
		if (response.status < 200 || response.status > 299)
			throw `error while getting signed API call: ${response.statusText}`;
		return response.json();
	}
}

class FileUpload {
	constructor(file, options) {
		this.file = file;
		this.options = Object.assign({
			parallelUploads: 1
		}, options);
		console.debug('File upload settings', options);

		this.storageObjectsCount = Math.max(1, Math.min(
			GOOGLE_CLOUD_STORAGE_COMPOSE_MAX_OBJECTS,
			Math.floor(this.file.size / this.options.parallelMinSize)
		));
		let objectSize = Math.ceil(this.file.size / this.storageObjectsCount);
		this.storageObjects = [];
		this.storageObjectsProgress	= [...Array(this.storageObjectsCount).values()];
		for (let i = 0; i < this.storageObjectsCount; i++) {
			this.storageObjects.push({
				ID: i,
				fileName: `${this.file.name}.${i}`,
				payload: this.file.slice(i * objectSize, Math.min(objectSize * (i + 1), this.file.size))
			});
		}
		console.debug('Storage objects computation', {
			objectsCount: this.storageObjectsCount,
			objectSize: objectSize,
			objects: this.storageObjects
		});
	}
	_getNextStorageObject() {
		return this.storageObjects.shift();
	}
	_onStorageObjectProgress(objectID, progress, size) {
		this.storageObjectsProgress[objectID] = progress;
		this._onFileProgress();
	}
	_onFileProgress() {
		let fileProgress = 0;
		for (let storageObjectProgress of this.storageObjectsProgress) {
			fileProgress += storageObjectProgress || 0;
		}
		console.debug('_onfileProgress', fileProgress, this.file.size);
		this.options.onProgressCallback && this.options.onProgressCallback(fileProgress, this.file.size);		
	}
	async run() {
		var runners = [];
		for (let i = 0; i < Math.min(this.options.parallelUploads, this.storageObjectsCount); i++) {
			console.debug('Launching runner', i);
			runners.push(this._runner());
		}
		await Promise.all(runners);
		console.info('all running uploads successfully finished');
		return await this._composeStorageObjects();
	}
	async _runner() {
		let nextStorageObject;
		while ((nextStorageObject = this._getNextStorageObject()) !== undefined) {
			let storageObjectUpload = new StorageObjectUpload(
				nextStorageObject,
				Object.assign({}, this.options, {onProgressCallback: this._onStorageObjectProgress.bind(this, nextStorageObject.ID)})
				);
			await storageObjectUpload.run();
		}
		console.debug('Finishing runner');
	}
	async _composeStorageObjects() {
		console.debug('composing objects');
		// let parameters = new URLSearchParams();
		// parameters.append("fileName", this.storageObject.fileName);
		// parameters.append("fileSize", this.storageObject.payload.size);

		// let request = new Request(this.options.backendURL + '?' + parameters.toString(), {
		// 	method: 'GET',
		// 	cache: 'no-store'
		// });

		// let response = await fetch(request, this.fetchOptions);
		// if (response.status < 200 || response.status > 299)
		// 	throw `error while getting signed API call: ${response.statusText}`;
		// return response.json();

		return;
	}
}