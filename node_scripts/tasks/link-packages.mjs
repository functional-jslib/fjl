import path from "node:path";
import {ioSpawn} from '../utils/index.mjs';


const {log, error} = console,

  __dirname = path.dirname(new URL(import.meta.url).pathname),

  repoRoot = path.join(__dirname, '../../'),

  taskGroupSeparator = '---------------------------\n\n'
;

/**
 * @return {Promise<void>}
 */
(async () => Promise.resolve()
    .then(() => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? ioSpawn('pnpm', ['i'], {cwd: repoRoot}) : void 0)
    .then(() => log('Linking packages\n'))
    .then(() => [
        ['fjl'],
        ['fjl-validator', 'fjl'],
        // 'fjl-filter',
        ['fjl-inputfilter', 'fjl', 'fjl-validator'],
      ]
        .reduce((p, [packageName/*, ...packagesToLink*/]) => {
            const cwd = path.join(repoRoot, `packages/${packageName}`);
            // return
            // .then(() => {
            //   if (packagesToLink.length) {
            //     log(`Linking subpackages: ${packagesToLink.join(', ')}`);
            //     return Promise.all(
            //       packagesToLink.map(subPackageName =>
            //         ioSpawn('pnpm', ['link', subPackageName], {cwd})
            //       ));
            //   }
            // })
            return p.then(() => {
              log(`${taskGroupSeparator}Linking ${packageName} ...`);
              return ioSpawn('pnpm', ['link', '.'], {cwd});
            })
              .then(() => {
                log(`${taskGroupSeparator}Linking ${packageName} to main project ...`);
                return ioSpawn('pnpm', ['link', packageName], {cwd: repoRoot});
              })
              .catch(error);
          },
          Promise.resolve()
        )
        .then(() => log(taskGroupSeparator + 'Script completed successfully.\n'))
    )
    .then(() => log('Building packages\n'))
    .then(() => ioSpawn('pnpm', ['run', 'build'], {cwd: repoRoot}))
)();
