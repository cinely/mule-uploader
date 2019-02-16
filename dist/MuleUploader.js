(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["muleUploader"] = factory();
	else
		root["muleUploader"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/MuleUploader.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MuleUploader.js":
/*!*****************************!*\
  !*** ./src/MuleUploader.js ***!
  \*****************************/
/*! exports provided: GCSUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GCSUpload\", function() { return GCSUpload; });\nconst BACKEND_SECURITY_MODE_SESSION = 'session'\nconst BACKEND_SECURITY_MODE_SIGNED_URI = 'signed-uri'\n\nclass Upload {\n\tconstructor(options, defaultOptions) {\n\t\tconsole.log(`muleUploader ${this.constructor.name} ${\"2.0.0\"} ${ true && 'DEBUG' || false}`);\n\t\tthis.options = Object.assign({\n\t\t\tchunkSize: 50*1024*1024\n\t\t\t}, defaultOptions, options);\n\t\tthis.fetchOptions = {\n\t\t\tmode: this.options.backendFetchMode || 'cors'\n\t\t}\n\t\t// console.debug(this.options, this.fetchOptions)\n\t}\n\tloadFile(file) {\n\t\tif (!file.name || !file.size)\n\t\t\tthrow \"not able to load file\"\n\t\tthis.file = file;\n\t\tlet chunkCount = Math.ceil(this.file.size / this.options.chunkSize);\n\t\tthis.chunks = [...Array(chunkCount).keys()];\n\t\tconsole.debug('File loaded', {\n\t\t\tsize: this.file.size,\n\t\t\tchunks: this.chunks\n\t\t});\n\t}\n\tasync run() {\n\t\tif (!this.file)\n\t\t\tthrow \"file not loaded\";\n\t}\n\tasync _uploadFile() {\n\t\tlet nextChunk;\n\t\twhile ((nextChunk = this._getNextChunk()) !== undefined) {\n\t\t\tawait this._uploadChunk(nextChunk);\n\t\t}\n\t}\n\tasync _uploadChunk(chunk) {\n\t\tlet start = chunk * this.options.chunkSize;\n\t\tlet end = Math.min(start + this.options.chunkSize, this.file.size);\n\t\tconsole.debug(`uploading chunk ${chunk}: ${start}-${end}`);\n\t\tlet contentType = this.file.type != \"\" && this.file.type || 'application/octet-stream';\n\t\tlet contentRange = `bytes ${start}-${end - 1}/${this.file.size}`;\n\t\tlet contentLength = end - start;\n\t\treturn this._futch(this.session.uploadURI, {\n\t\t\tmethod: 'PUT',\n\t\t\tbody: this.file.slice(start, end),\n\t\t\theaders: {\n\t\t\t\t'Content-Type': contentType,\n\t\t\t\t'Content-Range': contentRange\n\t\t\t\t// 'Content-Length': contentLength not authorized and computed automatically\n\t\t\t}\n\t\t});\n\t}\n\t_getNextChunk() {\n\t\treturn this.chunks.shift();\n\t}\n\tasync _futch(url, opts={}, onProgress) {\n\t\treturn new Promise( (resolve, reject)=>{\n\t\t\tlet xhr = new XMLHttpRequest();\n\t\t\txhr.open(opts.method || 'get', url);\n\t\t\tfor (let k in opts.headers||{})\n\t\t\t\txhr.setRequestHeader(k, opts.headers[k]);\n\t\t\txhr.onload = e => resolve(e.target.responseText);\n\t\t\txhr.onerror = reject;\n\t\t\tif (xhr.upload && this.options.progressCallback)\n\t\t\t\txhr.upload.onprogress = this.options.progressCallback; // event.loaded / event.total * 100 ; //event.lengthComputable\n\t\t\txhr.send(opts.body);\n\t\t});\n\t}\n}\n\nclass GCSUpload extends Upload {\n\tconstructor(options) {\n\t\tsuper(options, {\n\t\t\tbackendURL: \"http://localhost:8081/signature\",\n\t\t\tbackendSecurityMode: BACKEND_SECURITY_MODE_SESSION\n\t\t\t});\n\t}\n\tasync run() {\n\t\tsuper.run();\n\t\tif ( this.options.backendSecurityMode != BACKEND_SECURITY_MODE_SESSION )\n\t\t\tthrow \"backend security mode not implemented\";\n\t\ttry {\n\t\t\tthis.session = await this._getResumableSessionURI();\n\t\t\tconsole.log('session received', this.session);\n\t\t\tawait this._uploadFile();\n\t\t} catch(error) {\n\t\t\tthrow `Not able to upload, ${error}`;\n\t\t}\n\t}\n\tasync _getResumableSessionURI() {\n\t\tlet parameters = new URLSearchParams();\n\t\tparameters.append(\"fileName\", this.file.name)\n\t\tparameters.append(\"fileSize\", this.file.size)\n\n\t\tlet request = new Request(this.options.backendURL + '?' + parameters.toString(), {\n\t\t\tmethod: 'GET',\n\t\t\tcache: 'no-store'\n\t\t});\n\n\t\tlet response = await fetch(request, this.fetchOptions);\n\t\tif (response.status < 200 || response.status > 299)\n\t\t\tthrow `error while getting signed API call: ${response.statusText}`;\n\t\treturn response.json();\n\t}\n};\n\n//# sourceURL=webpack://muleUploader/./src/MuleUploader.js?");

/***/ })

/******/ });
});