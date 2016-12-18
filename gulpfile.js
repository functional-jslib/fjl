/**
 * Created by elyde on 12/13/2016.
 */
/**
 * Created by edelacruz on 4/14/14.
 */

'use strict';

let packageJson = require('./package'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    // mocha = require('gulp-mocha'),
    // uglify = require('gulp-uglify'),
    // duration = require('gulp-duration'),
    // fncallback = require('gulp-fncallback'),
    // lazypipe = require('lazypipe'),
    // chalk = require('chalk'),
    // del = require('del');
    rollup = require('gulp-better-rollup'),
    babel = require('gulp-babel');

gulp.task('default', ['babel']);
gulp.task('babel', () => {
    return gulp.src('index.js')
        .pipe(rollup({
            moduleName: 'fjl',
            format: 'iife'
        }))
        .pipe(babel())
        .pipe(concat('dist/fjl.js'))
        .pipe(gulp.dest('./'));
});
