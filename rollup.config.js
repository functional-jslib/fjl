import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import path from 'path';

const

  nonAlnumRegex = /[^a-z\d]+/g,

  camelCase = xs =>
    xs.split(nonAlnumRegex)
      .map(_xs => _xs[0].toUpperCase() + _xs.slice(1))
      .join(''),

  projectNames = ['fjl', 'fjl-validator', 'fjl-inputfilter'/*, 'fjl-validator-recaptcha'*/],

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
      ],
      outputGlobals = {};

    if (projectName.includes('fjl-validator')) {
      configBase.external = ['fjl'];
      Object.assign(outputGlobals, {
        fjl: 'fjl'
      })
    } else if (projectName === 'fjl-inputfilter') {
      configBase.external = ['fjl', 'fjl-validator'];
      Object.assign(outputGlobals, {
        fjl: 'fjl',
        'fjl-validator': 'fjlValidator'
      });
    }

    return [{
      ...configBase,
      output: {
        format: 'es',
        dir: path.join(projectPath, 'dist/esm/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true,
        globals: outputGlobals
      },
      plugins: [
        typescript({
          tsconfig: path.join(projectPath, './tsconfig.prod.esm.json'),
        }),
        terser()
      ]
    }, {
      ...configBase,
      output: {
        format: 'es',
        file: path.join(projectPath, 'dist/index.esm.min.js'),
        sourcemap: true,
        globals: outputGlobals
      },
      plugins: [
        typescript({
          tsconfig: path.join(projectPath, './tsconfig.prod.esm.json'),
          compilerOptions: {
            declaration: false,
            declarationDir: null
          }
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
        sourcemap: true,
        globals: outputGlobals
      },
      plugins
    }, {
      ...configBase,
      output: {
        format: 'cjs',
        dir: path.join(projectPath, 'dist/cjs/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
        sourcemap: true,
        globals: outputGlobals
      },
      plugins
    }, {
      ...configBase,
      output: {
        format: 'umd',
        file: path.join(projectPath, 'dist/index.umd.min.js'),
        sourcemap: true,
        name: iifeName,
        globals: outputGlobals
      },
      plugins
    }, {
      ...configBase,
      output: {
        format: 'iife',
        file: path.join(projectPath, 'dist/index.iife.min.js'),
        sourcemap: true,
        name: iifeName,
        globals: outputGlobals
      },
      plugins
    }];
  });

export default configs;
