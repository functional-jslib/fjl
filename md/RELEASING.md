# Releasing

How versions get bumped, tagged, and published in this monorepo.

## TL;DR

```shell
cd packages/fjl                       # or fjl-validator, fjl-inputfilter
pnpm version prerelease --preid alpha # or patch | minor | major
git push --follow-tags
```

Then create a GitHub Release for the new tag - that, and only that, publishes to
npm.

## The `version` lifecycle

Each releasable package declares npm's three version lifecycle hooks. `pnpm`
8.13.1 (the pinned `packageManager`) does not implement `version` itself - it
shells out to `npm version` - so the hooks behave exactly as npm documents them:

| Hook          | Runs                                              | When                                          |
| ------------- | ------------------------------------------------- | --------------------------------------------- |
| `preversion`  | clean-tree check, then that package's test suite  | before `version` in `package.json` is touched |
| `version`     | `pnpm -w run build`                               | after the bump, before the commit is created  |
| `postversion` | the release commit and annotated tag              | after `package.json` has been written         |

For `packages/fjl`:

```json
{
  "scripts": {
    "preversion": "node ../../node_scripts/tasks/version.mjs precheck && pnpm -w run test:fjl",
    "version": "pnpm -w run build",
    "postversion": "node ../../node_scripts/tasks/version.mjs commit-and-tag"
  }
}
```

`fjl-validator` and `fjl-inputfilter` are identical apart from their
`preversion` test target (`test:fjl-validator`, `test:fjl-inputfilter`).

### Why not the hooks from npm's docs verbatim

npm's canonical example is `"preversion": "npm test"`, `"version": "npm run
build && git add -A dist"`, `"postversion": "git push && git push --tags && rm
-rf build/temp"`. None of those three lines survives contact with this repo:

- **There is no per-package `npm test` or `npm run build`.** Jest is configured
  once at the repo root (`jest.config.mjs`) as a multi-project runner, and
  rollup likewise (`rollup.config.mjs`), building every package in one pass. The
  hooks therefore call back into the root with `pnpm -w run <script>` instead of
  pretending each package owns a toolchain.
- **`git add -A dist` would stage nothing.** `**/dist` is in `.gitignore`; build
  output is never committed and is rebuilt by CI on every publish. The `version`
  hook still runs the build, but purely as a *gate* - the bump aborts if the
  package no longer compiles.
- **`rm -rf build/temp` has no analogue.** There is no `build/temp`, and
  `rollup.config.mjs` already cleans each `packages/*/dist/` before writing.

### Why `postversion` does the committing and tagging

This is the non-obvious part. `npm version` only performs its git work when a
`.git` entry sits *directly* in the directory it was invoked from -
`@npmcli/git`'s `is()` stats `cwd + '/.git'` and never walks up the tree. In
this monorepo the only `.git` lives at the repo root, so running `pnpm version`
inside `packages/<name>`:

- bumps `package.json` ✅
- runs all three lifecycle hooks ✅
- silently skips its "working tree is clean" guard ❌
- silently skips the release commit and the tag ❌

(Running it from the root instead does not help: `npm version --workspace <pkg>`
hard-codes `git-tag-version: false` in `lib/commands/version.js`.)

`node_scripts/tasks/version.mjs` restores the two missing steps:

- `precheck` - refuses to bump when `git status --porcelain` is non-empty, which
  is what npm's own `enforceClean` would have done. `--force` overrides.
- `commit-and-tag` - creates `chore(release): <name>@<version>` and an annotated
  tag of the same name, refusing to clobber an existing tag.

Tags are **package-qualified** (`fjl@2.0.0-alpha.6`), not npm's default bare
`v<version>`, because sibling packages collide otherwise - `fjl-inputfilter` and
`fjl-validator-recaptcha` are both sitting at `1.3.0` today. Note that npm still
prints its own `v<version>` line when the command finishes; that string is
cosmetic, the tag that was actually created is the one `commit-and-tag` reports.

Pushing is deliberately **not** automated. Publishing needs a manual GitHub
Release regardless (see below), the repo's `pre-push` hook runs the full
`pnpm test && pnpm build`, and coordinated multi-package bumps are better pushed
once at the end. `commit-and-tag` prints the exact `git push --follow-tags` to
run.

## Publishing

Bumping a version does not publish. `.github/workflows/publish.yml` is triggered
by `release: [created]` - a GitHub Release. Pushing a tag on its own does not
create a Release, so the version flow above is safe to run at any time.

To publish `fjl`:

1. Bump and push as in the TL;DR.
2. Create a GitHub Release pointing at the new tag.
3. `publish.yml` installs, builds, and runs `npm publish` from `packages/fjl`.

`fjl-validator` and `fjl-inputfilter` are not covered by that workflow yet - it
only publishes `packages/fjl`. Until it is extended, publish them by hand once
the version commit is pushed:

```shell
pnpm -w run build
cd packages/fjl-validator && npm publish
```

## Packages without version scripts

| Package                   | Why                                                                                                                                                                                                       |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fjl-validator-recaptcha` | Its rollup target and its jest project are both commented out (`rollup.config.mjs`, `jest.config.mjs`), so there is currently neither a build nor a runnable suite to gate a release on.                     |
| `fjl-filter`              | Absent from the root `package.json` `workspaces` array and from both the rollup and jest configs, and its `main`/`module` point at a `fjl-input.js` bundle that nothing produces. Dormant.                   |
| `fjl-labs`                | Listed in `pnpm-workspace.yaml` but has no `package.json` at all - sources only, so there is nothing to version or publish.                                                                                  |

To revive any of them: re-enable it in `rollup.config.mjs` and `jest.config.mjs`,
add the matching root-level `test:<name>` script, and only then add the three
hooks.

## Notes

- Run `pnpm version` from *inside* the package directory. At the root it would
  bump `fjl-monorepo`, which is `private: true` and pinned at `0.0.0` on purpose.
- `--no-git-tag-version` does **not** skip the commit and tag here, since the
  hooks - not npm - are what create them. For a bare bump with no gates, no
  commit, and no tag, go around pnpm (which rejects the flag) and call npm
  directly: `npm version <bump> --ignore-scripts --no-git-tag-version`.
- `fjl` is on a prerelease line (`2.0.0-alpha.N`); advance it with
  `pnpm version prerelease --preid alpha`.
- Tags predating the monorepo layout are bare (`2.0.0-alpha.5`, `1.12.13`, ...)
  and all belong to `fjl`. New tags are package-qualified.
- Cross-package `peerDependencies` ranges (e.g. `fjl-inputfilter` requiring
  `fjl-validator: ^0.8.0`) are **not** updated automatically - check them by hand
  when bumping a minor or major.
