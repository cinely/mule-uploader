import SpeedMonitor from './SpeedMonitor';
import StorageObjectUpload from './StorageObjectUpload';

console.debug = process.env.DEBUG && console.debug || function() {};

const GOOGLE_CLOUD_STORAGE_COMPOSE_MAX_OBJECTS = 32;

class FileUploadRunner {
	constructor(fileStorageObjectsProgress, getNextStorageObject, onProgressCallback) {
		this.fileStorageObjectsProgress = fileStorageObjectsProgress;
		this.storageObjectsProgress = [...Array(this.fileStorageObjectsProgress.length).values()];

		this.getNextStorageObject = getNextStorageObject;
		this.onProgressCallback = onProgressCallback;

		this.speedMonitor = new SpeedMonitor();
		this.aborted = false;
		this.storageObjectUpload = null;
	}
	async run() {
		this.speedMonitor.start();
		let nextStorageObject;
		while ((nextStorageObject = this.getNextStorageObject()) !== undefined) {
			this.storageObjectUpload = new StorageObjectUpload(
				nextStorageObject,
				Object.assign({}, this.options, {onProgressCallback: this._onStorageObjectProgress.bind(this, nextStorageObject.ID)})
				);
			await this.storageObjectUpload.run();
		}
		this.speedMonitor.end();
		console.debug('Finishing runner');
	}
	_onStorageObjectProgress(objectID, progress, size) {
		this.fileStorageObjectsProgress[objectID] = progress;
		this.storageObjectsProgress[objectID] = progress;

		let runnerProgress = 0;
		for (let storageObjectProgress of this.storageObjectsProgress) {
			runnerProgress += storageObjectProgress || 0;
		}

		this.speedMonitor.update(runnerProgress);
		this.onProgressCallback();
	}
	abort() {
		console.debug("aborting fileUploadRunner");
		this.aborted = true;
		if (this.storageObjectUpload && this.storageObjectUpload.abort)
			this.storageObjectUpload.abort();
	}
	getSpeedMonitor() {
		return this.speedMonitor;
	}
}

export default class {
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
		if (this.options.parallelUploads > this.storageObjectsCount)
			console.warn(
				"not able to reach full acceleration potential,",
				"this may occur because your file is too small,",
				"please consider adjusting parallelMinSize."
				);
		this.storageObjects = [];
		this.storageObjectsProgress	= [...Array(this.storageObjectsCount).values()];
		this.runners = [];
		this.speedMonitor = new SpeedMonitor();
	}
	_getNextStorageObject() {
		let storageObject = this.storageObjects.shift();
		console.debug("next storageObject", storageObject);
		return storageObject;
	}
	_onFileProgress(finished) {
		let fileProgress = 0;
		for (let storageObjectProgress of this.storageObjectsProgress) {
			fileProgress += storageObjectProgress || 0;
		}
		this.speedMonitor.update(fileProgress);
		
		if (finished)
			var averageBitrateMbps = this.speedMonitor.getAverageSpeed() * 8 / 1024 / 1024;
		else {
			let smoothedSpeed = 0;
			for (let runner of this.runners) {
				smoothedSpeed += runner.getSpeedMonitor().getSmoothedSpeed();
			}
			var averageBitrateMbps = smoothedSpeed * 8 / 1024 / 1024;
		}

		console.debug('_onfileProgress', fileProgress, this.file.size, this.speedMonitor.getDuration().toFixed(1), averageBitrateMbps.toFixed(2));
		this.options.onProgressCallback && this.options.onProgressCallback(fileProgress, this.file.size, this.speedMonitor.getDuration(), averageBitrateMbps);		
	}
	async authorize() {
		this.authorization = await this._getAuthorization();
		if (this.authorization.uploadParts.length != this.storageObjectsCount)
			throw "incorrect parts count within authorization";

		let objectSize = Math.ceil(this.file.size / this.storageObjectsCount);
		for (let i = 0; i < this.storageObjectsCount; i++) {
			this.storageObjects.push({
				ID: i,
				fileName: `${this.authorization.uploadPartsFilenamePrefix}.${i}`,
				payload: this.file.slice(i * objectSize, Math.min(objectSize * (i + 1), this.file.size)),
				uploadURI: this.authorization.uploadParts[i].uploadURI
			});
		}
		this.objectsComposition = this.storageObjects.reduce((accumulator, value) => {
			accumulator.push({'name': value.fileName}); return accumulator},
			[])
		console.debug('Storage objects computation', {
			objectsCount: this.storageObjectsCount,
			objectSize: objectSize,
			objects: this.storageObjects,
			objectsComposition: this.objectsComposition
		});
		return this.authorization;
	}
	async run() {
		if (!this.authorization)
			throw "authorization required, please call authorize() first";
		this.speedMonitor.start();
		var runnersPromise = [];
		for (let i = 0; i < Math.min(this.options.parallelUploads, this.storageObjectsCount); i++) {
			let runner = new FileUploadRunner(this.storageObjectsProgress, this._getNextStorageObject.bind(this), this._onFileProgress.bind(this));
			this.runners.push(runner);
			console.debug('Launching runner', i);
			runnersPromise.push(runner.run());
		}
		await Promise.all(runnersPromise);
		this.speedMonitor.end();
		console.info("all running uploads successfully finished");
		this._onFileProgress(true);
		return await this._composeStorageObjects();
	}

	async _composeStorageObjects() {
		console.info('composing final file and purging upload parts, this may take a few seconds');
		let parameters = new URLSearchParams();
		parameters.append("fileName", this.file.name);
		parameters.append("uploadBackendID", this.authorization.uploadBackendID);

		let request = new Request(this.options.composeAuthorizationURL + '?' + parameters.toString(), {
			method: 'POST',
    		body: JSON.stringify(this.objectsComposition),
			cache: 'no-store'
		});

		let response = await fetch(request, {mode: this.options.authorizeFetchMode});
		if (response.status < 200 || response.status > 299)
			throw `error while getting compose authorization: ${response.status} ${response.statusText}`;
		return await response.json();
	}
	async _getAuthorization() {
		console.log("getting file upload authorization, this can take a couple of seconds");
		let parameters = new URLSearchParams();
		parameters.append("fileName", this.file.name);
		parameters.append("fileSize", this.file.size);
		parameters.append("parts", this.storageObjectsCount);

		let request = new Request(this.options.uploadAuthorizationURL + '?' + parameters.toString(), {
			method: 'GET',
			cache: 'no-store'
		});

		let response = await fetch(request, {mode: this.options.authorizeFetchMode});
		if (response.status < 200 || response.status > 299)
			throw `error while getting upload authorization: ${response.status} ${response.statusText}`;
		let authorization = await response.json();
		console.debug("authorization", authorization);
		if (!authorization.uploadBackendID)
			throw "authorization lacks uploadBackendID";
		if (!authorization.uploadPartsFilenamePrefix)
			throw "authorization lacks uploadPartsFilenamePrefix";
		if (!authorization.uploadParts)
			throw "authorization lacks uploadParts";
		return authorization;
	}
	abort() {
		console.debug("aborting fileUpload");
		for (let runner of this.runners)
			runner.abort();
	}
}