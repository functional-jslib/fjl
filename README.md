[![Build Status](https://travis-ci.org/functional-jslib/fjl.png)](https://travis-ci.org/functional-jslib/fjl)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl)
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/functional-jslib/fjl.png)](https://david-dm.org/functional-jslib/fjl)
# fjl
Functional Javascript Library (inspired by Haskell's Prelude).

## Sections in Readme:
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Docs](#docs)
- [Motivation](#motivations)
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


## Docs

**JSDocs** [https://functional-jslib.github.io/fjl]

The docs are divided into modules though, note, all methods live on `fjl` (top level export).

### About library's usage of currying.
- All methods that take 2 or more arguments are curried.
- Methods that take rest params "only" are curried in some cases and not curried in others (see: `compose`, `peek` et. al.).
- Methods that require one argument and rest params are curried at up to 2 parameters.

**Note**: As a side-effect of the way currying was defined in the library curried functions retain their arity/remaining-arity lengths.

### list
 ```
difference, complement, map, slice, includes, indexOf, lastIndexOf,
push, append, head, last, tail, init, uncons, unconsr, concat,
concatMap, reverse, intersperse, intercalate, transpose, subsequences,
swapped, permutations, foldl, foldr, foldl1, foldr1, mapAccumL,
mapAccumR, iterate, repeat, replicate, cycle, unfoldr, findIndex,
findIndices, elemIndex, elemIndices, take, drop, splitAt, takeWhile,
dropWhile, dropWhileEnd, span, breakOnList, at, find, forEach, filter,
partition, elem, notElem, isPrefixOf, isSuffixOf, isInfixOf,
isSubsequenceOf, group, groupBy, inits, tails, stripPrefix, zip, zipN,
zip3, zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5,
unzip, unzipN, any, all, and, or, not, sum, product, maximum, minimum,
scanl, scanl1, scanr, scanr1, nub, remove, sort, sortOn, sortBy, insert,
insertBy, nubBy, removeBy, removeFirstsBy, unionBy, union, intersect,
intersectBy, range
```
### listUtils
 ```
sliceFrom, sliceTo, sliceCopy, genericAscOrdering, lengths, toShortest,
reduceUntil, reduceUntilRight, reduce, reduceRight, lastIndex,
findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere,
aggregateArr$
```
### object
 ```
instanceOf, hasOwnProperty, length, assign, keys, lookup, typeOf, copy,
toTypeRef, toTypeRefName, isFunction, isType, isOfType, isClass,
isCallable, isObject, isBoolean, isNumber, isString, isMap, isSet,
isWeakMap, isWeakSet, isUndefined, isNull, isSymbol,
isUsableImmutablePrimitive, isEmptyList, isEmptyObject,
isEmptyCollection, isEmpty, isset, isArray, of, searchObj, assignDeep,
objUnion, objIntersect, objDifference, objComplement, log, error, peek,
jsonClone, toArray, toAssocList, toAssocListDeep, fromAssocList,
fromAssocListDeep
```
### function
 ```
apply, call, compose, curryN, curry, curry2, curry3, curry4, curry5,
flipN, flip, id, negateF, negateF2, negateF3, negateFN, until,
fnOrError, noop
```
### boolean
 ```
isTruthy, isFalsy, alwaysTrue, alwaysFalse, equal, equalAll
```
### errorThrowing
 ```
typeRefsToStringOrError, defaultErrorMessageCall,
getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, errorIfNotType,
errorIfNotTypes
```
### string
 ```
split, lines, words, unwords, unlines, lcaseFirst, ucaseFirst,
camelCase, classCase
```
### utils
 ```
fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5,
fPureTakesOneOrMore
```

### Notes/method-requisites:
#### Note: `iterate`, `repeat`, `replicate`, `cycle`
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

**Note for haskell developers:**
- `split` in javascript is for strings.

### Utilities
#### Low level utilities
Turning regular methods into functional ones;  I.e., these 
take a `name` and return a function that take an-argument/arguments and a type value 
that has a method of `name` on it.  
The function returned takes arguments first and functor/member last.
```
fPureTakesOne, fPureTakes2, fPureTakes3, fPureTakes4, fPureTakes5,
fPureTakesOneOrMore, fPureTakesOne, fPureTakes2, fPureTakesOneOrMore
```

**Note:**
- `lastIndex` gives you the last index of a list.

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods

Jsdocs here:
https://functional-jslib.github.io/fjl/

## Motivations:
- Haskell and it's `Prelude` (Functional programming).
- Lambda Calculus.
- The need for: 
    - functional 'combinators' in javascript (without requiring typescript) (index.d.ts being developed for typescript users).
    - the ability to write functional code quickly and easily (using the likes of `curry`, `isset`, `compose` etc.).
    - a library written from the ground up using es6 and functional concepts.
    - a library that is exported to multiple formats (umd, amd, commonjs, es6-modules, and iife).
    - a library that should be easy to update by functional programmers.
    - Et. al..

### Reasoning for library design choices
#### Use of while-and-for-loops instead of built-ins:
- They are faster than iterating with es5 functional array additions (`map`, `forEach` etc.)
 (do search for `foreach vs for loop` and/or similar on the web).
- Native array functional methods are used in some places in the library (due to functional composition and cyclic redundancy of includes (which could be partially mitigated by separating every function into it's own file *but more on that later).

#### Currying
In order to make library easier to use for functional code/programmers the library's
methods are curried with the exception/rules listed in the section further above 
["About library's usage of currying."](#about-librarys-usage-of-currying)

## Development:
- Sources are in './src'
    - './src/jsPlatform' are native platform specific method versions
     pulled out for use (functionally), in some places, where we didn't want to
     intermingle library methods with native ones.
- Distributions are in './dist'
- Docs are generated via jsdoc to './docs' dir.
- Docs are written inline, in source using [jsdoc](http://usejsdoc.com) format.
- About non-conformity to full modularity (one-function-per-file):
    The library could have been written this way initially but was'nt, specifically 
    to make development on the library easier/faster (though it can 
    be argued that development is actually more difficult this way,
    the trade-off of being able to think of functions in groups/modules 
    and along with their relationships is easier than having to think 
    about functions as a big list of files numbering in the 10s to 100s.
      
### Package scripts:
- `build` - Builds docs and distribution ('./dist'). 
- `test-builds` - Tests' './dist'
- `test` - Runs unit tests.

### Dev notes:
- './.babelrc' is used only for tests.  Babel configurations found in './gulpfileConfig.json' are the
configurations used for building the project.

### Unit testing:
We are using 'jest' for testing.

Unit tests are grouped by exported module:
- 'tests/test-list.js' - Tests 'list' module.
- 'tests/test-object.js' - Tests 'object' module.
- 'tests/test-function.js' - Tests 'function' module.
- Et. al.

### Perf Tests:
Some performance tests were hosted at jsperf.com though that site currently broken so performance-tests/benchmarks will be added to repo at a later date (@todo).

## License:
BSD 3 Clause - Included in sources.

## Resources:
- Haskell docs search engine: https://www.haskell.org/hoogle/
- Listing of entire Haskell prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html
- Haskell List Prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-List.html
- Docs format: http://usejsdoc.org/

## Change log

### 1.5.1, 1.5.2
- Added './types/index.d.ts' file.

### 1.5.0
#### Breaking changes
- `reduceRightUntil` changed to `reduceUntilRight`.
- `lengthsToSmallest` changed to `toShortest`.

##### Changes that affect development of the library:
- package.json.scripts - Removed unnecessary commands (cleaned up scripts section).
- Updated gulp to version 4.
- Updated gulpfile to use new `gulp 4` api.
- Removed unnecessary dev dependencies:
    - random-js
    - lazypipe
    - requirejs
    - gulp-fncallback

#### Other changes
- Cleaned up README.md to reflect latest changes.
- Curried functions (functions curried via `curry*` functions) now retain their arity property value (`length` value).

### 1.3.0
- Added `noop` (no-op (op as in operation)) method (useful as a placeholder for variables/properties that should always contain a function).
- Added test for `noop` addition.
- Updated './docs'.
- Added entry in 'docs' config to take into account upcoming logo for 'fjl'.

