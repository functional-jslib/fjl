# Issue grooming and consolidation plan

A ready-to-apply pass over the repository's open issues: consolidate the
overlapping typing-cleanup tickets into one epic, dress the under-described
issues with acceptance criteria, close the stale ones, and normalize labels and
milestones.

All claims below were verified against the working tree at commit `472067e`
("Merge pull request #117 from functional-jslib/dev"). Where verification
contradicted an earlier assumption, the correction is called out inline.

Net effect: 18 open issues → 12, with 2 closed as duplicate/obsolete (#61, #55),
6 moved to a backlog milestone, a single canonical per-module typing checklist
instead of four competing ones, and every remaining issue labeled, milestoned,
and carrying acceptance criteria.

## Contents

- [Findings that change the plan](#findings-that-change-the-plan)
- [1. Label and milestone prerequisites](#1-label-and-milestone-prerequisites)
- [2. Close](#2-close)
- [3. Consolidate the typing-cleanup cluster](#3-consolidate-the-typing-cleanup-cluster)
- [4. Rescope the implementations review](#4-rescope-the-implementations-review)
- [5. Dress the under-described issues](#5-dress-the-under-described-issues)
- [6. Re-validate the remainder](#6-re-validate-the-remainder)
- [7. New issue to file](#7-new-issue-to-file)
- [8. Rewrite the #57 tracking issue](#8-rewrite-the-57-tracking-issue)
- [Summary table](#summary-table)

## Findings that change the plan

Five verification results that contradict the assumptions the plan was drafted
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

### #116 has more offenders than `MapAccumOp`

| Type | Generic params | Location |
| --- | --- | --- |
| `Quinary<A, B, C, D, E, RetT>` | 6 | `packages/fjl/src/types/arity.ts:11` |
| `MapAccumOp<AccumVal, B, MapOfB, Index, SliceOfBs>` | 5 | `packages/fjl/src/types/list.ts:29` |
| `Quaternary<A, B, C, D, RetT>` | 5 | `packages/fjl/src/types/arity.ts:9` |

The arity types use positional single letters, which is the exact smell the
issue targets — though for arity types that may well be intentional. See #116
below for how to resolve that.

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
> - [x] `_platform/`
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
> **Includes the leftover `Slice` removal**, moved here from #57. #43 replaced
> `Slice` with `Iterable` at the API level, but the type and its aliases remain:
>
> - [ ] Remove `Slice`, `SliceConstructor`, and `PredForSlice` from sources
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

Set parent to #32. Labels `tech-debt`, `groomed`. Milestone v2.0. Append:

> Offenders to rename to intent-revealing generic names:
>
> - `MapAccumOp<AccumVal, B, MapOfB, Index, SliceOfBs>` — `types/list.ts:29`
> - `Quinary<A, B, C, D, E, RetT>` — `types/arity.ts:11`
> - `Quaternary<A, B, C, D, RetT>` — `types/arity.ts:9`
>
> Positional single letters are acceptable for the arity types *if* documented
> as intentionally positional; otherwise rename them. Either way, decide and
> record the convention in `src/types/README.md` — that decision is what closes
> this issue.

## 4. Rescope the implementations review

### #122 — "v2.0 - Implementations review"

Keep open, but scope it so it stops competing with #32's checklist. Labels
`tech-debt`, `groomed`. Milestone v2.0. Prepend to the body:

> **Scope: behavioural review only** — implementation correctness and test
> coverage per module. The *typing* pass is tracked separately in #32; do not
> duplicate type checklists here.

If in practice the review turns out to be "finish the type cleanup, then re-read
each module," fold it into #32 and close it instead.

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

## 7. New issue to file

**Title:** v2.0 — Add tests asserting curried methods are actually curried

Labels `enhancement`, `groomed`. Milestone v2.0. This is the one remaining #57
item with no ticket of its own; #57's rewritten body references it.

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
> Idiomatic currying across all modules (#40, #77); set-theory consolidation
> #79; boolean-returning method arg order #80; `curry_` removal #86;
> generator-friendly `take`/`takeWhile` #87; nullish-check removal #90;
> `platform/` → `_platform/` #91; `apply` re-added #94; `unknown` generics
> removed #115; `tsconfig.prod.esm.json` consolidated.
>
> Sub-packages updated: `fjl-validator`, `fjl-inputfilter`,
> `fjl-validator-recaptcha`, `fjl-filter`, `fjl-labs`.
>
> ## Remaining for 2.0
>
> - [ ] #32 — type system cleanup (epic); includes #113, #114, #116
> - [ ] #102 — documentation generation strategy
> - [ ] #118 — CI hooks for `main`/`dev`
> - [ ] #121 — remaining iterator → generator conversions
> - [ ] #122 — implementations/behavioural review
> - [ ] *(new)* tests asserting curried methods are curried
>
> ## Out of scope for 2.0
>
> #120, #78, #103, #41, #38, #20 — see the Backlog milestone.

## Summary table

| Issue | Action | Type label | State | Milestone |
| --- | --- | --- | --- | --- |
| #57 | Rewrite as thin index | `enhancement`, `epic` | — | v2.0 |
| #32 | Retitle to epic; canonical checklist | `enhancement`, `tech-debt`, `epic` | `groomed` | v2.0 |
| #113 | Re-parent under #32 | `enhancement`, `tech-debt` | `groomed` | v2.0 |
| #114 | Re-parent; add `Slice` criteria + consumers | `tech-debt` | `groomed` | v2.0 |
| #116 | Re-parent; add offender list | `tech-debt` | `groomed` | v2.0 |
| #122 | Rescope to behavioural review | `tech-debt` | `groomed` | v2.0 |
| #121 | Write body; `replicate`/`unfoldr` remain | `enhancement` | `groomed` | v2.0 |
| #118 | Write body; workflow triggers | `ci/cd` | `groomed` | v2.0 |
| #102 | Confirm criteria | `enhancement`, `ci/cd` | `groomed` | v2.0 |
| #101 | Confirm still valid | `ci/cd` | `groomed` | v2.0 |
| *(new)* | Curried-method tests | `enhancement` | `groomed` | v2.0 |
| #61 | **Close** — duplicate of #32 | — | — | — |
| #55 | **Close** — obsolete/not planned | — | — | — |
| #120 | Write body; post-2.0 feature | `enhancement`, `wishlist` | `groomed` | Backlog |
| #103 | Add children or close | `epic`, `wishlist` | `needs-grooming` | Backlog |
| #78 | Write criteria or close | `enhancement` | `needs-grooming` | Backlog |
| #41 | Add criteria | `enhancement`, `tech-debt` | `groomed` | Backlog |
| #38 | Add criteria | `enhancement`, `tech-debt` | `groomed` | Backlog |
| #20 | Empty per-module checklist | `documentation`, `good first issue` | `groomed` | Backlog |
