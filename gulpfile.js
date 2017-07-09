/**
 * Created by elyde on 12/13/2016.
 */

'use strict';

const fs = require('fs'),
    path = require('path'),
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
    jsdoc = require('gulp-jsdoc3'),
    replace = require('gulp-replace'),
    lazyPipe = require('lazypipe'),
    rollup = require('gulp-better-rollup'),
    babel = require('gulp-babel'),

    /** Util Modules **/
    chalk = require('chalk'),
    del = require('del'),

    /** Paths **/
    {
        cjsBuildPath, amdBuildPath,
        umdBuildPath, iifeBuildPath,
        buildPathRoot, markdownFragsPath
    } = gulpConfig.paths,
    buildPath = (...tails) => path.join.call(path, buildPathRoot, ...tails),
    iifeMinFileName = 'fjl.min.js',
    iifeFileName = 'fjl.js',
    iifeModuleName = 'fjl',
    srcsGlob = './src/**/*.js',

    ModuleMemberReadStream = require('./node-scripts/ModuleMemberListReadStream'),
    VersionNumberReadStream = require('./node-scripts/VersionNumberReadStream'),

    /** Lazy Pipes **/
    eslintPipe = lazyPipe()
        .pipe(eslint)
        .pipe(eslint.format)
        .pipe(eslint.failOnError),

    iifePipe = lazyPipe()
        .pipe(rollup, {moduleName: iifeModuleName, format: 'iife'})
        .pipe(babel)
        .pipe(concat, buildPath(iifeBuildPath, iifeFileName));

gulp.task('member-list-md', ['cjs'], () => {
    let outputDir = './markdown-fragments/generated',
        filePath = outputDir + '/member-list.md';
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }
    fs.writeFileSync(filePath, '');
    return (new ModuleMemberReadStream(
        require('./dist/cjs/fjl'), 'fjl', markdownFragsPath + '/member-list'
    ))
        .pipe(fs.createWriteStream(filePath));
});

gulp.task('member-list-md-content', ['member-list-md'], () =>
    gulp.src(markdownFragsPath + '/member-list/*.md')
        .pipe(concat(markdownFragsPath + '/generated/member-list-content.md'))
        .pipe(gulp.dest('./')));

gulp.task('generate-version-js', () =>
    (new VersionNumberReadStream())
        .pipe(fs.createWriteStream('./src/generated/version.js')));

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

gulp.task('eslint', () => gulp.src(['./src/**/*.js', '!node_modules/**']).pipe(eslintPipe()));

gulp.task('umd', ['eslint'], () =>
    gulp.src(srcsGlob)
        .pipe(babel(gulpConfig.buildUmdOptions.babel))
        .pipe(gulp.dest(buildPath(umdBuildPath))));

gulp.task('amd', ['eslint'], () =>
    gulp.src(srcsGlob)
        .pipe(babel(gulpConfig.buildAmdOptions.babel))
        .pipe(gulp.dest(buildPath(amdBuildPath))));

gulp.task('cjs', ['eslint'], () =>
    gulp.src(srcsGlob)
        .pipe(babel(gulpConfig.buildCjsOptions.babel))
        .pipe(gulp.dest(buildPath(cjsBuildPath))));

gulp.task('iife', ['eslint', 'generate-version-js'], () =>
    gulp.src('./src/fjl.js')
        .pipe(iifePipe())
        .pipe(gulp.dest('./')));

gulp.task('uglify', ['iife'], () => {
    const data = {};
    return gulp.src(buildPath(iifeBuildPath, iifeFileName))
        .pipe(concat(buildPath(iifeBuildPath, iifeMinFileName)))
        .pipe(fncallback((file, enc, cb) => {
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

gulp.task('build-js', ['uglify', 'cjs', 'amd', 'umd']);

gulp.task('jsdoc', () =>
    gulp.src(['README.md', './src/**/*.js'], {read: false})
        .pipe(jsdoc({
            opts: {
                "template": "templates/default",  // same as -t templates/default
                "encoding": "utf8",               // same as -e utf8
                "destination": "./jsdocs/",          // same as -d ./out/
                "recurse": true
            }
        })));

gulp.task('build-browser-tests', ['build-js'], () =>
    gulp.src(['tests/for-server/**/*.js'])
        .pipe(replace(/\/\/ ~~~ STRIP ~~~[^~]+\/\/ ~~~ \/STRIP ~~~[\n\r\f]+/gim, ''))
        .pipe(babel())
        .pipe(concat('tests/for-browser/test-suite.js'))
        .pipe(gulp.dest('./'))
        .pipe(rollup({exports: 'named', format: 'amd'}))
        .pipe(concat('tests/for-browser/test-suite.js'))
        .pipe(gulp.dest('./')));

gulp.task('build-readme', [
    'member-list-md',
    'member-list-md-content',
    'generate-version-js'
], () => gulp.src(gulpConfig.readme)
        .pipe(concat('README.md'))
        .pipe(gulp.dest('./')));

gulp.task('build', ['build-js', 'build-browser-tests', 'build-readme']);

gulp.task('tests', ['eslint'], () =>
    gulp.src(gulpConfig.tests.srcs)
        .pipe(babel(gulpConfig.tests.babel))
        .pipe(mocha(gulpConfig.tests.mocha)));

gulp.task('watch', ['build'], () =>
    gulp.watch([
        srcsGlob,
        './node_modules/**'
    ], [
        'build-js'
    ]));

gulp.task('default', ['build', 'watch']);
