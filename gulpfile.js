/**
 * Created by elyde on 12/13/2016.
 */

'use strict';

const path = require('path'),
    crypto = require('crypto'),
    packageJson = require('./package'),
    gulpConfig = require('./gulpfileConfig'),

    /** Gulp Modules (or modules used by gulp) **/
    gulp =          require('gulp'),
    concat =        require('gulp-concat'),
    eslint =        require('gulp-eslint'),
    header =        require('gulp-header'),
    uglify =        require('gulp-uglify'),
    fncallback =    require('gulp-fncallback'),
    jsdoc =         require('gulp-jsdoc3'),
    gulpRollup =    require('gulp-better-rollup'),
    lazyPipe =      require('lazypipe'),
    gulpBabel =     require('gulp-babel'),

    // Rollup plugins
    rollup = require('rollup'),
    rollupBabel = require('rollup-plugin-babel'),
    rollupResolve = require('rollup-plugin-node-resolve'),

    /** Util Modules **/
    chalk = require('chalk'),
    del = require('del'),

    /** Paths **/
    {
        cjsBuildPath, amdBuildPath,
        umdBuildPath, iifeBuildPath,
        buildPathRoot
    } = gulpConfig.paths,

    buildPath = (...tails) => path.join.call(path, buildPathRoot, ...tails),

    iifeMinFileName = 'fjl.min.js',
    iifeFileName = 'fjl.js',
    iifeModuleName = 'fjl',
    srcsGlob = './src/**/*.js',

    /** Lazy Pipes **/
    eslintPipe = lazyPipe()
        .pipe(eslint)
        .pipe(eslint.format)
        .pipe(eslint.failOnError),

    // Log func
    log = console.log.bind(console),

    deleteFilePaths = pathsToDelete =>
        del(pathsToDelete)
            .then(deletedPaths => {
                if (deletedPaths.length) {
                    log(chalk.dim('\nThe following paths have been deleted: \n - ' + deletedPaths.join('\n - ') + '\n'));
                    return;
                }
                log(chalk.dim(' - No paths to clean.') + '\n', '--mandatory');
            })
            .catch(log)
    ;

gulp.task('clean', () => {
    let pathsToDelete = [cjsBuildPath, amdBuildPath, umdBuildPath, iifeBuildPath]
        .map(partialPath => buildPath(partialPath, '**', '*.js'));
    return deleteFilePaths(pathsToDelete);
});

gulp.task('eslint', () => gulp.src(['./src/**/*.js', '!node_modules/**']).pipe(eslintPipe()));

gulp.task('umd', ['eslint'], () =>
    gulp.src(srcsGlob)
        .pipe(gulpBabel(gulpConfig.buildUmdOptions.babel))
        .pipe(gulp.dest(buildPath(umdBuildPath))));

gulp.task('amd', ['eslint'], () =>
    gulp.src(srcsGlob)
        .pipe(gulpBabel(gulpConfig.buildAmdOptions.babel))
        .pipe(gulp.dest(buildPath(amdBuildPath))));

gulp.task('cjs', ['eslint'], () =>
    gulp.src(srcsGlob)
        .pipe(gulpBabel(gulpConfig.buildCjsOptions.babel))
        .pipe(gulp.dest(buildPath(cjsBuildPath))));

gulp.task('iife', ['eslint'], () =>
    rollup.rollup({
        input: 'src/fjl.js',
        plugins: [
            rollupResolve(),
            rollupBabel({
                babelrc: false,
                presets: [
                    [
                        'es2015',
                        {
                            modules: false
                        }
                    ]
                ],
                plugins: [
                    'external-helpers'
                ],
                exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    })
    .then(bundle => bundle.write({
        file: buildPath(iifeBuildPath, iifeFileName),
        format: 'iife',
        name: iifeModuleName,
        // dest: buildPath(iifeBuildPath, iifeFileName),
        sourcemap: true
    })));

gulp.task('es6-module', ['eslint'], () =>
    gulp.src('./src/fjl.js')
        .pipe(gulpRollup(null, {moduleName: iifeModuleName, format: 'es'}))
        .pipe(concat(buildPath('es6-module', iifeFileName)))
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

gulp.task('build-js', ['uglify', 'cjs', 'amd', 'umd', 'es6-module', 'build-js-for-package']);

gulp.task('docs', () =>
    deleteFilePaths(['./docs/**/*'])
        .then(_ =>
            gulp.src(['README.md', './src/**/*.js'], {read: false})
                .pipe(jsdoc({
                    opts: {
                        template: 'node_modules/tui-jsdoc-template',  // same as -t templates/default
                        encoding: 'utf8',               // same as -e utf8
                        destination: './docs/',       // same as -d ./out/
                        recurse: true,
                        templates: {
                            useCollapsibles: false
                        }
                    },
                    // @todo create logo for `fjl`
                    "templates": {
                        "logo": {
                            "url": "http://elycruz.com/fjl-logo-v2.svg",
                            "width": "144px",
                            "height": "55px",
                            "link": "https://github.com/functional-jslib/fjl"
                        },
                        "footerText": "fjl library - BSD 3.0 License - JsDoc Template -> tui-jsdoc-template - by NHN Entertainment - Frontend Development Lab"
                    }
                }))
        )
);

gulp.task('build-docs', ['docs']);

gulp.task('build', ['build-js']);

gulp.task('build-js-for-package', () => {
    return gulp.src('./src/fjl.js')
        .pipe(gulpRollup(null, {moduleName: iifeModuleName, format: 'es'}))
        .pipe(concat(buildPath('package/fjl.mjs')))
        .pipe(gulp.dest('./'))
        .pipe(gulpBabel(gulpConfig.buildCjsOptions.babel))
        .pipe(concat(buildPath('package/fjl.js')))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', ['build'], () =>
    gulp.watch([
        srcsGlob,
        './node_modules/**'
    ], [
        'build-js'
    ]));

gulp.task('default', ['build', 'watch']);
