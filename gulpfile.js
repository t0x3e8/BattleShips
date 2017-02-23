var gulp = require('gulp');
var less = require('gulp-less');
 
gulp.task('less', function () {
    'use strict'

    gulp.src('./public/less/*.less').
        pipe(less()).
        pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch', function () {
    'use strict'

    gulp.watch('./public/less/*.less', ['less']);
});