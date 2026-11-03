# Migrating `fjl` to 2.0

These notes cover changes since `2.0.0-alpha.5`, the last published version. The removed names were found by comparing that version's published exports with the 2.0 build.

If you're coming from 1.x, this list is a starting point, not a complete one, because 1.x wasn't compared.

## Check these first

These changes don't throw or fail to compile. Calls keep working but give different results.

| Method | 2.0 behaviour |
| --- | --- |
| `isSuffixOf`, `$isSuffixOf` | Takes the needle first, like `isPrefixOf`: `isSuffixOf('bc', 'abc')`. Calls in the old order usually just return `false`. |
| `concatMap`, `$concatMap` | Flattens by one level: `concatMap(x => [x, x], [1, 2])` gives `[1, 1, 2, 2]`. `fn` must return a list, and throws otherwise. |
| `isSubsequenceOf` | Respects order: `isSubsequenceOf('bad', 'abcdef')` is now `false`. |
| `breakOnList` | Returns `[prefix, remainder]`, and splits on the first item that satisfies the predicate. |
| `scanl`, `scanr` | Include the seed: `scanl(add, 0, [1, 2])` gives `[0, 1, 3]`, and `scanr(add, 0, [1, 2])` gives `[3, 2, 0]`. An empty list gives `[seed]`. |
| `scanl1`, `scanr1` | For `[1, 2, 3]` and `add`, these give `[1, 3, 6]` and `[6, 5, 3]`. |
| `all`, `and`, `not` | Return `true` for an empty list. `any` and `or` still return `false`. |
| `findIndices`, `elemIndices` | Return `[]`, not `undefined`, when nothing matches. |
| `isPrefixOf`, `isInfixOf`, `isSuffixOf` | Return `true` for an empty needle. |
| `inits` | `inits('')` gives `['']`, and `inits([])` gives `[[]]`. |
| `take` | Returns `[]` for a negative count. |
| `subsequences` | Keeps string items in order: `'ab'`, not `'ba'`. |
| `zipWithN` | Applies its operation when given a single list. |

## Bugs fixed

These calls threw or returned something unusable before, so no migration should be needed:

- `of` on plain objects and class instances returned `undefined`.
- `copy` threw on plain objects, class instances, `Date`, `RegExp` and `BigInt`.
- `mapObj` always threw.
- `searchObj` returned the wrong node for dotted paths, and threw on a null in the path.
- `lookup` threw on a `null` or `undefined` object.
- `isPrimitive` returned `true` for functions.
- `isGeneratorFunction` always threw.
- `insert` misplaced items on one-item lists.
- `randChar` wrapped above `0xFFFF`.
- `$assignDeep` didn't forward its objects.

`copy` now returns `WeakMap` and `WeakSet` values as is, because their contents can't be enumerated. It used to return an empty copy.

## Removed methods

| Removed | Use instead |
| --- | --- |
| `findWhere`, `$findWhere` | `find`, `$find` |
| `findIndexWhere`, `$findIndexWhere` | `findIndex`, `$findIndex` |
| `findIndicesWhere`, `$findIndicesWhere` | `findIndices`, `$findIndices` |
| `findIndexWhereRight`, `$findIndexWhereRight` | `findLastIndex`, `$findLastIndex` |
| `genCycler`, `$cycle` | `cycle`, which is now a generator |
| `genRepeater`, `$repeat` | `repeat`, which is now a generator |
| `genIterator`, `$genIterator` | `iterate`, which is now a generator |
| `isInstanceOf` | `instanceOf` |
| `instanceOfOne` | `instanceOfSome` |
| `isEmptyList`, `isEmptyObject`, `isEmptyCollection` | `isEmpty` |
| `isMap`, `isSet`, `isWeakMap`, `isWeakSet` | `instanceOf(x, Map)`, and so on |
| `isLoosely`, `isLooselyOneOf`, `isStrictly`, `isStrictlyOneOf`, `isOneOf`, `$isType` | `isType`, `isOfType`, `instanceOfSome` |
| `platform` | `native` |
| `isFunctor`, `isUsableImmutablePrimitive` | No replacement |

## Removed types

| Removed | Use instead |
| --- | --- |
| `Constructable`, `TypeConstructor` | `ConstructableType` |
| `Slice`, `SliceConstructor` | `string \| T[]` |
| `PredForSlice` | `TernaryPred` |
| `Lengthable`, `ArrayType`, `Nameable`, `FoldOp`, `ReduceOp`, `MapOp`, `ForEachOp` | No replacement; use native types or the arity types such as `Ternary` |
| `Applicative`, `ApplicativeConstructor`, `Apply`, `ApplyConstructor`, `Bifunctor`, `BifunctorConstructor`, `Foldable`, `Functor`, `FunctorConstructor`, `FunctorMapOp`, `Monad`, `MonadConstructor` | No replacement |

## Stricter types

Many signatures that used `any` are now generic, including `foldl`, `foldr`, `map`, `find`, `head`, `append`, `includes` and `errorIfNotType`. Runtime behaviour doesn't change, but some calls can now fail to compile:

- Code that relied on an `any` result, such as `const s: string = find(x => x > 1, [1, 2])`.
- Mismatched arguments, such as `includes([1, 2], 'a')`.
- A non-string `messageSuffix` on the `errorIfNotType*` methods.
- Explicit type arguments on `map`, `span`, `insert`, `intersperse`, `uncons` and `unconsr`, whose generic parameters changed.

## Added

`charRange`, `findLastIndex`, `apply`, `numRange`, `replicateIter`, `unfoldrIter`, `zip4`, `instanceOfSome`, `isGeneratorFunction`, `isNullish`, `notNullish`, `normalizeStepOrThrow`, plus their `$` forms where they have one.

## Node

`engines.node` is now `>=22`.
