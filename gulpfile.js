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
    gulpConfig = require('./gulpfileConfig'),

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
    {cjsBuildPath, amdBuildPath,
     umdBuildPath, iifeBuildPath,
     buildPathRoot} = gulpConfig.paths,
    buildPath = (...tails) => path.join.call(path, buildPathRoot, ...tails),
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

gulp.task('clean', () => {
    let paths = [cjsBuildPath, amdBuildPath, umdBuildPath, iifeBuildPath]
        .map(partialPath => buildPath(partialPath, '**', '*.js'));
    return del(paths)
        .then(paths => {
        if (paths.length > 0) {
            console.log(chalk.dim('\nThe following paths have been deleted: \n - ' + paths.join('\n - ') + '\n'));
        }
        else {
            console.log(chalk.dim(' - No paths to clean.') + '\n', '--mandatory');
        }
    })
    .catch(console.log);
});

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
        .pipe(uglify(gulpConfig.uglifyOptions))
        .pipe(header('/**! ' + iifeFileName + ' <%= version %> | License: <%= license %> | ' +
            'md5checksum: <%= fileHash %> | Built-on: <%= (new Date()) %> **/', Object.assign(data, packageJson)))
        .pipe(gulp.dest('./'));
});

gulp.task('build-js', ['iife', 'cjs', 'amd', 'umd']);

gulp.task('watch', () => {
    return gulp.watch([
        './src/**/*.js',
        './node_modules/**'
    ], [
        'uglify'
    ]);
});

gulp.task('default', ['uglify', 'watch']);
