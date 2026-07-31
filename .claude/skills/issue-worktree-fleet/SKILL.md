---
name: issue-worktree-fleet
description: >
  Orchestrates work on a GitHub issue in the fjl monorepo by decomposing it into
  independent work units, creating a git worktree per unit under
  `.claude/worktrees/`, and dispatching sub-agents (a fleet) to implement, lint,
  test, build, commit, and open PRs in parallel. Use this when asked to work on a
  fjl GitHub issue that spans multiple packages, modules, or otherwise splits
  into independent changes.
---

# Issue Worktree Fleet (fjl monorepo)

You are an orchestrator that breaks a GitHub issue into parallel work units,
assigns each to a sub-agent running in its own git worktree, and ensures every
unit is linted, tested, built, committed, and opened as a PR.

Ask the user to switch to an auto-approving permission mode (`/permissions`)
once the decomposition plan is agreed — the fleet runs many `pnpm` and `git`
commands per unit.

## Repository facts the fleet depends on

| Thing | Value |
| --- | --- |
| Repo | `functional-jslib/fjl` (pnpm 8 workspace monorepo, TypeScript) |
| Published packages | `packages/fjl`, `packages/fjl-validator`, `packages/fjl-inputfilter`, `packages/fjl-validator-recaptcha` |
| Unpublished/parked | `packages/fjl-filter`, `packages/fjl-labs` (not in the jest `projects` list) |
| PR base branch | `main` (every recent PR targets `main`; `dev` is a long-lived integration branch — only target it if the user asks) |
| Package manager | `pnpm` (see `packageManager` in `package.json`; `engines.node >= 16`, `.nvmrc` pins the dev version) |
| Test runner | jest + ts-jest, root config `jest.config.mjs`, one project per package |
| Build | rollup (`rollup.config.mjs`) via `pnpm build` |
| Lint | eslint 8 + `@typescript-eslint` via `pnpm lint` / `pnpm lintfix` (repo-wide run is currently red — see the quality gate) |
| Commit lint | husky `commit-msg` → commitlint `@commitlint/config-conventional` |
| Pre-commit hook | `pnpm lint-staged` → `tsc-files --noEmit` + `eslint --fix` on staged `*.{js,cjs,mjs,ts}` |
| Pre-push hook | `pnpm test && pnpm build` (slow — expect minutes per unit) |

### Package dependency graph (drives decomposition)

```
fjl  ←  fjl-validator  ←  fjl-inputfilter
 ↑
 └── fjl-validator-recaptcha
```

`fjl-validator` and `fjl-inputfilter` import types and functions from `fjl`
(e.g. `Slice`, `lengthValidator`, `input.ts`). **A change to `fjl`'s public
types is not independent of its dependents** — see "Cross-package changes"
below.

## Workflow overview

```
Issue → Analyze → Decompose → Create worktrees → Dispatch fleet → Commit & PR → Cleanup
```

## Phase 1: Issue analysis

1. Fetch the issue: `gh issue view <number> --json title,body,labels,milestone,comments`.
   Also fetch sub-issues / linked issues it references.
2. Read title, body, labels, milestone, and comments to understand full scope.
3. Check `md/issues/` — the repo keeps groomed issue plans there
   (e.g. `md/issues/ISSUE_GROOMING.md`). If the issue is covered by a plan
   document, that document's acceptance criteria and verified findings win over
   the issue body's original wording.
4. Identify the **acceptance criteria** — what must be true for the issue to be
   done. If the issue has none, write them out and confirm with the user before
   decomposing.

## Phase 2: Work decomposition

Break the issue into **logical work units** — independent, parallelizable
chunks. Each unit must be:

- **Self-contained**: completable without another unit's uncommitted changes.
- **Bounded**: named files, a module directory, or a single package.
- **Independently testable**: `pnpm test:<package>` can validate it alone.

### Decomposition strategies

| Issue type | Strategy |
| --- | --- |
| Change spanning several packages | One unit per package — **only if** the packages don't depend on each other for this change |
| Typing cleanup across `packages/fjl/src` | One unit per module directory (`list/`, `object/`, `string/`, `function/`, `_platform/`, `types/`) |
| Feature + tests + docs | Impl+tests as one unit; `md/` or `README.md` docs as a separate unit |
| Refactor across modules | One unit per module or logical grouping |
| Bug fix + regression test | Single unit (tightly coupled) |
| Several unrelated fixes in one issue | One unit per fix |
| Build/CI/tooling change (`rollup.config.mjs`, `.github/workflows/`, `node_scripts/`) | Single unit — these are global and conflict-prone |

### Cross-package changes (fjl-specific rule)

If a unit changes anything in `packages/fjl/src/types/` or otherwise alters
`fjl`'s public surface, check for downstream usage **before** splitting:

```bash
rg -l 'Slice|SliceConstructor|PredForSlice' packages/fjl-validator/src packages/fjl-inputfilter/src
```

If there are downstream call sites, make the change **one unit** covering `fjl`
plus every affected sibling package. Splitting it leaves `main` broken between
merges, since the workspace resolves siblings via `workspace:` protocol against
the local source.

### Work unit definition

For each unit define:

- **ID**: kebab-case (e.g. `list-generators`, `drop-slice-type`, `docs-readme`)
- **Title**: short description
- **Description**: files to touch, behaviour to implement, tests to write
- **Package(s)**: which `packages/*` it touches — drives which test script it runs
- **Branch**: `<type>/#<issue>/<unit-id>` (e.g. `feat/#121/list-generators`),
  matching the repo's existing `feat/#55/deno_support` style
- **Dependencies**: unit IDs it depends on (prefer none)

### Dependency handling

- Independent units run in parallel.
- If B depends on A, run A first, then branch B's worktree from A's branch.
- Minimize dependencies. If the whole issue is tightly coupled, use **one unit**
  and take the single-unit fallback path (below).

## Phase 3: Worktree setup

From the repository root, one worktree per unit:

```bash
git fetch origin main
git worktree add .claude/worktrees/<issue>-<unit-id> -b <type>/#<issue>/<unit-id> origin/main
```

### Rules

- All worktrees live in `.claude/worktrees/` (git-ignored — see `.gitignore`).
- Branch from `origin/main` unless the unit depends on another unit's branch.
- Verify the worktree exists (`git worktree list`) before dispatching an agent.
- **Each worktree needs its own install**: a fresh worktree has no
  `node_modules`. The sub-agent must run `pnpm i` in the worktree root first —
  this also links the workspace packages to each other.

## Phase 4: Fleet dispatch

Dispatch one sub-agent per unit with the `Agent` tool, `subagent_type:
"general-purpose"`, run in the background so units proceed concurrently. Do
**not** pass `isolation: "worktree"` — the worktrees are created explicitly
above and the agent is told to `cd` into its own.

### Sub-agent prompt template

```
You are working on issue #<NUMBER> in the fjl monorepo: "<ISSUE TITLE>".

<ISSUE BODY / ACCEPTANCE CRITERIA>

## Your assignment: work unit "<UNIT TITLE>"
<UNIT DESCRIPTION>

## Working directory
Work only inside: <WORKTREE_PATH>
`cd <WORKTREE_PATH>` before anything else. Never touch the main checkout at
<REPO_ROOT> or any sibling worktree.

## Branch
You are on: <BRANCH_NAME>

## Scope
Files in scope:
<LIST OF FILES / DIRECTORIES>
Do not modify files outside this scope. If the work turns out to require
out-of-scope files, stop and report back instead of widening the scope.

## Setup (once, first thing)
cd <WORKTREE_PATH> && pnpm i

## Quality gate — all must pass before committing
1. npx eslint -c .eslintrc.json --fix <changed files>   # what the pre-commit hook runs
2. npx tsc-files --noEmit <changed .ts files>           # also what the pre-commit hook runs
3. pnpm test:<PACKAGE>                                  # e.g. pnpm test:fjl — fast, unit-scoped
4. pnpm test                                            # full suite, before committing
5. pnpm build                                           # rollup build must succeed

Notes on the two checks that are scoped to *your* files, and why:
- Repo-wide `pnpm lint` currently exits 1 with 21 pre-existing errors, all in
  generated/vendored `docs/*.js` (which `.gitignore` ignores but `.eslintignore`
  does not). Use it for information only; the gate is eslint over your own
  changed files. Never "fix" `docs/` to make it green.
- Bare `npx tsc --noEmit`, and `-p packages/fjl-validator|fjl-inputfilter`,
  report pre-existing `TS1110: Type expected` errors out of
  `packages/fjl/dist/esm/**/*.d.ts` (stale generated declarations). Those are
  not yours. If your unit is inside `packages/fjl`, you can additionally run the
  whole-package check `npx tsc --noEmit -p packages/fjl/tsconfig.json`, which is
  currently clean.

Other notes:
- Do NOT run the `fjl-validator-recaptcha` suite. It is commented out of
  `jest.config.mjs`, needs puppeteer + Chrome, and binds a fixed mock-server
  port (10087) that would collide with other fleet agents.
- Jest collects coverage by default. There is no enforced threshold: keep new
  and changed code covered by tests, and do not regress existing coverage.
- ts-jest type-checks the sources it loads, so `pnpm test` is itself a partial
  type gate.

## Tests
- Test files live in `packages/<pkg>/tests/` and match
  `**/(tests|src)/**/*(.test|_test|.spec).(ts|js)` or `**/tests/test-*.(ts|js)`.
- Follow the style of the neighbouring test files in the package you touch.

## Also update, when applicable
- Unit tests for changed behaviour
- `packages/<pkg>/README.md` if the public API changes
- Docs under `md/` if the issue's plan document tracks the change
- Type declarations under `packages/fjl/src/types/` if signatures change

## Commit message format (commitlint: @commitlint/config-conventional)
<type>: issue-#<issue-number> - <description>

- Types: feat, fix, refactor, test, docs, chore, build, ci, perf, style, revert
- Optional scope: `feat(fjl): issue-#121 - ...`
- Header <= 100 chars, no trailing period, don't start the subject with a
  capitalized sentence-case word.
- Example: `feat: issue-#121 - convert replicate and unfoldr to generators`
- Include the trailer:
  Co-Authored-By: Claude <noreply@anthropic.com>

## When done
1. Commit (the pre-commit hook runs lint-staged; the pre-push hook runs
   `pnpm test && pnpm build`, so expect the push to take minutes):
   cd <WORKTREE_PATH>
   git add -A
   git commit -m "<COMMIT_MESSAGE>" -m "Co-Authored-By: Claude <noreply@anthropic.com>"

2. Push:
   git push -u origin <BRANCH_NAME>

3. Open the PR:
   gh pr create --base main --head <BRANCH_NAME> \
     --title "<type>: issue-#<issue> - <unit title>" \
     --body "## Summary

   <what this PR does>

   ## Related issue

   Part of #<issue-number>

   ## Work unit

   **ID**: <unit-id>
   **Packages**: <packages touched>

   ## Changes

   - <list>

   ## Testing

   - <commands run and their results>"

4. Report back: PR URL, summary of changes, and the actual output of the
   lint/type-check/test/build commands. Report failures honestly — do not
   claim a gate passed if it did not.
```

## Phase 5: Monitoring & completion

1. Monitor the sub-agents; use `SendMessage` to a running agent to redirect or
   ask for detail rather than re-spawning it.
2. Collect PR URLs, summaries, and failures.
3. Handle failures:
   - Read the agent's output, diagnose, then retry or finish the unit yourself.
   - Broken worktree: `git worktree remove --force .claude/worktrees/<name>`.
   - Merge conflicts between units mean the decomposition was wrong — collapse
     the conflicting units into one and redo them serially.
4. Report to the user: every PR with its URL and scope, any unit that failed or
   needs manual attention, and which PR(s) close the issue vs. only advance it.

## Phase 6: Cleanup

```bash
git worktree remove .claude/worktrees/<issue>-<unit-id>
git worktree prune
```

Remove worktrees only after the PRs are open — the branches survive removal, so
nothing is lost. Leave the branches alone; they are deleted on merge.

## Guidelines

### Do NOT

- Commit to `main` or `dev` directly — always a worktree branch + PR.
- Split a change to `fjl`'s public types away from the sibling packages that
  consume them.
- Run the `fjl-validator-recaptcha` / puppeteer suite in a parallel fleet
  (fixed port 10087, and it is disabled in `jest.config.mjs`).
- Skip lint, type-check, test, or build before committing.
- Bypass the husky hooks (`--no-verify`, `HUSKY=0`) — the hooks are the gate.
  `HUSKY=0` belongs to CI only.
- Force-split tightly coupled work, or leave worktrees behind.
- Edit lockfiles or `package.json` versions unless the unit is explicitly about
  dependencies or releases.

### DO

- Use `gh` for all GitHub operations.
- Put the issue number in every branch name, commit subject, and PR body.
- Run `pnpm i` in each fresh worktree before anything else.
- Prefer fewer, well-scoped units over many tiny ones.
- Ask the user when decomposition is genuinely ambiguous.

### Single-unit fallback

For a small or tightly coupled issue, skip the fleet: create one worktree, do
the work yourself, run the same quality gate, commit, and open one PR.

## Quick reference

```
Worktree path:  .claude/worktrees/<issue>-<unit-id>
Branch:         <type>/#<issue>/<unit-id>
Commit:         <type>: issue-#<issue> - <description>
PR base:        main
Setup:          pnpm i (per worktree)
Quality gate:   eslint --fix <changed> → tsc-files --noEmit <changed> → pnpm test:<pkg> → pnpm test → pnpm build
Known-red:      repo-wide `pnpm lint` (docs/*.js) and bare `tsc --noEmit` (fjl/dist/*.d.ts)
Skip:           fjl-validator-recaptcha suite (puppeteer, port 10087)
```
