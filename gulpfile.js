var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var traceur = require('gulp-traceur');
var isparta = require('isparta');

var istanbulTraceur = require('istanbul-traceur');

gulp.task('test', function (cb) {
  gulp.src([ 'src/*.js' ])
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      require('mocha-traceur');
      gulp.src([ 'spec/**/*.js' ])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});
