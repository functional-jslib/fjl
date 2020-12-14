const

  path = require('path'),

  {log} = console,

  {ioExec} = require('../../node-scripts/utils')

;

(async () => {
  log('Linking packages ...\n');
  return await [
    'fjl',
    'fjl-validator',
    // 'fjl-filter',
    // 'fjl-inputfilter',
  ]
    .reduce((p, packageName) => {
        const cwd = path.join(__dirname, `../../packages/${packageName}`);
        return p.then(async () => {
          log(`---------------------------\n\nLinking ${packageName} ...`);
          return ioExec('npm link .', {cwd})
        })
          .then(async () => {
            log(`---------------------------\n\nLinking ${packageName} to main project ...`);
            return ioExec(`npm link ${packageName}`, {cwd: path.join(__dirname, '../../')});
          })
      },
      Promise.resolve()
    )
    .then(() => log('---------------------------\n\nScript completed successfully.\n'));
})();
