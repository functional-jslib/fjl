# Haskell parity findings (#152)

> **Status: fixes applied, not yet merged, 2026-11-04.** See [Decisions](#decisions) and
> [Follow-ups](#follow-ups).

Compares each exported `fjl` method that has a Haskell counterpart against
[`Prelude`](https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Prelude.html)
and [`Data.List`](https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Data-List.html)
in `base-4.22.0.0`.

## Method
- **Reference:** the worked examples and laws in the pinned docs.
- **Checks:** 231 scripted checks, plus a smaller follow-up run for methods the
  first run missed. Each one ran `fjl` and compared the result with the documented
  value.
- **Haskell wasn't run:** GHC wasn't available, so expected values come from the
  docs, not from running Haskell. Where the docs give no example, the Haskell side
  comes from its documented rules or language semantics.
- **`$` forms:** not compared individually, as the issue allows for plain wrappers.

## Rule for comparing
Match Haskell's **behaviour** where it makes sense, meaning results, result order
and empty input. Don't adopt its **parameter order**. Argument and callback order
follow JavaScript's native methods and conventions `fjl` already uses, so `foldr`
stays `op(acc, x, i, xs)`, like `[].reduceRight`.

An argument-order difference is therefore a deliberate difference, not a bug. A
method that's out of line with its `fjl` siblings is still worth raising.

## Findings outside the audit
- **`defaultValueObscurer` was broken:** `fjl-validator`'s
  `take(n, repeat('*')).join('')` returned `"*,*,*,**,*,*,**,*,*,*"` for `'abc'`
  because `repeat` yielded growing lists. No test checked its output. Fixed by the
  generator change, with a regression test added.
- **`take` read too far:** it pulled one item more than it returned, so
  `take(1, iterate(throwingOp, 0))` threw. Fixed.

## Status key
| Status | Meaning |
| --- | --- |
| **Match** | Behaves as documented, apart from notation such as tuples being arrays |
| **Fixed** | Changed for #152, not yet merged |
| **Different** | Deliberate difference, to be kept and documented |

`Maybe` results map to a value or `undefined`, and that isn't listed as a difference.

## Fixed, not yet merged
| Method | Before | After |
| --- | --- | --- |
| `repeat` | Yielded one growing, shared array | Yields items: `take(3, repeat(17))` gives `[17, 17, 17]` |
| `cycle` | Yielded growing lists | Yields items, and walks strings by code point. Arrays are copied on first pull. Accepts any iterable, and an infinite one passes through |
| `cycle([])` | Yielded `[]` forever | Throws on first pull, so `take(0, cycle([]))` is still `[]` |
| `iterate` | Yielded one growing, shared array | Yields items |
| `replicateIter`, `unfoldrIter` | Yielded one growing, shared array | Yield items. `unfoldr` still returns the full list |
| `take` | Pulled `n + 1` items | Pulls exactly `n`. `take(0, null)` now gives `[]` instead of throwing, as Haskell's `take 0 undefined` does |
| `mapAccumR` | Result list reversed | Keeps input order |
| `groupBy` | Compared with the previous item | Compares with the group's first item: `equalityOp(first, item)` |
| `nubBy` | `pred(item, kept)`, array result for strings | `pred(kept, item)`, string result for strings |
| `splitAt` | `splitAt(-1, [1, 2, 3])` gave `[[1, 2], [3]]` | `[[], [1, 2, 3]]`, so the `take` and `drop` law holds |
| `replicate` | `replicate(-1, x)` threw `RangeError` | `[]` |
| `concat` | `concat([])` gave `undefined` | `[]` |
| `intercalate` | `intercalate(',', [])` gave `[]` | `''`, an empty list of the same type as the separator |
| `scanr`, `scanr1` | `fn(x, acc, i, xs)` | `fn(acc, x, i, xs)`, like `foldr` |
| `elem`, `notElem`, `elemIndex`, `includes`, `indexOf`, `lastIndexOf` | `(xs, x)` | `(x, xs)`, like `elemIndices` |
| `lines` | `lines('one\n')` gave `['one', '']`, `lines('')` gave `['']`, and `\r\n` split twice | `['one']`, `[]`, and `\r\n` is one break |
| `words` | Split on each space or tab | Splits on runs of any whitespace, and ignores it at the ends |
| `unlines` | `'a\nb'` | `'a\nb\n'` |
| `unionBy` | `pred(accumulatedList, x)` | `eq(a, b)`, built as Haskell defines it |
| `union` | Threw on strings, and treated `NaN` as equal to itself | Follows `unionBy`, gives a string for strings, and compares with `===` |
| `difference` | Removed every occurrence, and was arrays only | Removes one per item, so `(xs ++ ys) \\ xs == ys` holds, and gives a string for strings |
| `nub`, `intersect`, `intersectBy` | A string input gave an array | Gives a string |
| `remove`, `removeBy`, `removeFirstsBy` | Worked on UTF-16 units in strings | Work on code points |

## Inventory

### Basic functions
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `append` | `(++)` | Match | |
| `head`, `last` | `head`, `last` | Different | `undefined` on an empty list, where Haskell raises |
| `tail`, `init` | `tail`, `init` | Different | Empty list on an empty list, where Haskell raises |
| `uncons` | `uncons` | Match | |
| `unconsr` | `unsnoc` | Match | Different name |
| `isEmpty` | `null` | Match | Different name. Also true for a generator, which Haskell has no equivalent of |
| `length` | `length` | Match | `undefined` for nullish input |

### Transformations
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `map` | `map` | Different | Arrays only. Also passes `i, xs` to the callback |
| `reverse` | `reverse` | Different | Arrays only: throws on strings |
| `intersperse` | `intersperse` | Different | A string input gives an array |
| `intercalate` | `intercalate` | Fixed | |
| `transpose` | `transpose` | Match | |
| `subsequences` | `subsequences` | Match | Order matches, including strings |
| `permutations` | `permutations` | Different | Same set of results, different order: `abc`, `bac`, `cab`, `acb`, `bca`, `cba`, where Haskell gives `abc`, `bac`, `cba`, `bca`, `cab`, `acb`. Arrays only |

### Folds
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `foldl`, `reduce` | `foldl` | Match | |
| `foldl1` | `foldl1` | Different | `undefined` on an empty list, where Haskell raises |
| `foldr`, `reduceRight` | `foldr` | Different | `op(acc, x, i, xs)`, like native `reduceRight`. Same traversal, flipped callback |
| `foldr1` | `foldr1` | Different | The same flipped callback. `undefined` on an empty list |
| `concat` | `concat` | Fixed | |
| `concatMap` | `concatMap` | Match | From #141. `fn` must return a list |
| `and`, `or`, `any`, `all` | `and`, `or`, `any`, `all` | Match | Truthiness, not `Bool` |
| `sum`, `product` | `sum`, `product` | Match | Includes the floating-point examples |
| `maximum` | `maximum` | Different | `undefined` on an empty list. Ties pick the rightmost, as documented |
| `minimum` | `minimum` | Different | `undefined` on an empty list. Ties pick the leftmost, as documented |

### Scans and accumulating maps
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `scanl`, `scanl1` | `scanl`, `scanl1` | Match | `last(scanl(f, z, xs)) === foldl(f, z, xs)` holds |
| `scanr`, `scanr1` | `scanr`, `scanr1` | Fixed | `fn(acc, x, i, xs)`, like `foldr`, where Haskell's is `f x acc` |
| `mapAccumL` | `mapAccumL` | Match | |
| `mapAccumR` | `mapAccumR` | Fixed | |

### Generators
All of these are single-use generators, not lists. See
[Limits of generators](#limits-of-generators).

| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `iterate` | `iterate` | Fixed | `op` runs on pull, so it's closer to `iterate'` |
| `repeat` | `repeat` | Fixed | |
| `cycle` | `cycle` | Fixed | |
| `replicate` | `replicate` | Fixed | Eager |
| `unfoldr` | `unfoldr` | Match | Eager, so it never returns for an unbounded `op`. Use `unfoldrIter` there |
| `replicateIter`, `unfoldrIter` | Lazy `replicate`, `unfoldr` | Fixed | |

### Sublists
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `take`, `drop` | `take`, `drop` | Different | Results match for arrays, including negative counts. A string input gives an array. `take` was also [fixed](#fixed-not-yet-merged) |
| `splitAt` | `splitAt` | Fixed | |
| `takeWhile`, `dropWhile` | `takeWhile`, `dropWhile` | Different | A string input gives an array |
| `dropWhileEnd` | `dropWhileEnd` | Match | Includes strings |
| `span` | `span` | Match | |
| `breakOnList` | `break` | Match | Different name, because `break` is reserved |
| `stripPrefix` | `stripPrefix` | Different | Returns the list unchanged when the prefix doesn't match, where Haskell gives `Nothing` |
| `group` | `group` | Match | Includes strings |
| `groupBy` | `groupBy` | Fixed | |
| `inits`, `tails` | `inits`, `tails` | Match | |
| `isPrefixOf`, `isSuffixOf`, `isInfixOf` | Same names | Match | Empty needles give `true` |
| `isSubsequenceOf` | `isSubsequenceOf` | Match | `false` for nullish lists |

### Searching and indexing
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `elem` | `elem` | Fixed | `(x, xs)` |
| `includes` | `elem` | Fixed | `(x, xs)` |
| `notElem` | `notElem` | Fixed | `(x, xs)` |
| `lookup` | `lookup` | Different | Takes a key and an object, not an association list |
| `find` | `find` | Match | |
| `filter` | `filter` | Different | Arrays only: throws on strings |
| `partition` | `partition` | Different | A string input gives arrays |
| `at` | `(!?)`, `(!!)` | Different | `(i, xs)`, and negative indexes count from the end, like native `at`. Out of range gives `undefined` |
| `elemIndex` | `elemIndex` | Fixed | `(x, xs)`. `undefined` when nothing matches |
| `indexOf` | `elemIndex` | Different | `(x, xs)`, and `-1` when nothing matches, like native |
| `elemIndices` | `elemIndices` | Match | `(x, xs)` |
| `findIndex` | `findIndex` | Different | `-1` when nothing matches, like native |
| `findIndices` | `findIndices` | Match | |

### Zipping
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `zip`, `zip3`, `zip4` | `zip`, `zip3`, `zip4` | Different | Arrays, not tuples, with matching results. Generators give `[]` |
| `zipN` | `zip3` to `zip7` | Different | Any number of lists. `zipN()` throws |
| `zipWith` | `zipWith` | Match | The law `zipWith((a, b) => [a, b], xs, ys)` equals `zip(xs, ys)` holds |
| `zipWith3` | `zipWith3` | Different | Arrays only, so the docs' string example throws |
| `zipWithN` | `zipWith3` to `zipWith7` | Match | Any number of lists. `zipWithN(op)` gives `[]` |
| `unzip` | `unzip` | Match | |
| `unzipN` | `unzip3` to `unzip7` | Different | `unzipN([])` gives `[]`, because the number of lists can't be known |

### Strings
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `lines` | `lines` | Fixed | `\r`, `\r\n` and `\n\r` also count as one line break |
| `words` | `words` | Fixed | Whitespace is JavaScript's `\s`, which also includes `\uFEFF` |
| `unlines` | `unlines` | Fixed | |
| `unwords` | `unwords` | Match | |

### "Set" operations
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `nub` | `nub` | Fixed | |
| `nubBy` | `nubBy` | Fixed | |
| `remove` | `delete` | Match | Different name, because `delete` is reserved |
| `removeBy` | `deleteBy` | Match | |
| `removeFirstsBy` | `deleteFirstsBy` | Match | |
| `difference` | `(\\)` | Fixed | |
| `union` | `union` | Fixed | |
| `unionBy` | `unionBy` | Fixed | |
| `intersect` | `intersect` | Fixed | |
| `intersectBy` | `intersectBy` | Fixed | |

### Ordered lists
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `sort` | `sort` | Different | Arrays only: throws on strings. Stable |
| `sortBy` | `sortBy` | Match | Takes a number-returning comparator, not `Ordering` |
| `sortOn` | `sortOn` | Match | Stable |
| `insert` | `insert` | Match | Includes strings |
| `insertBy` | `insertBy` | Match | Includes strings |

### `Prelude` functions
| `fjl` | Haskell | Status | Notes |
| --- | --- | --- | --- |
| `isEven`, `isOdd` | `even`, `odd` | Match | Different names. Includes negative and large numbers |
| `until` | `until` | Match | |
| `flip` | `flip` | Match | |
| `id` | `id` | Match | |
| `compose` | `(.)` | Match | Takes any number of functions |
| `range` | `[a..b]`, `[a,b..c]` | Different | Counts down when `from > to`, where `[4..1]` is empty in Haskell |

### Same name, different meaning
| `fjl` | Haskell | Notes |
| --- | --- | --- |
| `not` | `not :: Bool -> Bool` | `fjl`'s takes a list and checks that every item is falsy, so `not(true)` gives `true` |
| `curry` | `curry` | `fjl`'s does partial application by arity. Haskell's turns a tuple function into a two-argument one |

### No `fjl` counterpart
Not exported, and listed for completeness: `singleton`, `maximumBy`, `minimumBy`,
`zip5` to `zip7`, `zipWith4` to `zipWith7`, `uncurry`, `const`, `subtract`, `gcd`,
`lcm`.

## Limits of generators
These remain after the generator fixes, and need documenting:
- **Single use:** a second `take` on the same generator gives `[]`, because `take`
  closes it. A Haskell list can be read any number of times.
- **Array-based methods don't accept them:** this already happened before the
  generator change.
  - `zip([1, 2], gen)` and `zipWith(add, [1, 2], gen)` give `[]`.
  - `head`, `find` and `length` give `undefined`.
  - `any` gives `false`, `all` gives `true`, and `foldl(add, 0, gen)` gives `0`.
  - `map`, `filter`, `tail`, `last`, `at`, `splitAt` and `span` throw.
- **`drop` and `dropWhile`:** neither returns on an infinite generator, because
  each collects everything that remains.

Supporting generators in those methods is tracked in #155.

## Decisions
Made by the project owner on 2026-11-04.

1. **`scanr`, `scanr1`:** moved to `fn(acc, x, i, xs)`. The law
   `head(scanr(f, z, xs)) === foldr(f, z, xs)` now holds in `fjl`'s own order.
2. **Value searches:** `elem`, `notElem`, `elemIndex`, `elemIndices`, `includes`, `indexOf`
   and `lastIndexOf` all take `(x, xs)`, even where the native method is called on the list.
   This refines the [rule for comparing](#rule-for-comparing).
3. **`stripPrefix`:** keeps returning the list unchanged when the prefix doesn't match.
   A method that returns a variation of its list returns the list when nothing changes.
4. **`lines`, `words`, `unlines`:** match Haskell. `lines` still counts `\r`, `\r\n` and
   `\n\r` as one line break, as its doc comment promised.
5. **"Set" methods:** match Haskell, including strings giving strings.
   `complement` has no counterpart, and keeps its results.
6. **`nubBy`:** keeps `pred(kept, item)`.

## Follow-ups
- **#154:** under decision 3, some methods don't return the list when nothing changes for
  a string input. `take`, `drop`, `takeWhile`, `dropWhile` and `intersperse` give an array,
  and `filter`, `map`, `sort`, `sortBy`, `sortOn` and `reverse` throw. Arrays are fine.
- **#155:** accept generators wherever Haskell permits an infinite list. See
  [Limits of generators](#limits-of-generators).

## Remaining work
- [x] Resolve the decisions and apply the results.
- [x] Document the deliberate differences, in doc comments for the ones #152 names and in
  this file's tables for the rest.
- [x] Add `md/MIGRATION_V2.md` entries for the fixes above, including the generators
  and `take`.
- [x] Add tests for the fixes, checking the documented law where there is one.
- [x] Open tickets for the [follow-ups](#follow-ups).
- [ ] Open the PR.
