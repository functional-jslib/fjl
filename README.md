[![Build Status](https://travis-ci.org/functional-jslib/fjl.png)](https://travis-ci.org/functional-jslib/fjl)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl)
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/functional-jslib/fjl.png)](https://david-dm.org/functional-jslib/fjl)
# fjl
Functional Javascript Library (v1.3.3)(inspired by Haskell's Prelude).

## Sections in Readme:
- [Getting Started](#getting-started)
- [Requirements](#requirements)
- [Docs](#docs)
- [Motivation](#motivation)
- [Development](#development)
- [Supported Platforms](#supported-platforms)
- [License](#license)
- [Resources](#resources)
- [Change log](#change-log)

## Requirements:
- Javascript Ecmascript 5+.

### Supported Platforms:

#### Browsers
- IE9+, and all other modern day browsers.

#### NodeJs
- 8+

## Getting Started:

### In Browser:
See desired export type below:
- './dist/amd/' - Asynchronous module format.
- './dist/cjs/' - CommonJs module format.
- './dist/umd/' - Universal module definition format.
- './dist/iife/' - Immediately Invoked Function Execution - (exports `fjl` as a global).
- './dist/es6-module/' - Ecmascript 6 module format.

**Note:** 
The './dist/package/fjl*' files are for the new setup in ecma262 proposals
for es6 modules ('*.mjs' for es6 module and '*.js' for common-js module) (these are used
 in package.json as the default exports). 

### In NodeJs: 

#### Using es2015 modules:
```
import {...} from 'fjl';
```

#### Using CommonJs modules:
```
const fjl = require('fjl');
```

### Docs

**JSDocs** [https://functional-jslib.github.io/fjl]

The docs are divided into modules though all methods live on `fjl` (top level export).

#### A note on currying.
- All methods that take 2 or more arguments are curried.
- All methods that take rest params ~~'only' are not curried;~~ only are curried up to 2 parameters.
- Methods that require one argument and rest params are ~~not~~ are curried at up to 2 parameters.

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
genericAscOrdering, lengths, listsToShortest, 
reduceUntil, reduceRightUntil, reduce, reduceRight,
lastIndex, findIndexWhere, findIndicesWhere, findWhere,
aggregateStr, aggregateArr$$, aggregateObj, aggregateByType,
```

**Note:**
- `lastIndex` gives you the last index of a list.

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods

Jsdocs here:
https://functional-jslib.github.io/fjl/

## Motivations:
- Haskell and it's `Prelude`.
- Lambda Calculus.
- The need for strongly typed javascript (without typescript (libraries and the such)) (possible via `fjl.is*` methods (`fjl.isType`, `fjl.isset`, etc.)).
- The need to be able to write functional code very quickly and easily (all methods in `fjl` ~~are curried and lib also includes versions of all methods uncurried~~).
- A functional library that takes advantage of the es6 features of the language
 and is built from the ground up using functional concepts.
- A functional library that is exported to multiple formats (umd, amd, commonjs, es6-modules, and iife).
- ~~A functional library that has curried and un-curried versions of included operations.  Et. al.
    `append`, `append` (un-curried version) Managing uncurried and curried methods makes development on 
    the library unwieldly and is un-functional (anyway :-))so has been removed from library (as a feature)~~, .
- A library that shouldn't be too hard to develop on (methods grouped similarly to the way the haskell modules
are separated out 'Data.List' (in our lib is './src/list.js') etc..
- Etc. etc..

### Reasoning for paradigms
#### Use of while-and-for-loops instead of built-ins:
- They are faster than iterating with es5 functional array additions (`map`, `forEach` etc.)
 (do search for `foreach vs for loop` and/or similiar).
- Native array functional methods are used in some places in the library (due to functional composition and cyclic redundancy of includes).

## Development:
- Sources are in './src'
    - Sources are divided by un-curried definitions ('./src/uncurried')
    and curried definitions (files in './src/**/*' except the ones in './src/uncurried' (of course)).
    - './src/jsPlatform' and './src/uncurried/jsPlatform' are native platform specific method versions
     pulled out for use (functionally) in some places where we didn't want to intermingle definition collections (list, function etc.).
    - About non-conformity to full modularity (one-function-per-file):
      The library could have been written this way initially but wasn't, specifically to make development on the library easier
      (though it can be argued that development is actually more difficult this way,
      the trade-off of being able to think of functions in groups/modules and their relations is easier than having to think about
      functions as a smattering (of-them) numbering in the 100's of them (remember we export the curried and un-curried versions of prelude functions).
- Distributions are in './dist'
- Docs are generated via jsdoc to './docs' dir.
- Docs are written inline, in source using [jsdoc](http://usejsdoc.com) format.
 and are generated out (to the './docs' folder) in html format (which get pulled by github onto
 [https://functional-jslib.github.io/fjl] (via the repo's settings).

### For development tasks:
See `scripts` field in `package.json`.

**Note about 'pre-publish' script task:** 'pre-publish' wasn't confused with default 'prepublish' task.  'pre-publish'
task is just for getting conceptual pre-publish functionality locally (on dev-machine) without npm's default 'prepublish' side-effects/functionality (our
'pre-publish' doesn't get triggered by 'travis-ci' and the like since it isn't formally used for pre-publish on these
platforms, etc..).

### Dev notes:
- './.babelrc' is used only for tests.  Babel configurations found in './gulpfileConfig.json' are the
configurations used for building the project.

### Unit testing:
Unit tests are grouped by exported module:
'tests/test-list.js' - Tests 'list' module etc.

We are using ~~'chai' and 'mocha' though we may want to move to~~ 'jest' for testing ~~in the future~~.

### Perf Tests:
- `subsequences`: https://jsperf.com/subsequences/6
- `trampoline`: https://jsperf.com/pure-trampoline/1 (performance difference to pure 
  recursive call here is negligible).
  
## Change log:
- As of version 1.3.0 changelog will also be kept in [Changelog.md](https://github.com/functional-jslib/fjl/tree/next/CHANGELOG.md).

## License:
[BSD 3 Clause](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html")

## Resources:
- Docs format: http://usejsdoc.org/
- Haskell docs search engine: https://www.haskell.org/hoogle/
- Listing of entire Haskell prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html
- Haskell List Prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-List.html
