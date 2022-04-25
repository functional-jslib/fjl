import {terser} from 'rollup-plugin-terser';
import path from 'path';

const

    nonAlnumRegex = /[^a-z\d]+/g,

    camelCase = xs =>
        xs.split(nonAlnumRegex)
            .map(_xs => _xs[0].toUpperCase() + _xs.slice(1))
            .join(''),

    projectNames = ['fjl'],

    configs = projectNames.flatMap(projectName => {
        const projectPath = __dirname,
            iifeName = camelCase(projectName),
            configBase = {
                input: path.join(projectPath, 'src/fjl.js'),
                treeshake: false,
                plugins: [terser()]
            };

        return [{
            ...configBase,
            output: {
                format: 'es',
                dir: path.join(projectPath, 'dist/es6-module/'),
                preserveModules: true,
                preserveModulesRoot: path.join(projectPath, 'src'),
                sourcemap: true,
            }
        }, {
            ...configBase,
            output: {
                format: 'amd',
                dir: path.join(projectPath, 'dist/amd/'),
                preserveModules: true,
                preserveModulesRoot: path.join(projectPath, 'src'),
                sourcemap: true,
            }
        }, {
            ...configBase,
            output: {
                format: 'cjs',
                dir: path.join(projectPath, 'dist/cjs/'),
                preserveModules: true,
                preserveModulesRoot: path.join(projectPath, 'src'),
                sourcemap: true,
            }
        }, {
            ...configBase,
            output: {
                format: 'umd',
                file: path.join(projectPath, 'dist/umd/fjl.js'),
                sourcemap: true,
                name: iifeName
            }
        }, {
            ...configBase,
            output: {
                format: 'iife',
                file: path.join(projectPath, 'dist/fjl.min.js'),
                sourcemap: true,
                name: iifeName
            }
        }];
    });

export default configs;
