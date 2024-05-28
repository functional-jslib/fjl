import fs from 'node:fs/promises';
import path from 'node:path';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const

  __dirname = path.dirname(new URL(import.meta.url).pathname),

  {log, error, warn} = console,

  isDev = !process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase().startsWith('dev'),

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
      outputGlobals = {},
      outputBase = {
        sourcemap: isDev,
        globals: outputGlobals
      };

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
        ...outputBase,
        format: 'es',
        dir: path.join(projectPath, 'dist/esm/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
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
        ...outputBase,
        format: 'es',
        file: path.join(projectPath, 'dist/index.esm.min.js'),
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
        ...outputBase,
        format: 'cjs',
        dir: path.join(projectPath, 'dist/cjs/'),
        preserveModules: true,
        preserveModulesRoot: path.join(projectPath, 'src'),
      },
      plugins
    }, {
      ...configBase,
      output: {
        ...outputBase,
        format: 'iife',
        file: path.join(projectPath, 'dist/index.iife.min.js'),
        name: iifeName,
      },
      plugins
    }];
  });

// Clean project distro paths
// ----
log('Cleaning dist paths:');
await Promise.all(projectNames.map(projectName => {
  const distPath = path.join(__dirname, `./packages/${projectName}/dist/`);

  log(`\n- ./packages/${projectName}/dist/`);

  // Delete files in 'dist/' paths for each project
  return fs.readdir(distPath)
    .then(files => files.map(file => {
      const filePath = path.join(distPath, file);
      const projectPath = `./${filePath.split(__dirname)[1]}`;
      return fs.rm(filePath, {recursive: true})
        .then(() => null, // (log(`${projectPath} removed`), filePath),
          () => log(`Skipping removal of ${projectPath}`))
    }))
    .then(removals => Promise.all(removals))
}))
  .then(() => log('\nCleaning completed.'))
  .catch(error);

export default configs;
