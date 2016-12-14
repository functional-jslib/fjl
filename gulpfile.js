/**
 * Created by elyde on 12/13/2016.
 */
/**
 * Created by edelacruz on 4/14/14.
 */

'use strict';

let packageJson = require('./package'),
    gulp = require('gulp'),
    // mocha = require('gulp-mocha'),
    // uglify = require('gulp-uglify'),
    // duration = require('gulp-duration'),
    // fncallback = require('gulp-fncallback'),
    // lazypipe = require('lazypipe'),
    // chalk = require('chalk'),
    // del = require('del');
    babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'));
});
