---
name: issue-worktree-fleet
description: >
  Orchestrates work on a fjl GitHub issue by decomposing it into independent
  work units, creating a git worktree per unit under `.claude/worktrees/`, and
  dispatching sub-agents (a fleet) to implement, lint, test, build, commit, and
  open PRs in parallel. Use when asked to work on a fjl issue that spans
  multiple packages or modules.
---

# Issue Worktree Fleet (fjl monorepo)

This is a pointer. The skill has a single source of truth, kept in the Claude
skills directory so both agents read the same instructions:

**[`.claude/skills/issue-worktree-fleet/SKILL.md`](../../../.claude/skills/issue-worktree-fleet/SKILL.md)**

Read that file in full and follow it. Do not act on this summary alone, and do
not duplicate the instructions here — edit the canonical file instead, so the
two never drift.

## What it covers, in one paragraph

Fetch and understand the issue (`gh issue view`, plus any plan document under
`md/issues/`), decompose it into independent units bounded by package or module,
create `.claude/worktrees/<issue>-<unit-id>` branched from `origin/main` as
`<type>/#<issue>/<unit-id>`, then dispatch one background sub-agent per unit.
Each agent runs `pnpm i` in its own worktree, then the quality gate (eslint
`--fix` and `tsc-files --noEmit` over its changed files → `pnpm test:<pkg>` →
`pnpm test` → `pnpm build`), commits as `<type>: issue-#<issue> - <description>`
under commitlint's conventional rules, pushes, and opens a PR against `main`.
Three repo-specific constraints the canonical file explains in detail: changes
to `fjl`'s public types must stay in the same unit as the `fjl-validator` /
`fjl-inputfilter` code that consumes them; the `fjl-validator-recaptcha`
puppeteer suite must not run in a parallel fleet (fixed mock-server port 10087,
and it is disabled in `jest.config.mjs`); and the repo-wide `pnpm lint` and bare
`tsc --noEmit` runs are already red on generated files, so the gate is scoped to
the files a unit actually changed.
