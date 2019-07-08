var gulp = require('gulp');
var zip  = require('gulp-zip');
gulp.src(['./build/**/*']).pipe(zip('browse-less-' + new Date().getTime() + '.zip')).pipe(gulp.dest('./dist'));