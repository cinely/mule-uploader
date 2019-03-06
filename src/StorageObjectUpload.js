import SpeedMonitor from './SpeedMonitor';
import ChunkUpload from './ChunkUpload';

console.debug = process.env.DEBUG && console.debug || function() {};

export default class {
	constructor(storageObject, options) {
		this.storageObject = storageObject;
		this.options = Object.assign({
			chunkSize: 5*1024*1024
		}, options);
		if (!this.storageObject.fileName)
			throw "storageObject must have a fileName attribute";
		if (!this.storageObject.payload)
			throw "storageObject must have a payload attribute";
		if (!this.storageObject.uploadURI)
			throw "storageObject must have an uploadURI attribute";
		console.debug('StorageObject chunk size is', this.options.chunkSize);

		this.chunksCount	= Math.ceil(this.storageObject.payload.size / this.options.chunkSize);
		this.chunks			= [...Array(this.chunksCount).keys()];
		this.chunksProgress	= [...Array(this.chunksCount).values()];
		this.speedMonitor = new SpeedMonitor();
		this.chunkUpload = null;
		this.aborted = false;
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
		this.speedMonitor.update(storageObjectProgress);
		console.debug('_onStorageObjectProgress', storageObjectProgress, this.storageObject.payload.size);
		this.options.onProgressCallback && this.options.onProgressCallback(storageObjectProgress, this.storageObject.payload.size);
	}
	async run() {
		try {
			let nextChunk;
			this.speedMonitor.start();
			while (!this.aborted && (nextChunk = this._getNextChunk()) !== undefined) {
				console.debug('nextChunk', nextChunk);
				this.chunkUpload = new ChunkUpload(nextChunk, {
					uploadURI: this.storageObject.uploadURI,
					onErrorRetryCount: 2,
					onProgressCallback: this._onChunkProgress.bind(this, nextChunk.ID)
				});
				await this.chunkUpload.run();
			}
		} catch(error) {
			throw `not able to upload chunk, ${error}`;
		}
	}
	abort() {
		console.debug("aborting storageObjectUpload");
		this.aborted = true;
		if (this.chunkUpload && this.chunkUpload.abort)
			this.chunkUpload.abort();
	}
}