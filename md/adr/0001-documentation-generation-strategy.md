# ADR 0001 — Documentation generation strategy

- **Status:** Accepted
- **Date:** 2026-07-31
- **Issue:** [#102 — CI/CD: Choose documentation generating strategy](https://github.com/functional-jslib/fjl/issues/102)
- **Decision:** Generate the API reference with **TypeDoc**, from TypeScript
  sources, into a gitignored `docs-dist/`, and publish it to GitHub Pages from a
  `Release`-triggered workflow.

## Context

`fjl` is a pnpm-8 workspace monorepo with six packages, four of which are
published to npm and have a `src/index.ts`:

| package | published | built by `rollup.config.mjs` | has `src/index.ts` |
| --- | --- | --- | --- |
| `fjl` | yes | yes | yes |
| `fjl-validator` | yes | yes | yes |
| `fjl-inputfilter` | yes | yes | yes |
| `fjl-validator-recaptcha` | yes | **no** (commented out of `projectNames`) | yes |
| `fjl-filter` | no | no | no |
| `fjl-labs` | no | no | no |

The sources are TypeScript 5.4 and carry TSDoc-style block comments in 158 of
175 `.ts` files under `packages/fjl/src/`. The toolchain is Node-only
(rollup 2, jest/ts-jest, eslint 8), CI runs Node 18/20/22 on `ubuntu-latest`,
and releases go out from `.github/workflows/publish.yml` on the
`release: [created]` event.

Issue #102 proposed Deno as the initial recommendation. There is already a
`deno.json` at the repository root, and an untracked `docs/` directory dated
2024-05-28 containing `all_symbols.html`, `fuse.js`, `search_index.js`,
`styles.css` — the unmistakable output signature of `deno doc --html`. So the
Deno path was not only proposed, it was tried.

### The existing `docs/` output is empty

The single most important finding of this analysis. The committed-to-disk
artifact of the previous `deno doc` run contains:

```js
// docs/search_index.js  (2024-05-28)
(function () {
  window.DENO_DOC_SEARCH_INDEX = {"nodes":[]};
})()
```

```html
<!-- docs/all_symbols.html -->
<main><div class="space-y-7" id=""></div></main>
```

Zero symbols. The tool exited successfully and produced a complete-looking
eight-file site that documents nothing. Reproduced today with Deno 2.4.2:

```console
$ deno doc --html --name=fjl --output=./deno-out packages/fjl/src/index.ts
Written 13 files to "./deno-out"

$ grep -o '"name":"[^"]*"' ./deno-out/search_index.js | wc -l
0
```

The cause is that `fjl` uses extensionless relative imports throughout
(`import {reduce} from "../list/utils"`), which Deno's resolver rejects. The
failure is silent: `deno doc` reports success and emits an empty site. The
maintainer's own scaffolding note on `origin/feat/#55/deno_support`
(`node_scripts/tasks/fjl-deno.json.mjs`, commit `ad4076b5`) confirms this was
the known blocker — it is a stub whose entire body is a comment describing an
unwritten script to synthesize `deno.json.imports` entries so that
"all source imports work as they are (without file extensions)".

## Options considered

All three were run against this working tree, not evaluated from documentation.

### 1. `deno doc --html`

Works only with `--unstable-sloppy-imports`, which makes Deno tolerate the
extensionless imports:

```console
$ deno doc --unstable-sloppy-imports --html --name=fjl \
    --output=./deno-sloppy packages/fjl/src/index.ts
Written 465 files to "./deno-sloppy"

$ grep -o '"name":"[^"]*"' ./deno-sloppy/search_index.js | wc -l
452
```

That fixes the single-package case. The multi-package case does not work at
all:

```console
$ deno doc --unstable-sloppy-imports --html --name=fjl --output=./deno-multi \
    packages/fjl/src/index.ts packages/fjl-validator/src/index.ts \
    packages/fjl-inputfilter/src/index.ts \
    packages/fjl-validator-recaptcha/src/index.ts

Warning Relative import path "querystring" not prefixed with / or ./ or ../
  hint: If you want to use a built-in Node module, add a "node:" prefix.
    at .../packages/fjl-validator-recaptcha/src/index.ts:10:25
Warning Relative import path "https" not prefixed with / or ./ or ../
    at .../packages/fjl-validator-recaptcha/src/index.ts:9:19
error: Failed resolving 'https' from '.../fjl-validator-recaptcha/src/index.ts'
```

Hard failure, no output. `fjl-validator-recaptcha` imports the Node builtins
`https` and `querystring` without the `node:` prefix Deno requires.

Beyond the resolution problems, `deno doc` has no concept of packages: multiple
entry points are flattened into one namespace, so a four-package monorepo would
render as one undifferentiated symbol list. And adopting it puts a second
language runtime in the release pipeline for the sole purpose of rendering docs.

Adopting Deno would require: prefixing Node builtins with `node:` across
`fjl-validator-recaptcha`, permanently depending on an unstable Deno flag (or
writing and maintaining the import-map generator that #55 left as a stub),
accepting a flat single-namespace site, and installing Deno in CI.

### 2. TypeDoc

Ran clean on all four published packages on the first attempt, from sources,
with no prior build and no warnings:

```console
$ pnpm run docs

> fjl-monorepo@0.0.0 docs /home/edlc/workspace/functional-jslib/fjl
> typedoc

info Documentation generated at ./docs-dist

real    0m2.011s
```

(Use `pnpm run docs`, not bare `pnpm docs` — pnpm forwards unrecognized
commands to npm, and `npm docs` is a real command that opens a package homepage,
so `pnpm docs` silently exits 0 without generating anything.)

502 files: four `modules/` pages (`fjl`, `fjlValidator`, `fjlInputFilter`,
`fjlValidatorReCaptcha`) and 489 symbol pages — 386 functions, 70 types,
18 interfaces, 11 variables, 2 classes, 2 enums.
It reads the existing TSDoc comments, resolves cross-package imports (via
`paths` in `tsconfig.docs.json`, so no build step is needed), renders `$`-prefixed
curried variants with their real names, and links every symbol back to its
source line on GitHub.

It reuses the toolchain that is already installed — it is a devDependency
resolved by the same `pnpm i` CI already runs, and it consumes the same
TypeScript 5.4 the build and tests use.

### 3. api-extractor + api-documenter

Also run for real, against `packages/fjl/dist/esm/index.d.ts` after a full
`pnpm build`:

```console
$ pnpm dlx @microsoft/api-extractor@7 run --local --config ./api-extractor.probe.json
Warning: dist/esm/types/arity.d.ts:9:1 - (ae-missing-release-tag) "UnitNary" is
  part of the package's API, but it is missing a release tag (@alpha, @beta,
  @public, or @internal)
  ... 415 more ...
API Extractor completed successfully

$ ls -la ./ae-out/
-rw-r--r-- 832137 fjl.api.json
```

It works, but the cost is disproportionate:

- **416 `ae-missing-release-tag` warnings for `fjl` alone.** Silencing them
  means annotating every exported symbol with `@public`/`@beta`; suppressing
  them means the release-tag machinery — api-extractor's main reason to exist —
  is switched off.
- **It requires a build.** It reads `.d.ts`, so `pnpm build` must run first.
  `fjl-validator-recaptcha` is commented out of `rollup.config.mjs`, so the
  fourth published package cannot be documented at all without first fixing the
  build.
- **It does not render a site.** The output is `fjl.api.json`; rendering needs
  api-documenter (Markdown only) plus a static-site generator — a three-stage
  pipeline, one config file per package, no cross-package linking.

api-extractor's real value is API-surface review and `.d.ts` rollup — release
gating, not reference docs. That is a legitimate future need for this repo
(see follow-ups), but it is a different problem from #102.

## Comparison

| | `deno doc` | **TypeDoc** | api-extractor + api-documenter |
| --- | --- | --- | --- |
| Documents all 4 published packages | **no** — hard error on `fjl-validator-recaptcha` | **yes** | needs 1 config/package; `fjl-validator-recaptcha` impossible (not built) |
| Symbols extracted (single run) | 452 (`fjl` only, with unstable flag) | **489** across 4 packages | 416+ (`fjl` only, as JSON) |
| Reads existing TSDoc comments | partial | partial (same limitation, see below) | yes |
| Reads sources directly | yes | **yes** | no — requires `pnpm build` first |
| Renders a browsable site | yes | **yes** | no — JSON → Markdown → SSG |
| Multi-package structure | flat, single namespace | **one module per package** | one isolated JSON per package |
| Extra toolchain in CI | **Deno runtime** | none — a devDependency | none, but 3 tools |
| Unstable flags required | `--unstable-sloppy-imports` | none | none |
| Warnings on this codebase | resolution warnings | **0** | 416 |
| Wall time | sub-second (`fjl` only) | ~2s (all 4) | ~30s + full build |
| Source changes required first | `node:` prefixes; import map | **none** | 416 release-tag annotations |

## Decision

**TypeDoc.**

The deciding reasons, in order:

1. **It is the only option that documents all four published packages.**
   `deno doc` errors out on `fjl-validator-recaptcha`; api-extractor cannot see
   it because rollup does not build it.
2. **It needs no source changes to work today.** The other two both require
   editing library sources before they produce anything — `node:` prefixes and
   an import map for Deno, 416 release-tag annotations for api-extractor.
3. **It reads sources, not build output**, so `pnpm docs` is independent of
   `pnpm build` and cannot publish docs for a stale `dist/`.
4. **It adds no new runtime to CI.** It is a devDependency installed by the
   `pnpm i` the release workflow already runs; Deno would be a second language
   toolchain maintained solely for docs.
5. **It models the monorepo.** Four `modules/` entries, cross-linked, versus one
   flat namespace.

The empirical record also matters: the Deno path was attempted here in May 2024
and shipped an empty site that nobody noticed for two years. That is not an
argument that Deno is a bad tool — it is an argument that this codebase's import
style and Deno's resolver are a poor fit, and that the failure mode is silent.

### Known limitation, shared by all candidates

Neither TypeDoc nor `deno doc` attaches a doc comment that sits *inside* a
multi-declarator `export const` list:

```ts
export const

  /**
   * Filters given slice ... using given predicate (`pred`).
   */
  filter = <T>(pred: TernaryPred<T, number, T[]>, xs: T[]): T[] => { /* ... */ },
```

115 files use this shape, and their descriptions are dropped by both tools.
The classic placement works everywhere:

```ts
/**
 * Maps a function over an objects own key, and values.
 */
export const mapObj = <T extends object>(fn: MapOp, obj: T): T => /* ... */
```

This is a source-comment-placement problem, not a tool-selection one — it costs
the same under either renderer, so it does not discriminate between the options.
Filed as a follow-up.

## Consequences

- `typedoc` is added as a root devDependency; `typedoc.json` and
  `tsconfig.docs.json` are added at the root; `pnpm run docs` builds the site.
- Output goes to **`docs-dist/`**, gitignored and eslint-ignored. It
  deliberately does *not* reuse the legacy `docs/` path, which still holds the
  2024 `deno doc` output on the maintainer's checkout.
- `.github/workflows/docs.yml` builds and deploys `docs-dist/` to GitHub Pages
  on `release: [created]`, matching the trigger `publish.yml` already uses, plus
  a `workflow_dispatch` for manual runs.
- Docs regeneration is decoupled from `pnpm build`, so a docs failure cannot
  break a release build and vice versa.
- GitHub Pages must be switched to the "GitHub Actions" source once, by hand,
  before the workflow can deploy. Until then the workflow builds and uploads the
  artifact and the deploy step fails loudly.

## Follow-ups

1. **Delete the legacy `docs/` directory.** It is `deno doc` output from
   2024-05-28 containing zero symbols, matched by the `**/docs` line in
   `.gitignore` (so it is untracked), and its vendored `fuse.js` / `script.js` /
   `search.js` are the source of most of the repo's eslint errors. Not removed
   in this change, deliberately.
2. **Normalize doc-comment placement** in the 115 files that put `/** */` inside
   a multi-declarator `export const`, so the prose actually reaches the site.
3. **Add `node:` prefixes** to `https` / `querystring` in
   `packages/fjl-validator-recaptcha/src/index.ts`. Correct regardless of the
   docs decision, and it unblocks Deno consumers.
4. **Re-enable `fjl-validator-recaptcha` in `rollup.config.mjs`** — it is
   published but not built.
5. **Reconsider api-extractor for API-surface review**, separately from docs:
   `.d.ts` rollup and a reviewed `.api.md` report would catch accidental
   breaking changes at release time.
