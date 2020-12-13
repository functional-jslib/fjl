/**
 * Clears a package's 'dist' folder and runs it's `build:all` 'npm' script.
 * @script node-scripts/tasks/build-package.js
 */

const

  path = require('path'),

  del = require('del'),

  {log, error} = console,

  {ioExec, ioFileExists} = require('../../node-scripts/utils'),

  packageNameRegex = /^[a-z][a-z-\d]{2,55}$/i

;

(async () => {
  log('Running with: ', process.argv.join(',\n'), '\n');

  const packageName = process.argv[2];

  if (!packageName || packageName.length > 55 || !packageNameRegex.test(packageName)) {
    throw new Error(`Package name doesn't match \`${packageNameRegex.toString()}\`.`);
  }

  const packagePath = path.join(__dirname, '../../packages', packageName),
    distPath = path.join(packagePath, 'dist');

  // Run process
  return await
    // Check for package existence
    ioFileExists(packagePath)
      .catch(err => log(`Unable to access ${packagePath}.\n${err}`))

      // Clear 'dist'
      .then(() => del(distPath))
      .then(files => {
        if (files && files.length)
          log(`Files cleaned:\n${files.join(',\n')}\n`);
        else log('No files to clean.');
      })

      // `npm install`
      .then(() => ioExec('npm i', {cwd: packagePath}))

      // Run `build:all`
      .then(() => ioExec('npm run build:all', {cwd: packagePath}))
      .catch(error)
})()
