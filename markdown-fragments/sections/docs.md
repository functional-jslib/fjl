
### Docs

**JSDocs** [https://functional-jslib.github.io/fjl]

The docs are divided into modules though, note, all methods live on `fjl` (top level export).

#### About library's usage of currying.
- All methods that take 2 or more arguments are curried.
- All methods that take rest params "only" are curried up to 2 parameters.
- Methods that require one argument and rest params are curried at up to 2 parameters.
- Methods that accept rest params "only" are not curried.
- All curried functions will have an, arity, `length` of `0` (due to the way currying is currently defined in the libray (will be updated later)).

#### `boolean`
```
isTruthy, isFalsy, alwaysTrue, alwaysFalse
```

#### `list`
```
append, head, last, tail, init, uncons, unconsr, concat, concatMap,
reverse, intersperse, intercalate, transpose, subsequences, subsequences1, 
permutations, foldl, foldl1, foldr, foldr1, mapAccumL, mapAccumR, iterate, repeat,
replicate, cycle, unfoldr, findIndex, findIndices, elemIndex, elemIndices,
take, drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList, at,
find, filter, map, partition, elem, notElem, lookup, isPrefixOf, isSuffixOf, isInfixOf,
isSubsequenceOf, group, groupBy, inits, tails, stripPrefix, zip, zipN, zip3,
zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5, unzip, unzipN, 
any, all, and, or, not, sum, product, maximum, minimum, scanl, scanl1, scanr, 
scanr1, nub, remove, sort, sortOn, sortBy, insert, insertBy, nubBy,
removeBy, removeFirstBy, unionBy, union, intersect, intersectBy, difference,
complement, range
```

##### Note: `iterate`, `repeat`, `replicate`, `cycle`
In javascript we do not have lazy lists (infinite lists) like in haskell so 
the aforementioned methods take an integer as their first parameter;  E.g.,

In haskell, we can do the following: `take 3 $ iterate (a -> a * 2) [1..]` (`[1..]` is syntax for infinite list)
In javascript, we have no choice but to make our function call similar to:
```
iterate(3, a => a * 2, range(1, 10))
```

So, haskell definitions for our generator like methods:  
- `iterate :: (a -> a) -> [a]` 
- `repeat :: a -> [a]`
- `replicate :: Int -> a -> [a]`
- `cycle :: [a] -> [a]`
 
And our haskell signature for our javascript version methods become:
- `repeat :: Int -> a -> [a]`
- `replicate:: Int -> a -> [a]`
- `cycle :: Int -> [a] -> [a]`
- `iterate :: Int -> (a -> a) -> [a]`

#### `function`
```
apply, call, curry, curry2, curry3, curry4, curry5, curryN,
until, flip, flipN,
negateF, negateF2, negateF3, negateFN,
id, compose, curry_, curry2_, curry3_, __ // Curry with placeholders
```

#### `object`
```
assignDeep, assign, of, lookup, typeOf, isType, instanceOf, 
isOfType, isFunction, isClass, isCallable, copy,
isArray, isObject, isBoolean, isNumber, isString, isMap,
isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol,
 isUsableImmutablePrimitive, isEmpty, isset,
isEmptyList, isEmptyObject, isEmptyCollection,
hasOwnProperty, length, keys, 
objUnion, objIntersect, objDifference, objComplement,
```

#### `string`
```
camelCase, classCase, ucaseFirst, lcaseFirst, lines, words, unwords, unlines
```

#### `jsPlatform`
```
slice, includes, indexOf, lastIndexOf, split, push
```

**Note for haskell developers:**
- `split` in javascript is for strings.

#### Utilities
##### Low level utilities
Turning regular methods into functional ones;  I.e., these 
take a `name` and return a function that take an-argument/arguments and a type value 
that has a method of `name` on it.  
The function returned takes arguments first and functor/member last.
```
fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5,
fPureTakesOneOrMore, fPureTakesOne, fPureTakes2, fPureTakesOneOrMore
```

##### List operation utilities
```
sliceFrom, sliceTo, slice, sliceCopy
genericAscOrdering, lengths, toShortest, 
reduceUntil, reduceUntilRight, reduce, reduceRight,
lastIndex, findIndexWhere, findIndicesWhere, findWhere,
aggregateStr, aggregateArr$$, aggregateObj, aggregateByType,
```

**Note:**
- `lastIndex` gives you the last index of a list.

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods

Jsdocs here:
https://functional-jslib.github.io/fjl/
