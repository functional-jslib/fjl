# Issue grooming and consolidation plan

> **Status: applied — 2026-07-31.** Every action below has been executed against
> `functional-jslib/fjl`. The `v2.0` and `Backlog (post-2.0)` milestones exist,
> #61 and #55 are closed, #124 and #125 are filed, and #113/#114/#116 are real
> GitHub sub-issues of #32. Two deviations found during execution are recorded
> in [Deviations on application](#deviations-on-application).

A ready-to-apply pass over the repository's open issues: consolidate the
overlapping typing-cleanup tickets into one epic, dress the under-described
issues with acceptance criteria, close the stale ones, and normalize labels and
milestones.

All claims below were verified against the working tree at commit `472067e`
("Merge pull request #117 from functional-jslib/dev"). Where verification
contradicted an earlier assumption, the correction is called out inline.

Net effect: 18 open issues → 18, but sorted — 2 closed as duplicate/obsolete
(#61, #55), 2 filed to capture untracked work, 6 moved to a backlog milestone,
leaving a **focused 12-issue v2.0 milestone**. One canonical per-module typing
checklist replaces four competing ones, and every remaining issue is labeled,
milestoned, and carries acceptance criteria.

## Contents

- [Deviations on application](#deviations-on-application)
- [Findings that change the plan](#findings-that-change-the-plan)
- [1. Label and milestone prerequisites](#1-label-and-milestone-prerequisites)
- [2. Close](#2-close)
- [3. Consolidate the typing-cleanup cluster](#3-consolidate-the-typing-cleanup-cluster)
- [4. Rescope the implementations review](#4-rescope-the-implementations-review)
- [5. Dress the under-described issues](#5-dress-the-under-described-issues)
- [6. Re-validate the remainder](#6-re-validate-the-remainder)
- [7. New issues to file](#7-new-issues-to-file)
- [8. Rewrite the #57 tracking issue](#8-rewrite-the-57-tracking-issue)
- [Summary table](#summary-table)

## Deviations on application

Two places where the plan as written was internally inconsistent, and what was
applied instead.

### `_platform/` is **not** ticked on #32's checklist

Section 3's proposed #32 body ticks `_platform/`, but its own following note
says the ticks are the union of the pre-consolidation #32 and #61 bodies —
neither of which ticks it. Verification settles it: `_platform/object/index.ts`
still takes `any` (`instanceOf`, `$instanceOf`) and `_platform/slice/index.ts`
still depends on `Slice` and returns `any`. It was left unticked, with the
reason recorded in the issue body. `_platform/` *is* correctly ticked on #122,
which measures behaviour, not typing — exactly the distinction section 4 argues
for.

### #101 keeps its `enhancement` label alongside `ci/cd`

The summary table gives #101 the single type label `ci/cd` while giving #102
both `enhancement` and `ci/cd`, though the two issues are the same kind of
ticket. Rather than make near-identical issues inconsistent, both kept
`enhancement` + `ci/cd`. If the one-type-label rule is to be enforced strictly,
drop `enhancement` from both, not just #101.

## Findings that change the plan

Seven verification results that contradict the assumptions the plan was drafted
from. Each one changes what the corresponding issue should say.

### #121 must not be closed — there is a real remaining tail

`cycle`, `iterate`, `range`, and `repeat` are already `function*` generators.
But two conversions were never made:

- `replicate` is still eager — `Array(n).fill(x, 0, n)` returning `T[]`
  (`packages/fjl/src/list/replicate.ts`). #75 was closed claiming `replicate`
  had been converted; it had not. This is a tracking regression, and belongs in
  #121's body so it is not lost a second time.
- `unfoldr` accumulates into `const out = [] as A[]` and returns `A[]`
  (`packages/fjl/src/list/unfoldr.ts`).

### #114 / `Slice` removal is a cross-package breaking change

Not a single call site. `Slice`, `SliceConstructor`, and `PredForSlice` are
referenced by 20 files under `packages/fjl/src` **and by two sibling packages**:

| Location | Files |
| --- | --- |
| `packages/fjl/src/types/` | `data.ts` (defines), `list.ts` (defines `PredForSlice`) |
| `packages/fjl/src/_platform/` | `slice/index.ts` |
| `packages/fjl/src/list/` | `breakOnList`, `concat`, `cycle`, `dropWhileEnd`, `group`, `groupBy`, `inits`, `insertBy`, `intercalate`, `last`, `mapAccumR`, `remove`, `removeBy`, `span`, `subsequences`, `tails` |
| `packages/fjl/src/list/utils/` | `sliceCopy`, `sliceFrom`, `sliceTo` |
| **Outside `fjl`** | `packages/fjl-inputfilter/src/input.ts`, `packages/fjl-validator/src/lengthValidator.ts` |

The last row is the important one: removing `Slice` breaks downstream packages
in this workspace, so the work has to be sequenced with them rather than landed
as an isolated `fjl` change.

### #116's real defect is inconsistency, not generic count

| Type | Generic params | Location |
| --- | --- | --- |
| `Quinary<A, B, C, D, E, RetT>` | 6 | `packages/fjl/src/types/arity.ts:11` |
| `MapAccumOp<AccumVal, B, MapOfB, Index, SliceOfBs>` | 5 | `packages/fjl/src/types/list.ts:29` |
| `Quaternary<A, B, C, D, RetT>` | 5 | `packages/fjl/src/types/arity.ts:9` |

The count-based framing in the issue title flags the wrong types. The `arity.ts`
entries are anonymous function shapes whose generics are *meant* to be
positional, while `MapAccumOp` mixes four named generics with a stray positional
`B`. See [#116 below](#116--types-that-take-more-than-three-generic-args-should-have-clear-type-names)
for the resolution.

### Much of #114's target surface is already marked `@deprecated`

`types/list.ts` and `types/data.ts` carry `@deprecated` doc blocks that name
their own replacements — `ForEachOp`/`MapOp` → `Ternary`, `ReduceOp` →
`Quaternary`, `PredForSlice` → `TernaryPred`, `SliceConstructor` → direct
constructors, `Lengthable` → `NumberIndexable`. #114 is therefore a
delete-and-migrate job with the migration targets already chosen, not a redesign.

Two consequences: #114 is more tractable than its one-line title suggests, and
#116 shrinks considerably, because three of its apparent targets are deprecated
types that should be deleted rather than renamed.

### #77 was closed but the test co-location never happened

`packages/fjl/tests/` still holds 125 test files against ~170 source files;
exactly one test is co-located (`src/number/numRange.test.ts`). Three naming
conventions are live at once — `test-*.ts`, `index_test.ts`, and `*.test.ts` —
and `jest.config.mjs` matches all of them.

This is the second closed issue found to be materially undone, after #75. Two
independent mis-ticks in the same batch is a pattern rather than an accident,
which is why the audit below is recommended rather than optional.

### #20 is essentially not started, not "partially done"

`@curried` appears in 3 of roughly 170 non-test source files:

| Module | Files with `@curried` |
| --- | --- |
| `list/` | 2 / 102 |
| `list/utils/` | 1 / 17 |
| `_platform/`, `boolean/`, `errorThrowing/`, `function/`, `number/`, `object/`, `string/`, `types/` | 0 |

Its checklist should therefore start empty rather than inheriting ticks.

### #57's sub-package list is incomplete

It ticks `fjl-validator`, `fjl-inputfilter`, and `fjl-validator-recaptcha`, then
trails off with a dangling `- [ ] ...`. The workspace also contains
`fjl-filter` and `fjl-labs`. The rewrite names all five explicitly.

## 1. Label and milestone prerequisites

Do these first — later steps assign them.

### New label

| Label | Colour | Description |
| --- | --- | --- |
| `epic` | `#5319E7` | Umbrella/tracking issue; work happens in child issues. |

### Descriptions for existing colour-only labels

Matching the style already used on `groomed` and `wishlist`.

| Label | Description to add |
| --- | --- |
| `needs-grooming` | Ticket needs acceptance criteria before development. |
| `needs-triage` | Newly filed; needs type label and priority. |
| `ci/cd` | Build, release, and GitHub Actions pipeline work. |
| `tech-debt` | Cleanup that reduces maintenance cost without changing behavior. |

### Milestones

| Milestone | Issues |
| --- | --- |
| **v2.0** | #57, #32, #113, #114, #116, #121, #122, #102, #118, #101, and the new "curried tests" issue |
| **Backlog (post-2.0)** | #120, #78, #103, #41, #38, #20 |

### Labelling rule

Every open issue carries **one** type label (`enhancement`, `bug`,
`documentation`, `tech-debt`, or `ci/cd`) and **exactly one** state label
(`needs-triage` → `needs-grooming` → `groomed`). Today 8 of 18 open issues have
no labels at all.

## 2. Close

### #61 — "next: Allow infered types"

Close as **duplicate** of #32.

> Consolidating the typing cleanup into #32, which now carries the single
> canonical per-module checklist. The `boolean/` completion recorded here is
> reflected there.

### #55 — "next: Support deno"

Close as **not planned**.

> Self-retracted in the body — Deno supports `package.json`/node projects, and
> the repo has a `deno.json`. Re-file narrowly if JSR publishing is wanted.

## 3. Consolidate the typing-cleanup cluster

#32, #61, #113, #114, #116, and the "Allow inferred types" section of #57 all
describe the same work: reducing, renaming, and defaulting generics across
`packages/fjl/src/types/*` and per-module sources. Each carries a partial,
drifting per-module checklist — which is why #57 itself says "Tickets in this
section need consolidating."

#32 becomes the umbrella: it is the oldest, is already labeled
`groomed`/`tech-debt`, and its per-module checklist is the most complete.
#113, #114, and #116 stay open as genuinely distinct sub-tasks, re-parented
under it.

### #32 — retitle to "v2.0 — Type system cleanup (epic)"

Labels: `enhancement`, `tech-debt`, `groomed`, `epic`. Milestone: v2.0.

> Umbrella for reducing, renaming, and defaulting generics across
> `packages/fjl/src/types/*` and per-module sources. Supersedes #61.
>
> Sub-issues:
>
> - #113 — keep generic defaults where they make sense
> - #114 — remove `data`/`list` generics, including the leftover `Slice` type
> - #116 — give intent-revealing names to generics on wide types
>
> A module is ticked only when **sources + tests + docs** are all done.
>
> - [ ] `_platform/` (see [Deviations](#deviations-on-application))
> - [x] `boolean/`
> - [ ] `errorThrowing/`
> - [x] `function/`
> - [ ] `list/`
> - [ ] `list/utils/`
> - [x] `number/`
> - [x] `object/`
> - [x] `string/`
> - [x] `types/`
>
> Consolidated acceptance criteria:
>
> - Introduce flexible base generics for native built-ins where they don't
>   already exist.
> - Prefer inference over explicit annotation wherever TypeScript can infer the
>   type; remove typings that are not strictly necessary.
> - Remove redundant slice-predicate aliases (`PredForSlice`, `SlicePred`).

Carry the tick marks over from the current #32/#61 bodies; the list above
reflects their union.

### #113 — "Keep generic defaults for method types"

Set parent to #32. Labels are already correct (`enhancement`, `groomed`,
`tech-debt`). Add milestone v2.0.

### #114 — "Remove the use of generics defined in 'data/list'"

Set parent to #32. Drop `needs-grooming`; add `tech-debt`, `groomed`. Milestone
v2.0. Append:

> **Files defining the types:** `packages/fjl/src/types/data.ts`,
> `packages/fjl/src/types/list.ts`.
>
> **Most of the work is already sign-posted in-code.** These types are marked
> `@deprecated` with their replacement named in the doc block, so this is a
> delete-and-migrate job rather than a redesign:
>
> | Deprecated | Replacement |
> | --- | --- |
> | `ForEachOp` | `Ternary` |
> | `MapOp` | `Ternary` |
> | `ReduceOp` | `Quaternary` |
> | `PredForSlice` | `TernaryPred` |
> | `SliceConstructor` | direct type constructors |
> | `Lengthable` | `NumberIndexable` |
> | `Nameable` | own/native types |
>
> - [ ] Migrate call sites to the named replacements, then delete each
>       deprecated type
>
> **Includes the leftover `Slice` removal**, moved here from #57. #43 replaced
> `Slice` with `Iterable` at the API level, but the type remains — and unlike
> the table above, `Slice` itself carries no `@deprecated` marker and no named
> replacement, so it needs a decision before it can be removed:
>
> - [ ] Remove `Slice` and `SliceConstructor` from sources
> - [ ] Remove from tests
> - [ ] Remove from docs
>
> **Consumers — breaking, sequence with the sibling packages:**
>
> - `_platform/slice/`
> - `list/`: `breakOnList`, `concat`, `cycle`, `dropWhileEnd`, `group`,
>   `groupBy`, `inits`, `insertBy`, `intercalate`, `last`, `mapAccumR`,
>   `remove`, `removeBy`, `span`, `subsequences`, `tails`
> - `list/utils/`: `sliceCopy`, `sliceFrom`, `sliceTo`
> - **Outside `fjl`:** `packages/fjl-inputfilter/src/input.ts`,
>   `packages/fjl-validator/src/lengthValidator.ts`

### #116 — "Types that take more than three generic args should have clear type names"

Set parent to #32. Labels `tech-debt`, `groomed`. Milestone v2.0.

**Decision: exclude the `arity.ts` types; narrow this issue to domain types.**

`Quinary<A, B, C, D, E, RetT>` and `Quaternary<A, B, C, D, RetT>` describe
*anonymous function shapes*. Their generics have no domain meaning to reveal —
the meaning **is** positional, and `A` is already the clearest possible name for
"the type of the first argument." The file is internally consistent (`A`…`E`
for parameters, `RetT` for the return), so renaming would cost churn and buy
nothing. Counting generic parameters turns out to be the wrong test.

The right test is **consistency**: a type should not mix named and positional
generics. Applying that filter — and discounting types already marked
`@deprecated`, where refining generics is wasted effort — leaves a much smaller
issue than the title implies:

| Type | Status | Verdict |
| --- | --- | --- |
| `MapAccumOp<AccumVal, B, MapOfB, Index, SliceOfBs>` | live | **The one real target.** Four named generics plus a stray positional `B`, which is the element type and should be named to match its siblings. |
| `MapOp<T, FtrT, FtrT2>` | `@deprecated` → `Ternary` | Delete, don't rename. Belongs to #114. |
| `ReduceOp<T, FtrT, ZeroT>` | `@deprecated` → `Quaternary` | Delete, don't rename. Belongs to #114. |
| `PredForSlice<T, TS>` | `@deprecated` → `TernaryPred` | Delete, don't rename. Belongs to #114. |
| `Quinary`, `Quaternary` | live | Exempt — intentionally positional. |
| `UnfoldrOp<A, B>` | live, in `list/unfoldr.ts` | Carries its own `@todo` saying the letters should be flipped; fold that `@todo` in here. |

Rewritten acceptance criteria:

- [ ] `MapAccumOp`'s positional `B` is renamed to match its named siblings.
- [ ] `UnfoldrOp`'s in-code `@todo` is resolved or removed.
- [ ] Purely positional function-shape types (`arity.ts`) stay as they are, by
      documented exception.
- [ ] The convention is recorded in `packages/fjl/src/types/README.md`.

The last item is done — see the commit that added this document; the README
previously contained only an `@todo`. Note that #116 is now small enough that it
could reasonably be absorbed into #114; keeping it separate is a judgement call
in favour of preserving the documented exemption for `arity.ts`.

## 4. Rescope the implementations review

### #122 — "v2.0 - Implementations review"

**Decision: keep it separate from #32.** Three reasons, in order of weight:

1. **There is substantive behavioural work that #32 cannot absorb.** The `fjl`
   package has ~170 non-test source files and 125 test files, all but one still
   in the legacy `packages/fjl/tests/` tree, under three different naming
   conventions (`test-*.ts`, `index_test.ts`, `*.test.ts`). That is a coverage
   and layout problem, not a typing problem.
2. **The two passes are verified differently.** #32 is a type-level refactor
   confirmed by `tsc` with no runtime behaviour change; #122 requires actually
   running tests and reading implementations. Merging them produces a checklist
   where a module cannot be ticked until both a compiler check and a test review
   pass — which forfeits the ability to land the type cleanup incrementally.
3. **Their tick states already disagree**, which is the empirical proof they
   measure different things: #32/#61 tick `number/`, `object/`, `string/`,
   `types/`; #122 ticks `_platform/`, `boolean/`, `function/`. Neither is wrong
   — they are answering different questions about the same modules.

Keep open. Labels `tech-debt`, `groomed`. Milestone v2.0. Prepend to the body:

> **Scope: behavioural review only** — implementation correctness and test
> coverage per module. The *typing* pass is tracked separately in #32; do not
> duplicate type checklists here.
>
> Per module, "reviewed" means: every exported member has a test; tests exercise
> behaviour rather than re-implementing it; and no test depends on untested
> library code (see #41 for the `object/` case).

Sequencing: run #122 on a module *after* #32 has ticked it, so the review reads
final signatures. This ordering is a preference, not a blocker — the two can
proceed independently where convenient.

## 5. Dress the under-described issues

### #121 — "v2.0 - feature: Update `iterator` family of methods to just be generators"

Labels `enhancement`, `groomed`. Milestone v2.0. Body:

> #75 and #87 covered most of this. Already generators: `cycle`, `iterate`,
> `range`, `repeat`.
>
> Remaining:
>
> - [ ] `replicate` — still eager (`Array(n).fill(x, 0, n)` returns `T[]`).
>   #75 marked this done, but it was never converted.
> - [ ] `unfoldr` — accumulates into an array and returns `A[]`; a generator
>   lets callers stop early.
> - [ ] Audit `scanl`/`scanl1`/`scanr`/`scanr1` and `zip*`/`unzip*`, and record
>   which should stay eager. A documented decision counts as done.
>
> Where a generator would break existing consumers, keep the eager version and
> add a `*`-suffixed generator sibling rather than changing the return type.

### #120 — "feature: Graph data structures lib"

Labels `enhancement`, `wishlist`, `groomed`. Milestone: Backlog — this is a
post-2.0 feature, not a 2.0 blocker. Body should state:

- Target package — new workspace package, or an addition to `fjl-labs`?
- Scope — directed and undirected graphs, traversal (BFS/DFS), topological sort.
- Whether it ships as part of `fjl` proper or stays experimental.

### #118 — "CI/CD - Add 'main', and 'dev' branch github action hooks"

Drop `needs-grooming`; add `ci/cd`, `groomed`. Milestone v2.0. Body:

> `.github/workflows/monorepo-build.yml` still triggers only on the `monorepo`
> branch (`push.branches: [ monorepo ]` and
> `pull_request.branches: [ monorepo ]`), but #76 promoted `monorepo` to
> `main` — so PRs into `main`/`dev` currently run no build at all.
>
> - [ ] Update both triggers to `[ main, dev ]`
> - [ ] Confirm the matrix (18.x / 20.x / 22.X) is still the intended support
>       range
> - [ ] Make the build a required status check on `main`

## 6. Re-validate the remainder

### #101 — "CI/CD - Update packages to use npm/pnpm's `version` feature"

Still valid — confirmed no `preversion`, `version`, or `postversion` scripts in
the root manifest or in any of the six package manifests. Add `ci/cd`,
`groomed`. Milestone v2.0.

### #102 — "CI/CD: Choose documentation generating strategy"

Already labeled `enhancement`, `ci/cd` and has acceptance criteria. Add
`groomed` and milestone v2.0. No `typedoc` or `deno doc` wiring exists yet in
any manifest.

### #78 — "next: Use deno/node built-in post 'es2015' testing features"

Body is literally "Description pending." Either write acceptance criteria —
migrate Jest to `node:test`/`deno test`, and decide what happens to
`jest-puppeteer` — or close it as speculative and re-file when the repo is
ready. Milestone: Backlog.

### #20 — "next: Mark all curried methods as `curried`"

Labels `documentation`, `good first issue`, `groomed`. Milestone: Backlog. Add
an **empty** per-module checklist (`_platform/`, `boolean/`, `errorThrowing/`,
`function/`, `list/`, `list/utils/`, `number/`, `object/`, `string/`) and note
that current coverage is 3 files total — see
[the findings above](#20-is-essentially-not-started-not-partially-done).

### #41 — "next - fjl - `object` sub-module tests refactor"

Still valid. Add acceptance criteria (which test files still mix in untested
library methods, and what the allowed helper set is), labels `enhancement`,
`tech-debt`, `groomed`. Milestone: Backlog.

### #38 — "next: fjl-inputfilter - Types file"

Still valid — confirmed `packages/fjl-inputfilter/src/` contains only
`index.ts`, `input.ts`, and `inputFilter.ts`, with no `types.ts`. Add
acceptance criteria naming the shared types to extract, labels `enhancement`,
`tech-debt`, `groomed`. Milestone: Backlog.

### #103 — "fjl-validator v2.0"

A tracking issue with no children. Either add the child checklist or close it
until the work is real. If kept, label `epic`, `wishlist` and put it on the
Backlog milestone.

## 7. New issues to file

### v2.0 — Add tests asserting curried methods are actually curried — filed as #124

Labels `enhancement`, `groomed`. Milestone v2.0. This is the one remaining #57
item with no ticket of its own; #57's rewritten body references it.

### Audit the 2024 "done" batch for mis-ticked issues — filed as #125

Labels `tech-debt`, `groomed`. Milestone v2.0.

Two closed issues have been found materially undone — #75 (`replicate` was never
converted to a generator) and #77 (test co-location never happened; 125 of 126
test files are still in `packages/fjl/tests/`). Both were closed in the same
Feb–May 2024 push, so the remaining closures from that period should be spot
checked before #57 is declared complete.

- [ ] Re-verify each issue closed between 2024-02-09 and 2024-06-01 against the
      current tree
- [ ] Reopen, or file follow-ups for, any whose acceptance criteria are unmet
- [ ] Correct #57's "Done" list if any of its ticked references turn out to be
      premature

This is deliberately scoped as a one-off audit, not a process change.

## 8. Rewrite the #57 tracking issue

#57 has become hard to read: it mixes completed narrative sections, a
self-admitted "tickets need consolidating" note, malformed checkboxes
(`- [] #61`), a plain-text entry for #121 instead of a reference, and
strikethrough sections that are long done. Replace the body with a thin index.

Labels `enhancement`, `epic`. Milestone v2.0.

> ## Goals
>
> Better performance and ergonomics — idiomatic syntax over custom
> implementations (currying, et al.).
>
> ## Done
>
> Idiomatic currying across all modules (#40); set-theory consolidation
> #79; boolean-returning method arg order #80; `curry_` removal #86;
> generator-friendly `take`/`takeWhile` #87; nullish-check removal #90;
> `platform/` → `_platform/` #91; `apply` re-added #94; `unknown` generics
> removed #115; `tsconfig.prod.esm.json` consolidated.
>
> Sub-packages updated: `fjl-validator`, `fjl-inputfilter`,
> `fjl-validator-recaptcha`, `fjl-filter`, `fjl-labs`.
>
> *#77 (test co-location) was ticked here but is not done — 125 of 126 test
> files are still under `packages/fjl/tests/`. It has been dropped from this
> list pending the audit below.*
>
> ## Remaining for 2.0
>
> - [ ] #32 — type system cleanup (epic); includes #113, #114, #116
> - [ ] #102 — documentation generation strategy
> - [ ] #118 — CI hooks for `main`/`dev`
> - [ ] #121 — remaining iterator → generator conversions
> - [ ] #122 — implementations/behavioural review
> - [ ] *(new)* tests asserting curried methods are curried
> - [ ] *(new)* audit the 2024 "done" batch for mis-ticked issues
>
> ## Out of scope for 2.0
>
> #120, #78, #103, #41, #38, #20 — see the Backlog milestone.

## Summary table

| Issue | Action | Type label | State | Milestone |
| --- | --- | --- | --- | --- |
| #57 | Rewrite as thin index | `enhancement`, `epic` | `groomed` | v2.0 |
| #32 | Retitle to epic; canonical checklist | `enhancement`, `tech-debt`, `epic` | `groomed` | v2.0 |
| #113 | Re-parent under #32 | `enhancement`, `tech-debt` | `groomed` | v2.0 |
| #114 | Re-parent; add `Slice` criteria + consumers | `tech-debt` | `groomed` | v2.0 |
| #116 | Re-parent; add offender list | `tech-debt` | `groomed` | v2.0 |
| #122 | Rescope to behavioural review | `tech-debt` | `groomed` | v2.0 |
| #121 | Write body; `replicate`/`unfoldr` remain | `enhancement` | `groomed` | v2.0 |
| #118 | Write body; workflow triggers | `ci/cd` | `groomed` | v2.0 |
| #102 | Confirm criteria | `enhancement`, `ci/cd` | `groomed` | v2.0 |
| #101 | Confirm still valid | `enhancement`, `ci/cd` | `groomed` | v2.0 |
| #124 | Curried-method tests | `enhancement` | `groomed` | v2.0 |
| #125 | Audit the 2024 "done" batch | `tech-debt` | `groomed` | v2.0 |
| #61 | **Close** — duplicate of #32 | — | — | — |
| #55 | **Close** — obsolete/not planned | — | — | — |
| #120 | Write body; post-2.0 feature | `enhancement`, `wishlist` | `groomed` | Backlog |
| #103 | Add children or close | `epic`, `wishlist` | `needs-grooming` | Backlog |
| #78 | Write criteria or close | `enhancement` | `needs-grooming` | Backlog |
| #41 | Add criteria | `enhancement`, `tech-debt` | `groomed` | Backlog |
| #38 | Add criteria | `enhancement`, `tech-debt` | `groomed` | Backlog |
| #20 | Empty per-module checklist | `documentation`, `good first issue` | `groomed` | Backlog |
