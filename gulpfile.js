const path = require('path'),
    packageJson = require('./package'),
    gulpConfig = require('./gulpfileConfig'),

    /** Gulp Modules (or modules used by gulp) **/
    gulp =          require('gulp'),
    concat =        require('gulp-concat'),
    eslint =        require('gulp-eslint'),
    header =        require('gulp-header'),
    uglify =        require('gulp-uglify'),
    jsdoc =         require('gulp-jsdoc3'),
    gulpRollup =    require('gulp-better-rollup'),
    gulpBabel =     require('gulp-babel'),

    // Rollup plugins
    rollup = require('rollup'),
    rollupBabel = require('rollup-plugin-babel'),
    rollupResolve = require('rollup-plugin-node-resolve'),

    /** Util Modules **/
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

    log = console.log.bind(console),

    {series, dest, src, parallel} = gulp,

    deleteFilePaths = pathsToDelete =>
        del(pathsToDelete)
            .then(deletedPaths => {
                if (deletedPaths.length) {
                    log('\nThe following paths have been deleted: \n - ' + deletedPaths.join('\n -'));
                    return;
                }
                log(' - No paths to clean.\n', '--mandatory');
            })
            .catch(log),

    cleanTask = () => {
        let pathsToDelete = [cjsBuildPath, amdBuildPath, umdBuildPath, iifeBuildPath]
            .map(partialPath => buildPath(partialPath, '**', '*.js'));
        return deleteFilePaths(pathsToDelete);
    },

    eslintTask = () =>
        src(['./src/**/*.js', '!node_modules/**'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failOnError()),

    umdTask = () =>
        src(srcsGlob)
        .pipe(gulpBabel(gulpConfig.buildUmdOptions.babel))
        .pipe(dest(buildPath(umdBuildPath))),

    amdTask = () =>
        src(srcsGlob)
            .pipe(gulpBabel(gulpConfig.buildAmdOptions.babel))
            .pipe(dest(buildPath(amdBuildPath))),

    cjsTask = () =>
        src(srcsGlob)
            .pipe(gulpBabel(gulpConfig.buildCjsOptions.babel))
            .pipe(dest(buildPath(cjsBuildPath))),

    iifeTask = () =>
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
        })),

    es6ModuleTask = () =>
        src('./src/fjl.js')
            .pipe(gulpRollup(null, {moduleName: iifeModuleName, format: 'es'}))
            .pipe(concat(buildPath('es6-module', iifeFileName)))
            .pipe(dest('./')),

    uglifyTask = () => {
        const data = {};
        return src(buildPath(iifeBuildPath, iifeFileName))
            .pipe(concat(buildPath(iifeBuildPath, iifeMinFileName)))
            .pipe(uglify(gulpConfig.uglifyOptions))
            .pipe(header('/**! ' + iifeFileName + ' <%= version %> | License: <%= license %> | ' +
                'Built-on: <%= (new Date()) %> **/', Object.assign(data, packageJson)))
            .pipe(dest('./'));
    },

    buildJsForPackageTask = () => {
        return src('./src/fjl.js')
            .pipe(gulpRollup(null, {moduleName: iifeModuleName, format: 'es'}))
            .pipe(concat(buildPath('package/fjl.mjs')))
            .pipe(dest('./'))
            .pipe(gulpBabel(gulpConfig.buildCjsOptions.babel))
            .pipe(concat(buildPath('package/fjl.js')))
            .pipe(dest('./'));
    },

    buildJsTask = parallel(series(iifeTask, uglifyTask), cjsTask, amdTask, umdTask, es6ModuleTask, buildJsForPackageTask),

    buildTask = series(cleanTask, buildJsTask),

    readmeTask = () =>
        gulp.src(gulpConfig.readme)
            .pipe(concat('./README.md'))
            .pipe(gulp.dest('./')),

    docTask = series(readmeTask, () =>
        deleteFilePaths(['./docs/**/*'])
            .then(() =>
                src(['README.md', './src/**/*.js'], {read: false})
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
                        'templates': {
                            'logo': {
                                'url': 'http://elycruz.com/fjl-logo-v2.svg',
                                'width': '144px',
                                'height': '55px',
                                'link': 'https://github.com/functional-jslib/fjl'
                            },
                            'footerText': 'fjl library - BSD 3.0 License - JsDoc Template -> tui-jsdoc-template - by NHN Entertainment - Frontend Development Lab'
                        }
                    }))
            )),

    watchTask = series(buildTask, function watchTask () {
            return gulp.watch([srcsGlob, './node_modules/**'], buildJsTask);
        }
    );

    gulp.task('eslint', eslintTask);

    gulp.task('build', buildTask);

    gulp.task('readme', readmeTask);

    gulp.task('docs', docTask);

    gulp.task('watch', watchTask);

    gulp.task('default', watchTask);
