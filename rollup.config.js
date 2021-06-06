import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import path from 'path';

const

  nonAlnumRegex = /[^a-z\d]+/g,

  camelCase = xs =>
    xs.split(nonAlnumRegex)
      .map(_xs => _xs[0].toUpperCase() + _xs.slice(1))
      .join(''),

  projectNames = ['fjl', 'fjl-validator'],

  configs = projectNames.flatMap(projectName => {
    const projectPath = path.join(__dirname, `./packages/${projectName}`),
      iifeName = camelCase(projectName),
      configBase = {
        input: path.join(projectPath, 'src/index.ts'),
        treeshake: false,
      },
      plugins = [
        typescript({
          tsconfig: path.join(projectPath, './tsconfig.json'),
        }),
        terser()
      ];

    if (projectName !== 'fjl') configBase.external = ['fjl'];

    return [{
      ...configBase,
      output: {
        format: 'es',
        dir: path.join(projectPath, 'dist/es/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true
      },
      plugins: [
        typescript({
          tsconfig: path.join(projectPath, './tsconfig.prod.es.json'),
        }),
        terser()
      ]
    }, {
      ...configBase,
      output: {
        format: 'amd',
        dir: path.join(projectPath, 'dist/amd/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true
      },
      plugins
    }, {
      ...configBase,
      output: {
        format: 'cjs',
        dir: path.join(projectPath, 'dist/cjs/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true
      },
      plugins
    }, {
      ...configBase,
      output: {
        format: 'umd',
        file: path.join(projectPath, 'dist/index.umd.min.js'),
        sourcemap: true,
        name: iifeName
      },
      plugins
    }, {
      ...configBase,
      output: {
        format: 'iife',
        file: path.join(projectPath, 'dist/index.iife.min.js'),
        sourcemap: true,
        name: iifeName
      },
      plugins
    }];
  });

export default configs;
