console.debug = process.env.DEBUG && console.debug || function() {};

export default class {
	constructor(options) {
		this.options = Object.assign({
			minLapseMs: 200, // minimum number of ms before considering an update
			averageSmoothingFactor: 0.8
		}, options);
		this.reset();
	}
	reset() {
		this.startDate = this.endDate = this.lastUpdateDate = 0;
		this.progress = 0;	
		this.currentSpeed = this.averageSpeed = this.smoothedSpeed = 0;
		this.ended = false;
	}
	start() {
		var now = Date.now();
		this.startDate = this.lastUpdateDate = now;
	}
	end() {
		this.endDate = Date.now();
		this.currentSpeed = this.smoothedSpeed = 0;
		this.ended = true;
	}
	update(progress) {
		var now = Date.now();
		if (this.ended)
			return;
		if (now - this.lastUpdateDate < this.minLapseMs) {
			console.debug("too fast speed updates");
			return;
		}

		this.currentSpeed = (progress - this.progress) / (now - this.lastUpdateDate);
		this._computeAverageSpeed();
		this._computeSmoothedSpeed();

		this.progress = progress;
		this.lastUpdateDate = now;
		this.duration = Math.max(this.lastUpdateDate, this.endDate) - this.startDate;
	}

	_computeAverageSpeed() {
		let totalDuration = this.duration;
		if (totalDuration)
			this.averageSpeed = this.progress / totalDuration;
		else
			this.averageSpeed = 0;
	}
	_computeSmoothedSpeed() {
		this.smoothedSpeed = this.smoothedSpeed * this.options.averageSmoothingFactor
			+ this.currentSpeed * (this.smoothedSpeed && 1 - this.options.averageSmoothingFactor || 1);
	}
	getCurrentSpeed() {
		return this.currentSpeed * 1000;
	}
	getAverageSpeed() {
		return this.averageSpeed * 1000;
	}
	getSmoothedSpeed() {
		return this.smoothedSpeed * 1000;
	}
	getDuration() {
		return this.duration / 1000;
	}
}