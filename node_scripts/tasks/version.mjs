/**
 * Helpers for the `preversion`/`postversion` lifecycle hooks declared by each releasable package.
 *
 * `npm version` (which `pnpm version` delegates to, as of pnpm 8.13.1) only performs its git work
 * when a `.git` entry sits directly in the directory it is invoked from - see `@npmcli/git`'s `is()`,
 * which stats `cwd + '/.git'` and never walks upwards.  In this monorepo the only `.git` lives at the
 * repo root, so running `pnpm version <bump>` inside `packages/<name>` bumps `package.json` and runs
 * the three lifecycle scripts, but silently skips its "working tree is clean" guard, the release
 * commit, and the tag.  These two subcommands put those steps back.
 *
 * Usage (from within a package directory):
 *
 *   node ../../node_scripts/tasks/version.mjs precheck [--force]
 *   node ../../node_scripts/tasks/version.mjs commit-and-tag
 */
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const {log, error} = console,

  git = (...args) => execFileSync('git', args, {encoding: 'utf8'}).trim(),

  readPkg = () => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')),

  /**
   * Tag/commit name for a release, e.g. `fjl@2.0.0-alpha.6`.
   *
   * Package-qualified rather than npm's default bare `v<version>` because sibling packages here
   * collide otherwise (`fjl-inputfilter` and `fjl-validator-recaptcha` both sit at `1.3.0`).
   */
  releaseId = pkg => `${pkg.name}@${pkg.version}`,

  /**
   * Stand-in for npm's own `enforceClean` step, which is skipped in package sub-directories.
   */
  precheck = force => {
    const dirty = git('status', '--porcelain');

    if (!dirty) return;

    if (force) {
      log(`Working tree is not clean; continuing anyway (--force):\n${dirty}\n`);
      return;
    }

    throw new Error(
      'Git working tree is not clean - commit or stash before bumping a version ' +
      `(pass --force to override):\n${dirty}`
    );
  },

  /**
   * Creates the release commit and annotated tag that `npm version` would normally have created.
   */
  commitAndTag = () => {
    const pkg = readPkg(),
      id = releaseId(pkg);

    if (git('tag', '--list', id)) {
      throw new Error(`Tag "${id}" already exists - refusing to overwrite it.`);
    }

    git('add', '--', 'package.json');
    git('commit', '-m', `chore(release): ${id}`);
    git('tag', '-a', id, '-m', id);

    log(
      `\nCreated release commit and tag "${id}".\n\n` +
      'Next steps:\n' +
      '  1. git push --follow-tags\n' +
      `  2. Create a GitHub Release for tag "${id}" - that is what triggers ` +
      '.github/workflows/publish.yml.\n'
    );
  }
;

const [, , subcommand, ...rest] = process.argv;

try {
  switch (subcommand) {
    case 'precheck':
      precheck(rest.includes('--force'));
      break;
    case 'commit-and-tag':
      commitAndTag();
      break;
    default:
      throw new Error(
        `Unknown subcommand "${subcommand ?? ''}" - expected "precheck" or "commit-and-tag".`
      );
  }
} catch (err) {
  error(err instanceof Error ? err.message : err);
  process.exitCode = 1;
}
