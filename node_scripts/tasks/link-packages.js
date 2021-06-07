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
        ['fjl'],
        ['fjl-validator', 'fjl'],
        // 'fjl-filter',
        ['fjl-inputfilter', 'fjl', 'fjl-validator'],
      ]
        .reduce((p, [packageName, ...packagesToLink]) => {
            const cwd = path.join(repoRoot, `packages/${packageName}`);
            // return
              // .then(() => {
              //   if (packagesToLink.length) {
              //     log(`Linking subpackages: ${packagesToLink.join(', ')}`);
              //     return Promise.all(
              //       packagesToLink.map(subPackageName =>
              //         ioSpawn(npmCmd, ['link', subPackageName], {cwd})
              //       ));
              //   }
              // })
              return p.then(() => {
                log(`${taskGroupSeparator}Linking ${packageName} ...`);
                return ioSpawn(npmCmd, ['link'], {cwd});
              })
              .then(() => {
                log(`${taskGroupSeparator}Linking ${packageName} to main project ...`);
                return ioSpawn(npmCmd, ['link', packageName], {cwd: repoRoot});
              });
          },
          Promise.resolve()
        )
        .then(() => log(taskGroupSeparator + 'Script completed successfully.\n'))
        .catch(error)
    ))();
