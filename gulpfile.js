/**
 * Created by elyde on 12/13/2016.
 */
/**
 * Created by edelacruz on 4/14/14.
 */

'use strict';

let path = require('path'),
    crypto = require('crypto'),
    packageJson = require('./package'),
    gulpConfig = packageJson.gulpConfig,

    /** Gulp Modules (or modules used by gulp) **/
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    header = require('gulp-header'),
    mocha = require('gulp-mocha'),
    uglify = require('gulp-uglify'),
    duration = require('gulp-duration'),
    fncallback = require('gulp-fncallback'),
    lazyPipe = require('lazypipe'),
    rollup = require('gulp-better-rollup'),
    babel = require('gulp-babel'),

    /** Util Modules **/
    chalk = require('chalk'),
    del = require('del'),

    /** Paths **/
    {cjsBuildDir, amdBuildDir,
     umdBuildDir, iifeBuildDir,
     buildPathRoot} = gulpConfig.paths,
    buildPath = (...tails) => path.join.call(path, buildPathRoot, ...tails),
    amdBuildPath =  buildPath(amdBuildDir),
    umdBuildPath =  buildPath(umdBuildDir),
    cjsBuildPath =  buildPath(cjsBuildDir),
    iifeBuildPath = buildPath(iifeBuildDir),
    iifeMinFileName =   'fjl.min.js',
    iifeFileName =      'fjl.js',
    iifeModuleName =    'fjl',

    /** Lazy Pipes **/
    eslintPipe = lazyPipe()
        .pipe(eslint)
        .pipe(eslint.format)
        .pipe(eslint.failOnError),

    iifePipe = lazyPipe()
        .pipe(rollup, {moduleName: iifeModuleName, format: 'iife'})
        .pipe(babel)
        .pipe(concat, buildPath(iifeBuildPath, iifeFileName));

gulp.task('eslint', () => {
    return gulp.src(['./src/**/*.js', '!node_modules/**']).pipe(eslintPipe());
});

gulp.task('umd', ['eslint'], () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(buildPath(umdBuildPath)));
});

gulp.task('amd', ['eslint'], () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(buildPath(amdBuildPath)));
});

gulp.task('cjs', ['eslint'], () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(buildPath(cjsBuildPath)));
});

gulp.task('iife', ['eslint'], () => {
    return gulp.src('index.js')
        .pipe(iifePipe())
        .pipe(gulp.dest('./'));
});

gulp.task('uglify', ['iife'], function () {
    const data = {};
    return gulp.src(buildPath(iifeBuildPath, iifeFileName))
        .pipe(concat(buildPath(iifeBuildPath, iifeMinFileName)))
        .pipe(fncallback(function (file, enc, cb) {
            let hasher = crypto.createHash('md5');
            hasher.update(file.contents.toString(enc));
            data.fileHash = hasher.digest('hex');
            cb();
        }))
        .pipe(uglify())
        .pipe(header('/**! ' + iifeFileName + ' <%= version %> | License: <%= license %> | ' +
            'md5checksum: <%= fileHash %> | Built-on: <%= (new Date()) %> **/', data))
        .pipe(gulp.dest('./'));
});

gulp.task('build-js', ['iife', 'cjs', 'amd', 'umd']);

gulp.task('default', ['build-js']);
