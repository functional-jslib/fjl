const

  path = require('path'),

  del = require('del'),

  {log, error} = console,

  {ioExec} = require('../../node-scripts/utils')

;

(async () => {
  log('Linking packages ...\n');
  return await [
    ['fjl'],
    ['fjl-validator', 'fjl'],
  ]
    .reduce((p, [packageName, packagesToLink]) => {
        const cwd = path.join(__dirname, `../../packages/${packageName}`);
        return p.then(async () => {
          if (!packagesToLink) {
            return;
          }
          log(`---------------------------\n\nLinking packages to ${packageName} ...`);
          return ioExec(`npm link ${packagesToLink}`, {cwd})
        })
          .then(async () => {
            log(`---------------------------\n\nLinking ${packageName} ...`);
            return ioExec('npm link .', {cwd})
          })
      },
      Promise.resolve()
    )
    .then(() => log('---------------------------\n\nScript completed successfully.\n'));
})();
