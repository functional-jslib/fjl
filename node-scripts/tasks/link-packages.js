const

  path = require('path'),

  {log} = console,

  {ioExec} = require('../../node-scripts/utils')

;

(async () => {
  log('Linking packages ...\n');
  return await [
    ['fjl'],
    ['fjl-validator', 'fjl'],
    ['fjl-inputfilter', 'fjl fjl-validator'],
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
