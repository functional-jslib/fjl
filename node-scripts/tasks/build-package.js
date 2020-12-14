/**
 * Clears a package's 'dist' folder and runs it's `build:all` 'npm' script.
 * @script node-scripts/tasks/build-package.js
 */

const {log, error} = console,

  {buildPackage} = require('../utils')

;

(async () => {
  log('Running with: ', process.argv.join(',\n'), '\n');
  const packageName = process.argv[2];
  return await buildPackage(packageName);
})();
