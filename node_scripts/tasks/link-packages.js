const

  path = require('path'),

  {log, error} = console,

  {ioSpawn, npmCmd} = require('../utils'),

  repoRoot = path.join(__dirname, '../../'),

  taskGroupSeparator = '---------------------------\n\n'

;

(async () =>
  Promise.resolve()
    .then(() => ioSpawn(npmCmd, ['i'], {cwd: repoRoot}))
    .then(() => log('Building packages\n'))
    .then(() => ioSpawn(npmCmd, ['run', 'build'], {cwd: repoRoot}))
    .then(() => log('Linking packages\n'))
    .then(() => [
        'fjl',
        'fjl-validator',
        // 'fjl-filter',
        // 'fjl-inputfilter',
      ]
        .reduce((p, packageName) => {
            const cwd = path.join(repoRoot, `packages/${packageName}`);
            return p.then(async () => {
              log(`${taskGroupSeparator}Linking ${packageName} ...`);
              return ioSpawn(npmCmd, ['link', '.'], {cwd});
            })
              .then(async () => {
                log(`${taskGroupSeparator}Linking ${packageName} to main project ...`);
                return ioSpawn(npmCmd, ['link', packageName], {cwd: repoRoot});
              });
          },
          Promise.resolve()
        )
        .then(() => log(taskGroupSeparator + 'Script completed successfully.\n'))
        .catch(error)
    ))();
