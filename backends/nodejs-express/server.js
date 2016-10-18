var express = require('express');
var fs = require('fs');
var Mustache = require('mustache');
var CryptoJS = require("crypto-js");
var sqlite3 = require('sqlite3');
var settings = require('./settings');

var app = express();
app.use("/mule.js", express.static(__dirname + '/../../dist/mule.js'));

// utils //
var pad = function (n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
var getSignatureKey = function (key, dateStamp, regionName, serviceName) {
   var kDate= CryptoJS.HmacSHA256(dateStamp, "AWS4" + key);
   var kRegion= CryptoJS.HmacSHA256(regionName, kDate);
   var kService=CryptoJS.HmacSHA256(serviceName, kRegion);
   var kSigning= CryptoJS.HmacSHA256("aws4_request", kService);
   return kSigning;
}

//todo: handle DB operations in ORM style

// ensure DB and schema //
var dbExists = fs.existsSync(settings.dbFileName);
if(!dbExists) {
	var db = new sqlite3.Database(settings.dbFileName);
	db.serialize(function() {
		db.run('CREATE TABLE upload (' +
			'filename VARCHAR(256),' +
			'filesize VARCHAR(64),' +
			'last_modified VARCHAR(64),' +
			'upload_start DATETIME,' +
			'last_information DATETIME,' +
			'key VARCHAR(256),' +
			'upload_id VARCHAR(128),' +
			'chunks_uploaded TEXT' +		
		')');
	});
	db.close();
}

app.get('/mule-backend/signing_key/', function (req, res) {
	var date = new Date();
	var dateStamp = '' + date.getUTCFullYear() + pad(date.getUTCMonth() + 1, 2) + pad(date.getUTCDate(), 2);
	
	// check signature algorithm //
	//console.log('TEST: ', getSignatureKey('wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY', '20120215', 'us-east-1', "iam").toString());
	
	var key = getSignatureKey(settings.aws_secret, dateStamp, settings.region, "s3").toString();
	
	var filename = req.query['filename'];
    var filesize = req.query['filesize'];
    var last_modified = req.query['lastModified'];
	
	var data = {
        "date": dateStamp.substr(0,4) + '-' + dateStamp.substr(4,2) + '-' + dateStamp.substr(6,2),
        "signature": key,
        "accessKey": settings.aws_access_key,
        "region": settings.region,
        "bucket": settings.bucket,
        "backupKey": '' + Math.floor(1 + 999999999 * Math.random()),
        "contentType": settings.mime_type,
    };
	
	//todo: this should be organized better //
	var db = new sqlite3.Database(settings.dbFileName);
	db.serialize(function() {
		var force = req.query['force'];
		if (!force) {
			db.get('SELECT * FROM upload WHERE filename = $filename AND filesize = $filesize AND last_modified = $last_modified', {
				$filename: filename,
				$filesize: filesize,
				$last_modified: last_modified
			}, function (err, row) {
				
				// add found data to response //
				if (row) {
					data['key'] = row['key'];
					data['uploadId'] = row['upload_id'];
					data['chunks'] = row['chunks_uploaded'].split(',').map(function (n) {return parseInt(n, 10)});
				}
				
				res.send(JSON.stringify(data));
			});
		} else {
			db.run('DELETE FROM upload WHERE filename = $filename AND filesize = $filesize AND last_modified = $last_modified', {
				$filename: filename,
				$filesize: filesize,
				$last_modified: last_modified
			});
			res.send(JSON.stringify(data));
		}
	});
	
	db.close();
	
});

app.get('/mule-backend/chunk_loaded/', function (req, res) {
	var key = req.query['key'];
	var upload_id = req.query['uploadId'];
    
	var filename = req.query['filename'];
	var filesize = req.query['filesize'];
	var last_modified = req.query['lastModified'];
	
    var chunk = parseInt(req.query['chunk'], 10)
	
	if (filesize > settings.chunk_size) {
		
		var db = new sqlite3.Database(settings.dbFileName);
		db.serialize(function() {
			db.get('SELECT * FROM upload WHERE filename = $filename AND filesize = $filesize AND last_modified = $last_modified', {
				$filename: filename,
				$filesize: filesize,
				$last_modified: last_modified
			}, function (err, row) {
				
				// update //
				if (row) {
					var chunks = row['chunks_uploaded'].split(',').map(function (n) {return parseInt(n, 10)});
					chunks.push(chunk);
					
					db.serialize(function() {
						//todo: the selection here should be better
						db.run('UPDATE upload SET chunks_uploaded = $chunks WHERE filename = $filename AND filesize = $filesize AND last_modified = $last_modified', {
							$filename: filename,
							$filesize: filesize,
							$last_modified: last_modified,
							$chunks: chunks.join(',')
						});
					});
				} 
				
				// insert new //
				else {
					db.serialize(function() {
						db.run('INSERT INTO upload (filename, filesize, last_modified, chunks_uploaded, key, upload_id) VALUES ($filename, $filesize, $last_modified, $chunks_uploaded, $key, $upload_id)', {
							$filename: filename, 
							$filesize: filesize, 
							$last_modified: last_modified, 
							$chunks_uploaded: '' + chunk, 
							$key: key, 
							$upload_id: upload_id
						});
					});
				}
				
				res.send('');
			});
		});
		
	} else {
		res.send('');
	}
	
});

app.get('/', function (req, res) {
	var template = fs.readFile('./index.html', 'utf8', function (err, data) {
		res.send(Mustache.render(data, {
			aws_access_key: settings.aws_access_key,
			mime_type: settings.mime_type,
			key: '' + Math.floor(1 + 999999999 * Math.random()),
			bucket: settings.bucket,
			ajax_base: '/mule-backend'
		}));
	});
});

app.listen(settings.serverPort, function () {
  console.log('Mule Uploaded BE app listening on port ' + settings.serverPort + '!');
});