var gulp = require('gulp'),
  gls = require('gulp-live-server'),
  gutil = require('gulp-util'),
  webpack = require('webpack');

var expressSrcFiles = ['lib/**/*.js'];

gulp.task('server', function() {
  var server = gls('.');
  server.start().then(function(result) {
    gutil.log('Server exited with result:', result);
  });
  return gulp.watch(expressSrcFiles, function(file) {
    gutil.log(file);
    server.start.apply(server);
  });
});

gulp.task('default', ['server']);
