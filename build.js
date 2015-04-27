var fs = require("fs");
var browserify = require("browserify");
var babelify = require("babelify");
var minifyify = require("minifyify");

browserify({ debug: true })
  .transform(babelify, { optional: ["runtime"] })
  // .plugin(minifyify, { map: false })
  .require("./src/mule.js", { entry: true })
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(fs.createWriteStream("dist/mule.js"));
