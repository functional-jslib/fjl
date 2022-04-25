import {terser} from 'rollup-plugin-terser';
import path from 'path';
import packageJson from './package.json';

const banner = `/**! fjl (functional js library) v${packageJson.version} | License: ${packageJson.license} | ` +
        `Built-on: ${new Date()} **/`,
    projectPath = __dirname,
    iifeName = 'fjl',
    configBase = {
        input: path.join(projectPath, 'src/fjl.js'),
        treeshake: false,
        plugins: [terser()]
    };

export default [{
    ...configBase,
    output: {
        format: 'es',
        dir: path.join(projectPath, 'dist/es6-module/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true,
        banner
    }
}, {
    ...configBase,
    output: {
        format: 'amd',
        dir: path.join(projectPath, 'dist/amd/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true,
        banner
    }
}, {
    ...configBase,
    output: {
        format: 'cjs',
        dir: path.join(projectPath, 'dist/cjs/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true,
        banner
    }
}, {
    ...configBase,
    output: {
        format: 'umd',
        file: path.join(projectPath, 'dist/umd/fjl.js'),
        sourcemap: true,
        name: iifeName,
        banner
    }
}, {
    ...configBase,
    output: {
        format: 'iife',
        file: path.join(projectPath, 'dist/fjl.js'),
        sourcemap: true,
        name: iifeName,
        banner
    }
}];
