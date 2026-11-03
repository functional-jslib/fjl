# Generator conversion audit — `list/` (#121)

> **Status: applied — 2026-07-31.** `replicate` and `unfoldr` gained lazy
> siblings (`replicateIter`, `unfoldrIter`); the `scan*`/`zip*`/`unzip*` families
> were audited and **stay eager**, for the reasons recorded below. No existing
> return type changed, so the change set is non-breaking.

`fjl` is published (`fjl@2.0.0-alpha.5`), so turning a function that returns
`T[]` into one that returns a `Generator` is a breaking change for every
consumer that indexes, `.length`s, `.map`s, or spreads the result. #121's own
rule governs the whole audit:

> Where a generator would break existing consumers, keep the eager version and
> add a `*`-suffixed generator sibling rather than changing the return type.

All claims below were verified against the working tree at `61a9632d`
("Merge pull request #127 from functional-jslib/chore/issue-worktree-fleet-skill").

## Contents

- [Naming](#naming)
- [The two conversions](#the-two-conversions)
- [Audit verdicts](#audit-verdicts)
- [Why the scan family stays eager](#why-the-scan-family-stays-eager)
- [Why the zip/unzip family stays eager](#why-the-zipunzip-family-stays-eager)
- [What would unblock the deferred conversions](#what-would-unblock-the-deferred-conversions)
- [Incidental findings — not fixed here](#incidental-findings--not-fixed-here)

## Naming

`Iter` suffix — `replicateIter`, `unfoldrIter`, curried as `$replicateIter` and
`$unfoldrIter`.

`*` is not a legal identifier character, so "`*`-suffixed" is read as its
in-repo realization: `range.ts` already ships eager `range` alongside the
generator `rangeIter`, and that is the only existing eager/lazy sibling pair in
the codebase. New pairs follow it rather than inventing a second convention.

Note that `rangeIter` carries an `@todo Rename to 'range'`, i.e. the eventual
v2 intent is generator-primary naming across the family. When that rename
happens it should move `range`, `replicate`, and `unfoldr` together, as one
deliberate breaking change with a migration note — not one function at a time.

## Yield shape

The already-converted generators (`cycle`, `iterate`, `repeat`) do **not** yield
elements; they yield the *list built so far*, growing by one on each iteration
(`Generator<T[], void>`). The new siblings follow that exactly, which gives a
law worth stating:

> The last value a `*Iter` generator yields is (deep) equal to what its eager
> counterpart returns.

Both properties are asserted in `tests/list/test-replicate.ts` and
`tests/list/test-unfoldr.ts`. As in `iterate`/`repeat`, the yielded array is the
same growing reference each time — callers wanting a snapshot must `slice` it.
This is documented on both new functions.

## The two conversions

| Function | Decision | Reason |
| --- | --- | --- |
| `replicate` | Keep eager, add `replicateIter` | Bounded by construction — `n` is finite, so nothing to "stop early" from and no non-termination to avoid. Converting outright would break `.length`/indexing consumers for zero correctness gain. The sibling is still worth having: `replicate` is the bounded form of `repeat`, and `replicateIter(Infinity, x)` degenerates to `repeat(x)` — something eager `replicate` cannot express at all (`Array(Infinity)` throws). |
| `unfoldr` | Keep eager, add `unfoldrIter` | Laziness is a real fix here: an `op` that never returns `undefined` makes the eager `unfoldr` loop forever, and `unfoldrIter` makes that same `op` consumable. But `unfoldr` has a live in-repo array consumer — `src/list/unzipN.ts` uses its result as a `T[][]` seed — plus `tests/object/index_test.ts`, so changing the return type is a breaking change with an in-tree casualty. Sibling route. |

The eager `unfoldr` is now implemented **in terms of** `unfoldrIter` (it drains
the generator and returns the last yield), so the two cannot drift apart. Eager
`replicate` keeps its `Array(n).fill(...)` fast path — the generator is not a
faster way to fill a fixed-size array.

Both new generators compose with the already generator-friendly `take` /
`takeWhile` from #87, which accept `Iterable`.

## Audit verdicts

| Function | Verdict | Rationale |
| --- | --- | --- |
| `scanl` | Stay eager; lazy sibling deferred | Genuinely streamable — result element `i` depends only on elements `0..i`. Deferred only because the input is an `A[]`, already fully materialized, so a sibling buys nothing until list functions accept `Iterable`. |
| `scanl1` | Stay eager; deferred with `scanl` | Thin wrapper over `scanl`; follows whatever `scanl` does. |
| `scanr` | **Stay eager — permanently** | Right-to-left: the first result needs the *last* input element, so no output can be produced before the entire input is consumed. A generator would be a lie — all the work happens before the first yield. |
| `scanr1` | **Stay eager — permanently** | Wrapper over `scanr`; additionally calls `last(xs)`/`init(xs)`, which are whole-list operations. |
| `zip` | Stay eager; lazy sibling deferred | Streamable in principle (yield pairs as both inputs advance), but the current implementation calls `toShortest`, which measures both lists up front — it is array-shaped by construction. Value only appears once inputs may be `Iterable` (the classic `zip(naturals, xs)` case). |
| `zip3`, `zip4`, `zipN` | Stay eager; deferred with `zip` | All delegate to `zipN`/`toShortest`; same reasoning, same blocker. |
| `zipWith`, `zipWith3`, `zipWithN` | Stay eager; deferred with `zip` | Same shape as `zip`, with an op applied per pair. |
| `unzip` | **Stay eager — permanently** | Returns a *tuple of lists* (`[T1[], T2[]]`), not a list. There is nothing to yield: emitting the second output list lazily would require buffering the whole input anyway. Not a generator-shaped function. |
| `unzipN` | **Stay eager — permanently** | Same as `unzip`, generalized to `T[][]`. Also folds over the entire input to fill every output list in one pass. |

## Why the scan family stays eager

The distinction is direction, not effort. `scanl` walks left-to-right and could
emit each accumulated value as it goes, so it is a legitimate future generator.
`scanr` walks right-to-left and its *first* output depends on the *last* input;
converting it would produce a generator that does 100% of its work before the
first `next()` returns — worse than eager (same cost, more indirection, plus a
misleading laziness contract).

The deferral of `scanl`/`scanl1` is about inputs, not outputs. Both take `A[]`.
When the caller already holds the whole array, a lazy scan saves only the
`fn` applications past the caller's break point — a real but small win, and not
worth two more public exports right now. It becomes clearly worth it the moment
`scanl` accepts an `Iterable`, at which point `scanlIter` should land in the
same change as that signature widening.

## Why the zip/unzip family stays eager

`zip*` splits cleanly from `unzip*`:

- `zip*` is *deferred*. Zipping is the canonical lazy operation in Haskell
  precisely because it lets you zip an infinite list against a finite one. In
  `fjl` today it cannot: every entry point routes through `toShortest`, which
  needs both lengths, and both parameters are typed `T[]`. Converting the output
  alone would not deliver the property that makes lazy `zip` interesting.
- `unzip*` is *permanently* eager. It is not a list producer — it produces a
  fixed-size tuple of lists. There is no meaningful yield sequence, and
  producing the second output stream lazily would require retaining the entire
  input regardless. It is the one family in this audit that should never get a
  generator sibling.

## What would unblock the deferred conversions

Everything marked "deferred" above is blocked on the same prerequisite: **list
functions accepting `Iterable<T>` inputs rather than `T[]`**. `take` and
`takeWhile` already do (#87); `scanl` and `zip*` do not. That widening is its
own piece of work — it touches `toShortest`, `reduce`, and `length` in
`list/utils/` — and should be tracked separately. Until then, adding `scanlIter`
or `zipIter` would ship the lazy half of a pipeline whose eager half still
forces the whole input.

## Incidental findings — not fixed here

Found while auditing; recorded so they are not lost. All four are pre-existing
and out of scope for #121, which is a laziness ticket, not a semantics ticket.

| Finding | Detail |
| --- | --- |
| `scanr`'s doc-comment is wrong | It claims `head(scanr(fn, z, xs)) === foldr(fn, z, xs)`. Verified: `scanr((a, b) => a + b, 0, [1, 2, 3])` returns `[3, 5, 6]` while `foldr` returns `6` — it is **`last`**, not `head`, that matches. The implementation pushes right-to-left, so the output is reversed relative to the Haskell original. |
| `scanl` omits the seed | Haskell's `scanl (+) 0 [1,2,3]` is `[0,1,3,6]`; `fjl`'s returns `[1,3,6]`. The doc-comment reproduces the Haskell form (`[z, z \`f\` x1, ...]`), which the implementation does not satisfy. `last(scanl f z xs) === foldl f z xs` *does* hold. |
| `scanl1` drops the head | Haskell's `scanl1 (+) [1,2,3]` is `[1,3,6]`; `fjl`'s returns `[3,6]`, because it forwards `xs[0]` as the seed and the seed is not emitted. Its doc-comment asserts the Haskell form. |
| `scanr1` drops the last | `scanr1((a, b) => a + b, [1,2,3])` returns `[5,6]`, symmetric to the `scanl1` case. |

The four are one decision, not four: either `scan*` emits the seed (Haskell
semantics, breaking) or the doc-comments are corrected to describe what the code
does (non-breaking). It belongs with #122's per-module implementation review.
