# Audit of the 2024 "done" batch

> **Status: findings only — nothing has been actioned.** No GitHub issue was
> reopened, closed, commented on, or relabeled, and no source file was changed.
> Every recommended mutation is listed, with its exact `gh` command, in
> [Recommended actions](#recommended-actions).

This resolves the verification half of #125. Two issues closed in the Feb–May
2024 push were already known to be materially undone (#75, #77), and the premise
of #125 is that two independent mis-ticks in one batch is a pattern rather than
an accident. This pass re-verifies **all 24 issues** closed in
`functional-jslib/fjl` between `2024-02-09` and `2024-06-01`, plus the one
unnumbered item in #57's "Done" list (`tsconfig.prod.esm.json` consolidation),
against the working tree.

Every claim below was verified against the tree at `61a9632d`
("Merge pull request #127 from functional-jslib/chore/issue-worktree-fleet-skill")
by reading the code, not the issue text. Issue bodies were used only to
establish what was claimed. Where an issue's acceptance criteria were ticked but
the code does not support them, the contradiction is called out with a file and
line.

Baseline measurements taken in the same tree: `pnpm test` → 133 suites,
1066 tests, all passing; `pnpm build` → exit 0, no rollup warnings;
`pnpm lint` → 0 errors, 62 warnings (all `no-unused-vars`, in `packages/fjl/tests/`
and `packages/fjl-labs/`).

Net result: **14 HOLDS, 6 PARTIAL, 3 NOT DONE, 1 unverifiable.** The pattern
#125 suspected is real but narrower than feared — every build/tooling closure in
the batch holds, and the failures cluster entirely in *library-surface* work
(type replacement, method consolidation, test layout).

## Contents

- [Verdict table](#verdict-table)
- [What the failures have in common](#what-the-failures-have-in-common)
- [Not done](#not-done)
- [Partial](#partial)
- [Holds](#holds)
- [Unverifiable](#unverifiable)
- [Incidental defect found during the audit](#incidental-defect-found-during-the-audit)
- [Proposed correction to #57](#proposed-correction-to-57)
- [Recommended actions](#recommended-actions)

## Verdict table

| Issue | Title (abbreviated) | Closed | Verdict | Already tracked? |
| --- | --- | --- | --- | --- |
| #40 | Remove `curry_` from tests and test helpers | 2024-02-10 | **HOLDS** | — |
| #43 | Replace `Slice` type with `Iterable` type | 2024-05-27 | **NOT DONE** | Yes — #114 (under #32) |
| #74 | Drop es5 support | 2024-05-28 | **HOLDS** | — |
| #75 | `iterate`/`repeat`/`replicate`/`cycle` → generators | 2024-02-15 | **PARTIAL** | Partly — #121 |
| #77 | Move tests near the member call sites | 2024-02-26 | **NOT DONE** | No |
| #79 | Consolidate set-theory methods into one set | 2024-02-10 | **PARTIAL** | No |
| #80 | Boolean-returning methods should not be flipped | 2024-02-09 | **HOLDS** | — |
| #81 | `concat`/`append` should just be native `concat` | 2024-05-27 | **PARTIAL** | No |
| #82 | Pre-commit / commit-msg / pre-push hooks | 2024-05-28 | **HOLDS** | — |
| #83 | `find*`/`reduce*` utils should be the real impls | 2024-03-01 | **NOT DONE** | No |
| #86 | Remove `curry_` module use in tests | 2024-02-10 | **HOLDS** | — |
| #87 | `take`/`takeWhile` etc. should work with generators | 2024-02-26 | **HOLDS** | — |
| #89 | Add `numRange` and `charRange` | 2024-05-27 | **PARTIAL** | No |
| #90 | Remove nullish checks in library methods | 2024-02-27 | **PARTIAL** | Partly — #122 |
| #91 | Rename `platform/` → `_platform/` | 2024-02-25 | **HOLDS** | — |
| #94 | Re-add `apply` | 2024-02-27 | **HOLDS** | — |
| #96 | Deprecate `isset` and replace its uses | 2024-02-27 | **HOLDS** | — |
| #97 | fjl-labs — correct imports in members | 2024-05-29 | **PARTIAL** | No |
| #104 | Drop `amd`/`umd`/`iife` output formats | 2024-05-28 | **HOLDS** | — |
| #105 | Add `dist/` clean step before builds | 2024-05-28 | **HOLDS** | — |
| #107 | All scripts use `*.ts` or `*.mjs` | 2024-05-29 | **HOLDS** | — |
| #108 | Update `.npmignore`/`.eslintignore` dot/ci entries | 2024-05-29 | **unverifiable** | — |
| #109 | Conditional sourcemaps | 2024-05-29 | **HOLDS** | — |
| #115 | Remove `unknown` as generic values | 2024-06-01 | **HOLDS** | — |
| — | `tsconfig.prod.esm.json` consolidation (#57 only) | — | **HOLDS** | — |

## What the failures have in common

All nine non-clean verdicts share one trait: the issue asked for a **removal or
replacement in the public library surface**, and what actually landed was an
*addition alongside* the thing that was supposed to go away.

- #43 asked to remove `Slice`. `Slice` is still defined and used by 24 files.
- #79 asked to keep only `union`/`complement`/`difference`/`intersect`. The
  `obj*` variants are still exported.
- #81 asked to make `concat` variadic. A variadic `concat` was added in
  `_platform/slice`, and the array-of-arrays `list/concat` was kept.
- #83 asked to promote `findWhere` to be `find`. `find = findWhere` was added
  and `findWhere` stayed exported.
- #77 asked to move tests to `src/`. One test moved; 124 stayed.

The clean closures, by contrast, are all *tooling* changes (#74, #82, #104,
#105, #107, #109) or *single-symbol* changes (#91, #94, #96), where "done" is
binary and there is nowhere for a half-measure to hide. That is the actual
lesson of the batch, and it is a stronger predictor than the closure date.

Two more general observations, both of which made mis-ticks easy:

1. **Three of the failing issues were closed with unticked acceptance criteria.**
   #43, #77, #79, #81 and #83 all carry `- [ ]` boxes to this day; #83 still has
   a literal `- [ ] todo` placeholder where the method list was meant to go. The
   ticks in #57 were not derived from the issues' own checklists.
2. **Two issues were closed against open-ended criteria.** #90's list is
   `` `instanceOf` `` followed by `...`, and #115's is a single sentence. An
   acceptance criterion of "..." cannot be failed, which is precisely why it
   should not have been enough to close on.

## Not done

### #43 — Replace `Slice` type with `Iterable` type

**Claimed:** remove the `Slice` type and its uses; move implementations, tests,
and consumers to `Iterable<T>`. (Both boxes are still unticked in the issue.)

**Verdict: NOT DONE.** `Slice` is alive and is a load-bearing type.

The interface is still defined at `packages/fjl/src/types/data.ts:25`, and
`SliceConstructor` at `packages/fjl/src/types/data.ts:50`. There are 72
references to `Slice` across 24 source files, two of which are in *sibling
packages*:

| Location | Files |
| --- | --- |
| `packages/fjl/src/types/` | `data.ts` (defines `Slice`, `SliceConstructor`), `list.ts:38` (defines `PredForSlice`) |
| `packages/fjl/src/_platform/` | `slice/index.ts` |
| `packages/fjl/src/list/` | `breakOnList`, `concat`, `cycle`, `dropWhileEnd`, `group`, `groupBy`, `inits`, `insertBy`, `intercalate`, `last`, `mapAccumR`, `remove`, `removeBy`, `span`, `subsequences`, `tails` |
| `packages/fjl/src/list/utils/` | `sliceCopy`, `sliceFrom`, `sliceTo` |
| **Outside `fjl`** | `packages/fjl-inputfilter/src/input.ts`, `packages/fjl-validator/src/lengthValidator.ts` |

Nothing was migrated. This is not a *new* finding — it is exactly what
[`ISSUE_GROOMING.md`](./ISSUE_GROOMING.md) recorded for #114 — but the grooming
pass attributed the outstanding work to #114 without noticing that **#43 is a
closed duplicate of it that was ticked as complete**. That is a third mis-tick
in the batch, and it went unnoticed because #43 is not referenced from #57.

**What remains:** the whole issue. **Already tracked:** yes — #114, under the
#32 epic, with the cross-package sequencing constraint already documented. #43
should be marked as superseded by #114 rather than reopened, so the work is not
tracked in two places.

### #77 — Move tests near the member call sites

**Claimed:** move tests next to their sources; consolidate per-method test files
into `index`-level ones. (Both boxes unticked.)

**Verdict: NOT DONE.** Confirmed with current counts, which differ very slightly
from the "125 of 126" figure quoted in #125 and #57 — the exact numbers are:

| Location | Test files |
| --- | --- |
| `packages/fjl/tests/` | **124** |
| `packages/fjl/src/` (co-located) | **1** — `packages/fjl/src/number/numRange.test.ts` |

(`packages/fjl/tests/` holds 125 `.ts` files in total; the 125th,
`packages/fjl/tests/helpers.ts`, is a shared fixture module, not a test.
So "125 of 126" should read **124 of 125**, or 125 of 126 if `helpers.ts` is
counted. Either way the ratio is unchanged: one file moved.)

Repo-wide, the other packages have not moved either — `fjl-validator` 6,
`fjl-inputfilter` 4, `fjl-validator-recaptcha` 1, all under `tests/`, none
co-located.

The second criterion — consolidating per-method files into `index` files — also
did not happen, and in fact runs *opposite* to the current layout:
`packages/fjl/tests/list/` alone holds 100 separate `test-*.ts` files.

**Three naming conventions are live simultaneously:**

| Convention | Count | Where |
| --- | --- | --- |
| `test-*.ts` | 118 | `packages/fjl/tests/**` |
| `index_test.ts` | 6 | `packages/fjl/tests/{boolean,errorThrowing,function,object,platform-object,string}/` |
| `*.test.ts` | 1 | `packages/fjl/src/number/numRange.test.ts` |

`jest.config.mjs:3-6` matches all three, which is why nothing ever failed and
the drift was never surfaced:

```js
const testMatch = [
    '**/(tests|src)/**/*@(.test|_test|.spec).@(ts|js)',
    '**/tests/**/test-*.@(ts|js)',
  ],
```

Note the asymmetry in that config: the `.test`/`_test`/`.spec` pattern accepts
both `tests/` and `src/`, but the `test-*` pattern accepts **only** `tests/`.
So the dominant convention (118 files) is the one that *cannot* be co-located
without also being renamed. Any future attempt at #77 has to do the rename and
the move together; that is likely why the first attempt stalled after one file.

A fourth, unmatched convention also exists: `packages/fjl-labs/data/` contains
`either_test.ts`, `maybe_test.ts`, and `monad_test.ts`. These sit in neither a
`tests/` nor a `src/` directory, so `testMatch` never sees them, and `fjl-labs`
is absent from the `projects` list at `jest.config.mjs:19-24`. **Three test
files in the repo have never been executed.** `pnpm test` reports 133 suites and
does not mention `fjl-labs` at all.

**What remains:** the entire issue. **Already tracked:** no — #77 is closed,
labeled `wishlist`, and no open issue covers test layout. #57 already carries a
note that #77 is not done, but there is nothing to action it against.

### #83 — `find*` and `reduce*` utils should just be their implementation counterparts

**Claimed:** `findIndexWhere` should *be* `findIndex`'s implementation,
`reduceRight` should *be* `foldr`, and so on — i.e. eliminate the `*Where` /
`reduce*` utility layer in favour of the front-running exported names. (Every
box unticked, including the `- [ ] todo` placeholder where the method list was
supposed to go.)

**Verdict: NOT DONE.** The aliasing was applied in the *opposite* direction to
what the issue asked for, and both layers remain publicly exported.

The utility modules are still the real implementations:

```
packages/fjl/src/list/utils/findWhere.ts:8       findWhere = (...)
packages/fjl/src/list/utils/findIndexWhere.ts    findIndexWhere
packages/fjl/src/list/utils/findIndicesWhere.ts  findIndicesWhere
packages/fjl/src/list/utils/reduce.ts            reduce
packages/fjl/src/list/utils/reduceRight.ts       reduceRight
```

and the front-running names are one-line aliases pointing *at* them:

| Front-running name | Definition |
| --- | --- |
| `find` | `packages/fjl/src/list/find.ts:10` — `find = findWhere` |
| `findIndex` | `packages/fjl/src/list/findIndex.ts:13` — `findIndex = findIndexWhere` |
| `findIndices` | `packages/fjl/src/list/findIndices.ts:7` — `findIndices = findIndicesWhere` |
| `foldl` | `packages/fjl/src/list/foldl.ts:10` — `foldl = reduce` |
| `foldr` | `packages/fjl/src/list/foldr.ts:10` — `foldr = reduceRight` |

Critically, the utility names have not been made private. `list/utils/index.ts`
re-exports all of them, and `packages/fjl/src/list/index.ts:104` does
`export * from './utils'`, which `packages/fjl/src/index.ts` re-exports in turn.
So `fjl` currently ships **both** `find` and `findWhere`, **both** `foldr` and
`reduceRight`, plus `findIndexWhereRight`, `reduceUntil`, and
`reduceUntilRight` — the exact duplication the issue was filed to remove.

Whether this counts as "done" depends on reading `find = findWhere` as
satisfying "`findWhere` should just be `find`". It does not: the issue's own
framing is that these "should not be utility methods", and they demonstrably
still are, in `list/utils/`, on the public surface.

**What remains:** move the implementations into the front-running modules,
delete or privatise the `*Where`/`reduce*` names, and update the ~9 internal
call sites (e.g. `packages/fjl/src/function/compose.ts:1`,
`packages/fjl/src/list/span.ts:2`, `packages/fjl/src/object/setTheory.ts:3`).
This is a breaking change to the public API. **Already tracked:** no. It is
adjacent to #122 (behavioural review) but is an API-surface change, not a
behavioural one.

## Partial

### #75 — `iterate`, `repeat`, `replicate`, `cycle` should just be generators

**Claimed:** implementations, tests, and docs all updated (all three boxes
ticked).

**Verdict: PARTIAL — 3 of 4 methods converted.** Confirmed with current
evidence, as #125 requires.

| Method | State | Evidence |
| --- | --- | --- |
| `iterate` | generator | `packages/fjl/src/list/iterate.ts:29` — `export function* iterate<T>(...)` |
| `repeat` | generator | `packages/fjl/src/list/repeat.ts:11` — `export function* repeat<T>(...)` |
| `cycle` | generator | `packages/fjl/src/list/cycle.ts:20` — `export function* cycle<T, TS>(...)` |
| `replicate` | **still eager** | `packages/fjl/src/list/replicate.ts:6` — `replicate = <T>(n: number, x: T): T[] => Array(n).fill(x, 0, n)` |

The "Tests" tick is false for the same method, and this is the part not
previously recorded: `packages/fjl/tests/list/test-replicate.ts:8-10` asserts
eager array results —

```ts
[[0, 1], []],
[[2, 3], [3, 3]],
[[4, 5], [5, 5, 5, 5]],
```

— with `expect(replicate(...args)).toEqual(expected)`. So the test suite does
not merely fail to cover the generator behaviour; it actively pins the eager
behaviour, and converting `replicate` will require rewriting this file. That
should be stated in #121 so the conversion is not scoped as a one-line change.

The "Docs" tick cannot be meaningfully checked — the repo has no generated docs
directory and no prose reference for these methods; only the JSDoc block at
`packages/fjl/src/list/replicate.ts:3-5`, which still reads "Returns a list
containing `x` repeated `n` number of times."

**What remains:** convert `replicate` and rewrite its test.
**Already tracked:** yes — #121, which already names `replicate` (and
`unfoldr`, still eager at `packages/fjl/src/list/unfoldr.ts:19`). #121 does not
yet mention the test file.

### #79 — Consolidate set-theory methods into one set

**Claimed:** keep only the singularly named `union`, `complement`, `difference`,
`intersect`; the note allows internally forking on a **private** `obj{Method}`
version "if we need to". (Criterion unticked.)

**Verdict: PARTIAL.** The singular list versions exist, but the `obj*` versions
were never made private — they are exported from the package root and have
public tests, so the library still ships two parallel sets.

The list versions are in place and are the ones consumers would reach for first:
`packages/fjl/src/list/union.ts:7`, `complement.ts:10`, `difference.ts:9`,
`intersect.ts:8`.

The object versions are all still exported. `packages/fjl/src/object/setTheory.ts`
defines `objUnion` (`:7`), `objIntersect` (`:11`), `objDifference` (`:25`) and
`objComplement` (`:36`), plus their four `$`-curried variants;
`packages/fjl/src/object/index.ts:18` does `export * from './setTheory'`, and
`packages/fjl/src/index.ts:12` re-exports `./object`. They are also exercised as
public API by `packages/fjl/tests/object/index_test.ts:578-648`, which imports
all four by name from the package.

The escape hatch in the issue was explicitly "*Internally* we can fork on a
**private** `obj{methodName}` version". Eight publicly exported symbols with
their own public test block is not that. Nor did the singular versions absorb
object support — `union` is typed `(arr1: T[], arr2: T[]): T[]`
(`packages/fjl/src/list/union.ts:7`) and will not accept an object — so a caller
who wants set operations on objects genuinely still needs the second set. The
consolidation the issue describes has not occurred; the methods were merely
renamed with an `obj` prefix.

**What remains:** either make the `obj*` set non-exported and dispatch from the
singular names on input type, or accept the two-set design and close #79 as
"won't do" with that rationale recorded. **Already tracked:** no.

### #81 — `concat` and `append` should just be native `concat`

**Claimed:** four criteria — make `concat` native, make `append` equal native
`concat`, update repo call sites, and update methods that take an
array-of-arrays for `concat`'s sake. (All four unticked.)

**Verdict: PARTIAL — the second criterion landed, the first did not.**

`append` is fine. `packages/fjl/src/list/append.ts:24` is `append = concat`,
importing from `packages/fjl/src/_platform/slice/index.ts:17`, which is genuinely
variadic and delegates to the platform method:

```ts
concat = <T extends Slice>(...xss: (T | ConcatArray<any>)[]): any =>
  (xss.shift() as Slice)?.concat(...xss),
```

But the *exported* `concat` — the one the issue is named after — still takes a
single array-of-arrays, which is the precise construct the issue was filed to
eliminate. `packages/fjl/src/list/concat.ts:9`:

```ts
concat = <TS extends Slice>(xss: TS[]): typeof xss[0] => append(...xss)
```

So the repo now has *two* exported `concat`s with incompatible signatures — the
variadic one under the name `append`, and the array-of-arrays one under the name
`concat` — and `packages/fjl/src/_platform/slice/index.ts:12-15` carries a doc
comment warning readers not to confuse them. That comment is the artifact of the
half-migration.

The fourth criterion ("update methods that accept one arg (an array of arrays)
for the sake of `concat`") is unmet for the same reason: `concat` is itself the
principal offender.

**What remains:** make `list/concat` variadic (a breaking change), then either
merge it with `append` or keep `append` as its alias, and update call sites.
**Already tracked:** no.

### #89 — Add `numRange` and `charRange` implementations

**Claimed:** impl, tests, and docs — all three ticked.

**Verdict: PARTIAL — `numRange` exists, `charRange` does not.**

`numRange` is present and correct: a generator at
`packages/fjl/src/number/numRange.ts:6`
(`export function* numRange(start = 0, end = 1, step = 1)`), exported via
`packages/fjl/src/number/index.ts:4`, with a test at
`packages/fjl/src/number/numRange.test.ts`.

`charRange` does not exist. A case-insensitive search for `charRange` across
`packages/**/*.ts` returns zero hits — no implementation, no export, no test, no
mention. The issue was closed with the impl box ticked for a method that was
never written.

Note also that `packages/fjl/src/list/range.ts:15` still has an eager
`range = (from, to, step = 1): number[]` alongside a `rangeIter` generator at
`:33`, so `numRange` was added as a *third* range-producing API rather than
replacing either. That overlap is out of scope for #89 but is relevant to #121
and #122.

**What remains:** implement, test, and export `charRange`; decide whether it
supersedes anything. **Already tracked:** no.

### #90 — Remove nullish checks in utility/library methods (unless required)

**Claimed:** `` `instanceOf` `` ✅ and `...` ✅ — the second criterion is a
literal ellipsis.

**Verdict: PARTIAL.** The one named method holds; the unenumerated sweep did not
happen.

`instanceOf` is clean — `packages/fjl/src/_platform/object/index.ts:74` is
`(x: any, X: Constructable): boolean => x.constructor === X || x instanceof X`,
with no guard, so it throws on nullish input as the issue intended.

Defensive nullish handling remains widespread elsewhere, including in cases that
are not plausibly "required":

| Site | Check |
| --- | --- |
| `packages/fjl/src/list/length.ts:1` | `length = (x: {length: number}): number => x?.length` |
| `packages/fjl/src/list/uncons.ts:6` | `!xs?.length ? undefined : ...` |
| `packages/fjl/src/list/unconsr.ts:7` | `!xs?.length ? undefined : ...` |
| `packages/fjl/src/list/inits.ts:12` | `const limit = xs?.length` |
| `packages/fjl/src/list/groupBy.ts:19` | `if (!xs?.length) return []` |
| `packages/fjl/src/list/isSubsequenceOf.ts:11` | `if (isNullish(xs1) \|\| isNullish(xs2)) return false` |
| `packages/fjl/src/object/of.ts:18` | `if (isNullish(x))` |
| `packages/fjl/src/object/searchObj.ts:42` | `if (notNullish(node))` |
| `packages/fjl/src/_platform/string/index.ts:4` | `xs?.split(pattern, limit)` |
| `packages/fjl/src/_platform/slice/index.ts:18` | `(xss.shift() as Slice)?.concat(...xss)` |

The honest reading is that #90 is **unfalsifiable as written**. Its acceptance
criteria are one method and an ellipsis, so it can be neither passed nor failed;
whether the sites above are "required" is a judgement call that the issue never
made. The tick is not so much wrong as meaningless.

**What remains:** a per-method decision on the sites above.
**Already tracked:** partly — #122 (implementations/behavioural review) is the
natural home, and this is a behavioural question, not a typing one. #122 should
absorb it explicitly rather than leaving #90's `...` unresolved.

### #97 — fjl-labs: correct imports in members

**Claimed:** correct import paths for members pulled from other sub-packages;
e.g. `import {isset} from '../../fjl/src'` should become
`import {isset} from 'fjl'`. (Ticked.)

**Verdict: PARTIAL.** The source modules were fixed; the test modules were not.

All four non-test modules now import by package name:
`packages/fjl-labs/data/either.ts:7` (`from "fjl"`),
`packages/fjl-labs/data/monad.ts:9` and `:11`,
`packages/fjl-labs/data/maybe.ts:4`,
`packages/fjl-labs/types.ts:1`.

The three test modules still reach across the workspace by relative path:

```
packages/fjl-labs/data/either_test.ts:9  import {falsyList, truthyList} from "../../fjl/tests/helpers";
packages/fjl-labs/data/monad_test.ts:5   import {falsyList, truthyList} from "../../fjl/tests/helpers";
packages/fjl-labs/data/maybe_test.ts:3   import {falsyList}             from "../../fjl/tests/helpers";
```

This is a softer failure than it looks: `packages/fjl/tests/helpers.ts` is not
part of `fjl`'s published surface (`packages/fjl/tsconfig.json` sets
`files: ["./src/index.ts"]`), so these fixtures *cannot* be imported by package
name as-is. The fix is to publish the fixtures or duplicate them, not merely to
rewrite the specifier — which is presumably why they were skipped.

Two related facts surfaced while checking this, both worth recording:
`packages/fjl-labs` is listed in `pnpm-workspace.yaml:6` but **has no
`package.json`**, and it has no `src/` directory (modules sit at the package
root and in `data/`). Combined with its absence from `jest.config.mjs:19-24`,
`fjl-labs` is neither built, published, nor tested.

**What remains:** decide whether `fjl-labs` is a real package. If yes, give it a
`package.json`, move modules under `src/`, add it to the jest projects, and
resolve the fixture import properly. If no, drop it from `pnpm-workspace.yaml`.
**Already tracked:** no.

## Holds

These twelve issues, plus the two duplicate-scope ones (#40/#86), verify cleanly
against the tree. Evidence is given briefly; each was checked in code.

### #40 and #86 — Remove `curry_` use from tests and test helpers

**HOLDS.** A repo-wide grep for `curry_` across `packages/**/*.ts` returns
exactly one hit, and it is a stale comment rather than a use:
`packages/fjl/tests/helpers.ts:3` — `* @todo remove use of 'curry_' from tests and helpers.`
No `curry_` symbol is defined anywhere; `packages/fjl/src/function/curry.ts`
exports `curryN`, `curry`, and `curry2`–`curry5` only, and the module is marked
`@deprecated` at `packages/fjl/src/function/curry.ts:2` in favour of idiomatic
currying — consistent with #57's broader "idiomatic currying across all modules"
framing. The one cleanup outstanding is deleting the obsolete comment, which is
cosmetic.

*Framing note:* #57's Done list glosses #40 as "Idiomatic currying across all
modules". #40's actual title is narrower — removing `curry_` from tests. The
broader claim also holds (the `$`-prefixed curried variants are present
throughout `list/` and `object/`), and #124 already exists to add tests
asserting it, so no correction is needed. But the gloss is not what #40 said.

### #74 — Drop es5 support

**HOLDS.** Both sub-tasks verify. AMD/UMD distros are gone —
`rollup.config.mjs` emits only `format: 'es'` (`:51`) and `format: 'cjs'`
(`:68`). The tsconfigs target es2017+: `tsconfig.json:14` is
`"target": "ES2017"`, `tsconfig.json:7` is `"module": "ESNext"`, and
`tsconfig.json:4-6` is `"lib": ["esnext"]`. All five package tsconfigs extend
this root.

### #80 — Boolean-returning methods with >1 arg should not have their args flipped

**HOLDS** for both named methods. `packages/fjl/src/_platform/object/index.ts:74`
is `instanceOf = (x: any, X: Constructable)` — value first, constructor second,
non-flipped — and `:87` is
`hasOwnProperty = Object.hasOwn ?? (<T>(x: T, key: string | PropertyKey))` —
object first, key second. Corroborating evidence that the convention was applied
deliberately: the `native` static-flipping reducer at
`packages/fjl/src/_platform/object/index.ts:35-72` flips every 2-to-5-arity
`Object` static, and carries an explicit carve-out at `:39-43` for `Object.is`
("should not flip `is` method (as it just compares `a` and `b`)") — the same
rule as #80, encoded in the code.

*Residual worth noting, outside #80's stated scope:*
`packages/fjl/src/list/isSuffixOf.ts:10` is
`isSuffixOf = <T, TS>(xs2: TS, xs1: TS): boolean`, whose own doc comment at `:8`
reads "Checks if list `xs1` is a suffix of list `xs2`" — i.e. haystack first,
needle second. Its three siblings do the opposite: `isPrefixOf`
(`packages/fjl/src/list/isPrefixOf.ts:10`), `isInfixOf`
(`isInfixOf.ts:8`) and `isSubsequenceOf` (`isSubsequenceOf.ts:10`) are all
`(xs1, xs2)` = needle first. `packages/fjl/tests/list/test-isSuffixOf.ts:7`
confirms the live call convention is `isSuffixOf(fullArray, suffix)`. This is a
genuine argument-order inconsistency in a boolean-returning multi-arg method,
but #80's acceptance criteria named only `instanceOf` and `hasOwnProperty`, both
of which pass. Flagging it for #122 rather than counting it against #80.

### #82 — Pre-commit / commit-message / pre-push hooks

**HOLDS.** All three exist and do what was specified.
`.husky/pre-commit` runs `pnpm lint-staged`, and `package.json`'s `lint-staged`
block runs `tsc-files --noEmit` then `eslint --fix` on `*.{js,cjs,mjs,ts}` —
satisfying "lintfix, and 'tsc' staged files". `.husky/commit-msg` runs
`npx --no -- commitlint --edit $1`, backed by `commitlint.config.mjs` and
`@commitlint/config-conventional`. `.husky/pre-push` runs `pnpm test && pnpm build`.

### #87 — `take`, `takeWhile`, and similar should work with generators

**HOLDS.** All four in-scope methods accept `Iterable<T>`:

| Method | Signature |
| --- | --- |
| `take` | `packages/fjl/src/list/take.ts:4` — `(n: number, xs: Iterable<any>): T[]` |
| `takeWhile` | `packages/fjl/src/list/takeWhile.ts:8` — `(pred: TernaryPred, xs: Iterable<T>): T[]` |
| `drop` | `packages/fjl/src/list/drop.ts:6` — `(n: number, xs: Iterable<T>): T[]` |
| `dropWhile` | `packages/fjl/src/list/dropWhile.ts:9` — `(p: TernaryPred, xs: Iterable<T>): T[]` |

`dropWhileEnd` still takes `Slice` (`packages/fjl/src/list/dropWhileEnd.ts:10`),
which is correct: the issue struck it through explicitly, on the grounds that it
cannot be done performantly for direction-agnostic generators. The tree matches
the issue's own scope exactly — this is the one issue in the batch whose ticks
were both accurate *and* whose exclusion was justified in writing.

### #91 — Rename `platform/` to `_platform/`

**HOLDS.** `packages/fjl/src/_platform/` exists; no `platform/` directory
remains anywhere under `packages/`, and a grep for `/platform/` and
`from '../platform` across `*.ts`, `*.json`, and `*.mjs` (excluding `_platform`
matches) returns nothing.

### #94 — Re-add `apply`

**HOLDS.** `packages/fjl/src/function/apply.ts:15` defines
`apply = <F extends UnitNary>(fn: F, args: Parameters<F>): ReturnType<F>` with
its curried `$apply` at `:21`, exported via
`packages/fjl/src/function/index.ts:4`.

### #96 — Deprecate `isset` and replace its uses

**HOLDS** within its stated scope, which the issue title bar explicitly limits:
"Acceptance Criteria (in `fjl` package only)".

The deprecation is in place — `packages/fjl/src/object/isset.ts:4` reads
`@deprecated Use `notNullish`/`isNullish` instead`, with the replacements
defined at `packages/fjl/src/object/is.ts:29` and `:34`. And no module under
`packages/fjl/src` calls `isset` any more; the only in-package references are
the definition itself and its re-export at `packages/fjl/src/object/is.ts:9`.

Two consumers outside `fjl` still call it —
`packages/fjl-validator/src/lengthValidator.ts:57` and
`packages/fjl-inputfilter/src/input.ts:42` — as does
`packages/fjl-labs/data/monad.ts:9`, `either.ts:7` and `maybe.ts:4`. These are
out of #96's declared scope, so they do not falsify the tick, but they are live
uses of a deprecated method and should be swept before `isset` is removed for
2.0.

### #104 — Drop `amd`, `umd`, and `iife` output formats

**HOLDS.** `rollup.config.mjs` produces exactly two outputs per package —
`format: 'es'` at `:51` and `format: 'cjs'` at `:68`. No `amd`, `umd`, or `iife`
string appears in the config, and `pnpm build` emits only `dist/esm/` and
`dist/cjs/` trees.

### #105 — Add a `dist/` clean step that runs before builds

**HOLDS.** `rollup.config.mjs:77-95` performs a top-level-await clean of every
project's `dist/` directory before the config array is exported, so it runs
ahead of every build. Verified in the build log — `pnpm build` prints
"Cleaning dist paths:", the three project paths, then "Cleaning completed."
before the first bundle is written.

### #107 — Ensure all scripts use `*.ts` or `*.mjs` formats

**HOLDS** within scope ("all './node_scripts/', and/or, top level scripts").
`node_scripts/` contains three files, all `.mjs` — `tasks/link-packages.mjs`,
`utils/index.mjs`, `utils/ioUtils.mjs`. Every top-level script is `.mjs` too:
`jest.config.mjs`, `rollup.config.mjs`, `commitlint.config.mjs`,
`jest-puppeteer.config.mjs`, `.puppeteerrc.mjs`. `.js` files do remain in
`packages/fjl-filter/src/` and in `packages/fjl-inputfilter/tests/fixtures/`,
but those are package sources and test fixtures, not scripts, and are outside
the criterion as written.

### #109 — Conditional sourcemaps

**HOLDS.** `rollup.config.mjs:10` derives
`isDev = !process.env.NODE_ENV || process.env.NODE_ENV.toLowerCase().startsWith('dev')`,
and gates both layers on it: the rollup output at `:28` (`sourcemap: isDev`) and
the TypeScript plugin's ESM override at `:59` (`sourceMap: isDev`). Sourcemaps
are therefore emitted for development and absent for any other `NODE_ENV`,
exactly as the criterion states.

### #115 — Remove the use of `unknown` as generic values

**HOLDS.** A grep for `= unknown` — the syntax for a generic *default* — across
every `packages/**/*.ts` file returns zero hits. The remaining `unknown` tokens
in `packages/*/src` are all double-assertion bridges of the form
`x as unknown as T`, which are casts rather than generic values:
`packages/fjl/src/object/of.ts:27`, `object/copy.ts:51,63,70`,
`object/defineProp.ts:74`, `object/is.ts:44`, `list/mapAccumL.ts:17,29`,
`list/mapAccumR.ts:16,28`, `list/zipWith.ts:34`.

One residual in tests, worth a line in #124 or #32 but not enough to unseat the
tick: `packages/fjl/tests/list/test-tail.ts:20` passes `unknown` as a generic
*argument* (`tail(xs as Slice<unknown>)`), and
`packages/fjl/tests/list/test-find.ts:9` carries its own
`// @todo remove use of 'unknown'`.

### `tsconfig.prod.esm.json` consolidation (#57's unnumbered item)

**HOLDS.** All five packages carry a `tsconfig.prod.esm.json` with an identical
core: `extends: "./tsconfig.json"` plus
`{declaration: true, declarationDir: "./dist/esm", outDir: "./dist/esm", rootDir: "./src"}`.
`fjl-validator` and `fjl-filter` additionally repeat the `include`/`exclude`
pair from their base configs, which is redundant but harmless. The shape is
consolidated.

## Unverifiable

### #108 — Update `.npmignore` and `.eslintignore` entries to include remaining dot/ci files

**Cannot be verified.** The issue body is empty — no acceptance criteria, no
list of the "remaining" files it meant. There is no statement to test the tree
against.

For the record, current state: `.npmignore` ignores `**/.*` (which does cover
all dot/ci files), `**/node_modules/`, `**/node-scripts/`, `**/node_scripts/`,
`**/babel*` and `**/jest*`. `.eslintignore` ignores `**/.cache/**/*`,
`**/node_modules/**/*`, `**/dist/**/*` and `**/coverage/**/*` — no dot or ci
entries, though ESLint 8 skips dotfiles by default, so their absence may well be
deliberate. `pnpm lint` in this tree reports 0 errors and 62 warnings across 24
files, so nothing is currently being linted that visibly should not be.

I am recording this as unverifiable rather than as HOLDS or NOT DONE, because
asserting either would be guessing at what the issue asked for. Three other
issues in the batch have empty bodies (#86, #91, #94), but each has a title
specific enough to test on its own; #108's is not.

## Incidental defect found during the audit

Not attributable to any single issue in the batch, but a direct consequence of
the collision between #77's abandoned co-location and #89's one co-located test:

**A test file is shipped in the published `fjl` build.**

`packages/fjl/tsconfig.json:8` excludes `src/**/*_test.ts`, but
`packages/fjl/src/number/numRange.test.ts` uses the `.test.ts` convention, which
that glob does not match. `include` is `src/**/*.ts`, so the file is compiled.
Confirmed by running `pnpm build` in this tree:

```
packages/fjl/dist/esm/number/numRange.test.d.ts
```

Only the declaration leaks — rollup's `preserveModules` does not reach the file
because nothing imports it, so no `.mjs`/`.cjs` is emitted — but a
`numRange.test.d.ts` in a published package is still wrong, and it will become a
real emission the moment a second `.test.ts` is added under `src/` and imported.

The fix is one glob (`src/**/*.test.ts` alongside `src/**/*_test.ts` in the
`exclude` array of each package's `tsconfig.json`), but the underlying cause is
the three-conventions problem in #77 — which is the argument for actioning #77
rather than leaving it closed.

## Proposed correction to #57

#57's "Done" list currently reads:

> Idiomatic currying across all modules (#40); set-theory consolidation #79;
> boolean-returning method arg order #80; `curry_` removal #86; generator-friendly
> `take`/`takeWhile` #87; nullish-check removal #90; `platform/` → `_platform/`
> #91; `apply` re-added #94; `unknown` generics removed #115;
> `tsconfig.prod.esm.json` consolidated.
>
> Sub-packages updated: `fjl-validator`, `fjl-inputfilter`,
> `fjl-validator-recaptcha`, `fjl-filter`, `fjl-labs`.
>
> *#77 (test co-location) was ticked here but is not done — 125 of 126 test files
> are still under `packages/fjl/tests/`. It has been dropped from this list
> pending #125.*

Of the nine numbered references, **seven hold and two do not**: #79 is PARTIAL
(the `obj*` set is still publicly exported, so no consolidation occurred) and
#90 is PARTIAL (only `instanceOf` was done; its second criterion is a literal
`...`). Both should come out of "Done".

The `fjl-labs` entry in the sub-packages line also overstates: `fjl-labs` has no
`package.json`, is not in the jest projects list, and three of its files have
never been executed.

**The minimal correction is to drop #79 and #90 from the sentence and drop
`fjl-labs` from the sub-packages line.** The version below does that and also
folds in the batch's other clean closures (#74, #82, #96, #104, #105, #107,
#109), which this audit verified but which #57 never listed. That second part is
optional — it is an improvement to #57's completeness, not a correction of an
error. If the intent is to change only what was wrong, take the two deletions
and the new "Ticked here prematurely" subsection and leave the rest alone.

Corrected version, ready to paste in place of the two paragraphs and the
italic note above:

```markdown
## Done

Verified against the tree during the #125 audit — see
[`md/issues/AUDIT_2024_BATCH.md`](https://github.com/functional-jslib/fjl/blob/main/md/issues/AUDIT_2024_BATCH.md):

Idiomatic currying across all modules (#40); boolean-returning method arg order
#80; `curry_` removal #86; generator-friendly `take`/`takeWhile` #87;
`platform/` → `_platform/` #91; `apply` re-added #94; `isset` deprecated #96;
`unknown` generics removed #115; es5/AMD/UMD support dropped #74, #104; build
`dist/` clean step #105; conditional sourcemaps #109; git hooks #82; scripts
normalized to `*.mjs`/`*.ts` #107; `tsconfig.prod.esm.json` consolidated.

Sub-packages updated: `fjl-validator`, `fjl-inputfilter`,
`fjl-validator-recaptcha`, `fjl-filter`.

### Ticked here prematurely — corrected by the #125 audit

- **#77** (test co-location) — not done. 124 of 125 `fjl` test files are still
  under `packages/fjl/tests/`, and three naming conventions are live at once.
- **#79** (set-theory consolidation) — partial. `objUnion`/`objIntersect`/
  `objDifference`/`objComplement` are still exported from the package root
  (`src/object/setTheory.ts`), so the library still ships two parallel sets.
- **#90** (nullish-check removal) — partial. Only `instanceOf` was done; the
  issue's second criterion was a literal `...` and was never enumerated. Folded
  into #122.
- **#43** (`Slice` → `Iterable`) — not done, and never listed here. `Slice` is
  still defined and used by 24 files across three packages. Superseded by #114.
- **#75** (generator conversions) — partial; `replicate` was never converted.
  Already tracked by #121.
- **#83** (`find*`/`reduce*` consolidation) — not done. Both the `*Where`
  utility layer and the front-running aliases are publicly exported.
- **#89** (`numRange`/`charRange`) — partial; `charRange` was never written.
- **#81** (`concat`/`append`) — partial; `list/concat` still takes an
  array-of-arrays.
- **#97** (fjl-labs imports) — partial; the three `*_test.ts` modules still
  import `fjl` test fixtures by relative path, and `fjl-labs` has no
  `package.json`.
```

The "Remaining for 2.0" and "Out of scope for 2.0" sections need no changes
beyond whatever new issues are filed from
[Recommended actions](#recommended-actions).

## Recommended actions

None of the following has been executed. Each is a single command, ordered by
priority. The maintainer should review the findings above before running any of
them.

**1. Reopen #77 — test co-location, no other ticket covers it.**

```sh
gh issue reopen 77 --repo functional-jslib/fjl \
  --comment "Reopened by the #125 audit. Verified undone: 124 of 125 \`fjl\` test files are still under \`packages/fjl/tests/\`; only \`src/number/numRange.test.ts\` is co-located. Three naming conventions are live (\`test-*.ts\` ×118, \`index_test.ts\` ×6, \`*.test.ts\` ×1) and \`jest.config.mjs\` matches all three, so the drift never failed a build. Note that the \`test-*\` glob only matches under \`tests/\`, so co-location requires a rename in the same pass. See md/issues/AUDIT_2024_BATCH.md."
gh issue edit 77 --repo functional-jslib/fjl --milestone "v2.0" --add-label "tech-debt"
```

**2. Reopen #83 — `find*`/`reduce*` consolidation, no other ticket covers it.**

```sh
gh issue reopen 83 --repo functional-jslib/fjl \
  --comment "Reopened by the #125 audit. The aliasing landed in the opposite direction to what this issue asked for: \`find = findWhere\` (src/list/find.ts:10), \`foldr = reduceRight\` (src/list/foldr.ts:10), etc., while \`list/utils/\` remains the real implementation and is re-exported publicly via src/list/index.ts:104. \`fjl\` currently ships both names for every pair. See md/issues/AUDIT_2024_BATCH.md."
gh issue edit 83 --repo functional-jslib/fjl --milestone "v2.0" --add-label "tech-debt,groomed"
```

**3. Reopen #89 — `charRange` was never written.**

```sh
gh issue reopen 89 --repo functional-jslib/fjl \
  --comment "Reopened by the #125 audit. \`numRange\` landed (src/number/numRange.ts:6) but \`charRange\` does not exist anywhere in the repo — zero hits across packages/**/*.ts. The 'Impl' box was ticked for a method that was never written. See md/issues/AUDIT_2024_BATCH.md."
gh issue edit 89 --repo functional-jslib/fjl --milestone "v2.0"
```

**4. Reopen #79 — set-theory consolidation did not occur.**

```sh
gh issue reopen 79 --repo functional-jslib/fjl \
  --comment "Reopened by the #125 audit. The \`obj*\` variants were never made private: \`objUnion\`/\`objIntersect\`/\`objDifference\`/\`objComplement\` and their four curried forms are exported from src/object/setTheory.ts via src/object/index.ts:18, and are tested as public API in tests/object/index_test.ts:578-648. The issue's escape hatch was an explicitly *private* internal fork. The singular versions are array-only (src/list/union.ts:7), so callers still need the second set. Decide: dispatch on input type from the singular names, or close as won't-do with that rationale recorded. See md/issues/AUDIT_2024_BATCH.md."
gh issue edit 79 --repo functional-jslib/fjl --milestone "v2.0"
```

**5. Reopen #81 — `list/concat` still takes an array-of-arrays.**

```sh
gh issue reopen 81 --repo functional-jslib/fjl \
  --comment "Reopened by the #125 audit. Criterion 2 landed (\`append = concat\` from _platform/slice, which is variadic) but criterion 1 did not: src/list/concat.ts:9 is still \`concat = <TS extends Slice>(xss: TS[]) => append(...xss)\` — the exact array-of-arrays construct this issue was filed to remove. The repo now exports two incompatible concat signatures under different names, and _platform/slice/index.ts:12-15 carries a doc comment warning readers not to confuse them. See md/issues/AUDIT_2024_BATCH.md."
gh issue edit 81 --repo functional-jslib/fjl --milestone "v2.0" --remove-label "needs-triage"
```

**6. Close #43 as superseded by #114 — do not reopen; the work is already tracked.**

```sh
gh issue comment 43 --repo functional-jslib/fjl \
  --body "The #125 audit found this was closed without the work being done — \`Slice\` is still defined at src/types/data.ts:25 and referenced by 72 sites across 24 files, including packages/fjl-inputfilter/src/input.ts and packages/fjl-validator/src/lengthValidator.ts. Not reopening: #114 (under the #32 epic) already tracks exactly this work, with the cross-package sequencing constraint documented. Recording here so the closure is not mistaken for completion. See md/issues/AUDIT_2024_BATCH.md."
```

**7. Add the missing detail to #121 — the `replicate` test pins the eager behaviour.**

```sh
gh issue comment 121 --repo functional-jslib/fjl \
  --body "From the #125 audit: converting \`replicate\` is not a one-line change. tests/list/test-replicate.ts:8-10 asserts eager array results (\`replicate(2, 3)\` → \`[3, 3]\`) via \`toEqual\`, so the test file has to be rewritten alongside the implementation. #75's 'Tests' tick was false for the same method its 'Implementations' tick was false for. Confirmed still eager at src/list/replicate.ts:6; \`unfoldr\` likewise at src/list/unfoldr.ts:19."
```

**8. Fold #90's unresolved remainder into #122.**

```sh
gh issue comment 122 --repo functional-jslib/fjl \
  --body "From the #125 audit: #90 (remove nullish checks) was closed against an acceptance criterion of \`instanceOf\` plus a literal \`...\`, making it unfalsifiable. \`instanceOf\` is genuinely clean (_platform/object/index.ts:74), but defensive nullish handling remains at src/list/length.ts:1, uncons.ts:6, unconsr.ts:7, inits.ts:12, groupBy.ts:19, isSubsequenceOf.ts:11, src/object/of.ts:18, searchObj.ts:42, _platform/string/index.ts:4 and _platform/slice/index.ts:18. Whether each is 'required' is a behavioural judgement and belongs here.

Also for this review: \`isSuffixOf\` (src/list/isSuffixOf.ts:10) takes \`(xs2, xs1)\` — haystack first — while its siblings \`isPrefixOf\`, \`isInfixOf\` and \`isSubsequenceOf\` all take needle first. Outside #80's stated scope but the same class of defect."
```

**9. File the shipped-test-file defect.**

```sh
gh issue create --repo functional-jslib/fjl \
  --title "build: test file leaks into the published fjl package" \
  --label "bug,tech-debt,ci/cd" \
  --milestone "v2.0" \
  --body 'Found during the #125 audit.

`packages/fjl/tsconfig.json:8` excludes `src/**/*_test.ts`, but the one co-located test in the repo uses the other convention — `packages/fjl/src/number/numRange.test.ts` — which that glob does not match. With `include: ["src/**/*.ts"]`, it is compiled into the ESM output.

Reproduce with `pnpm build`:

```
packages/fjl/dist/esm/number/numRange.test.d.ts
```

Only the declaration leaks today, because rollup `preserveModules` never reaches the module (nothing imports it), so no `.mjs`/`.cjs` is emitted. It becomes a real emission as soon as a second `.test.ts` lands under `src/` and is imported.

## Acceptance criteria

- [ ] Add `src/**/*.test.ts` (and `src/**/*.spec.ts`) to the `exclude` array of every package `tsconfig.json`
- [ ] Confirm `pnpm build` emits no `*test*` files under any `packages/*/dist/`

Root cause is the three-conventions problem in #77.'
```

**10. File the `fjl-labs` packaging gap.**

```sh
gh issue create --repo functional-jslib/fjl \
  --title "chore: fjl-labs is in the workspace but is not a package" \
  --label "tech-debt,needs-grooming" \
  --body 'Found during the #125 audit while verifying #97.

`packages/fjl-labs` is listed at `pnpm-workspace.yaml:6` but:

- has no `package.json`
- has no `src/` directory (modules sit at the package root and in `data/`)
- is absent from the `projects` list in `jest.config.mjs:19-24`

Consequence: its three test files — `data/either_test.ts`, `data/maybe_test.ts`, `data/monad_test.ts` — have never been executed. They also sit in neither a `tests/` nor a `src/` directory, so `jest.config.mjs` `testMatch` would not select them even if the project were listed.

This is also why #97 is only partially done: the four source modules were correctly moved to `import ... from "fjl"`, but the three test modules still use `from "../../fjl/tests/helpers"` (`either_test.ts:9`, `monad_test.ts:5`, `maybe_test.ts:3`). Those fixtures are not part of `fjl`'"'"'s published surface (`packages/fjl/tsconfig.json` sets `files: ["./src/index.ts"]`), so the specifier cannot simply be rewritten.

## Acceptance criteria

- [ ] Decide whether `fjl-labs` is a real package
- [ ] If yes: add `package.json`, move modules under `src/`, add to `jest.config.mjs` projects, and resolve the fixture import (publish the fixtures or duplicate them)
- [ ] If no: remove it from `pnpm-workspace.yaml`'
```

**11. Note the #97 remainder against whichever ticket action 10 produces.**

```sh
gh issue comment 97 --repo functional-jslib/fjl \
  --body "From the #125 audit: the source modules were correctly fixed (data/either.ts:7, data/monad.ts:9,11, data/maybe.ts:4, types.ts:1 all import from 'fjl'), but the three \`*_test.ts\` modules still import fjl test fixtures by relative path. Not reopening — the blocker is that packages/fjl/tests/helpers.ts is not part of fjl's published surface, which is a packaging question rather than an import-path one. Tracked in the new fjl-labs packaging issue."
```

**12. Apply the #57 correction** — see
[Proposed correction to #57](#proposed-correction-to-57) above. Best done by
hand, or:

```sh
gh issue edit 57 --repo functional-jslib/fjl --body-file <edited-body.md>
```

**13. Tick #125's acceptance criteria and close it** once the above are actioned.

```sh
gh issue close 125 --repo functional-jslib/fjl \
  --comment "Audit complete — see md/issues/AUDIT_2024_BATCH.md. 24 issues re-verified: 14 hold, 6 partial, 3 not done, 1 unverifiable. #57's Done list corrected."
```

---

*Companion to [`md/issues/ISSUE_GROOMING.md`](./ISSUE_GROOMING.md). Verified
against `61a9632d`.*
