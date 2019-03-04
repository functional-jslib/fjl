[![Build Status](https://travis-ci.org/functional-jslib/fjl.svg?branch=master)](https://travis-ci.org/functional-jslib/fjl)
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

#### Note on typescript:
If you are using typescript, and want to manually include fjl's types file, it is located at `'fjl/types/index.d.ts'`.

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

### Library methods:

### `list` methods
 ```
map, slice, includes, indexOf, lastIndexOf, push, append, head, last,
tail, init, uncons, unconsr, concat, concatMap, reverse, intersperse,
intercalate, transpose, subsequences, swapped, permutations, foldl,
foldr, foldl1, foldr1, mapAccumL, mapAccumR, iterate, repeat, replicate,
cycle, unfoldr, findIndex, findIndices, elemIndex, elemIndices, take,
drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList,
at, find, forEach, filter, partition, elem, notElem, isPrefixOf,
isSuffixOf, isInfixOf, isSubsequenceOf, group, groupBy, inits, tails,
stripPrefix, zip, zipN, zip3, zip4, zip5, zipWith, zipWithN, zipWith3,
zipWith4, zipWith5, unzip, unzipN, any, all, and, or, not, sum, product,
maximum, minimum, scanl, scanl1, scanr, scanr1, nub, remove, sort,
sortOn, sortBy, insert, insertBy, nubBy, removeBy, removeFirstsBy,
unionBy, union, intersect, intersectBy, difference, complement,
sliceFrom, sliceTo, sliceCopy, genericAscOrdering, lengths, toShortest,
reduceUntil, reduceUntilRight, reduce, reduceRight, lastIndex,
findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere,
aggregateArray, range
```
### `listUtils` methods
 ```
sliceFrom, sliceTo, sliceCopy, genericAscOrdering, lengths, toShortest,
reduceUntil, reduceUntilRight, reduce, reduceRight, lastIndex,
findIndexWhere, findIndexWhereRight, findIndicesWhere, findWhere,
aggregateArray
```
### `object` methods
 ```
instanceOf, hasOwnProperty, length, native, assign, keys, lookup,
typeOf, copy, toTypeRef, toTypeRefs, toTypeRefName, toTypeRefNames,
isFunction, isType, isStrictly, isOfType, isLoosely, isClass,
isCallable, isObject, isBoolean, isNumber, isString, isMap, isSet,
isWeakMap, isWeakSet, isUndefined, isNull, isSymbol,
isUsableImmutablePrimitive, isEmptyList, isEmptyObject,
isEmptyCollection, isEmpty, isset, isOneOf, isStrictlyOneOf,
isLooselyOneOf, instanceOfOne, isFunctor, isArray, of, searchObj,
assignDeep, objUnion, objIntersect, objDifference, objComplement, log,
error, peek, warn, jsonClone, toArray, toAssocList, toAssocListDeep,
fromAssocList, fromAssocListDeep
```
### `boolean` methods
 ```
isTruthy, isFalsy, alwaysTrue, alwaysFalse, equal, equalAll
```
### `errorThrowing` methods
 ```
typeRefsToStringOrError, defaultErrorMessageCall,
getErrorIfNotTypeThrower, getErrorIfNotTypesThrower, errorIfNotType,
errorIfNotTypes
```
### `function` methods
 ```
apply, call, compose, curryN, curry, curry2, curry3, curry4, curry5,
flipN, flip, flip3, flip4, flip5, id, negateF, negateF2, negateF3,
negateFN, until, fnOrError, noop, trampoline, toFunction
```
### `string` methods
 ```
split, lines, words, unwords, unlines, lcaseFirst, ucaseFirst,
camelCase, classCase
```
### `utils` methods
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
### 1.10.7
- Consolidated typescript type files into one types file.

### 1.10.6
- Made 'jsPlatform' module public.
- Added typescript types for all previously defined "public" modules."

### 1.10.3
- Added './types' dir for typescript type files (added in earlier commits though formerly announcing here).
- Added types file to package.json (at 'types' property).
- Refactored type definitions, a bit, (from what they were before - they were committed in earlier commits though their 
format wasn't finalized yet).
- Updated readme with note on typescript types file.
- Fixed typo in 'filter' type in list.d.ts - It's return value was marked as `void` updated to `any[]`.
- Added `warn` function to console module and to library.
- Regenerated docs, readme etc..

### 1.10.0
- Added some synonyms:
  - `isLoosely` for `isOfType`
  - `isStrictly` for `isType`
  - `isStrictlyOneOf` for `isOneOf`
- Cleaned up, tablelized, and optimized some tests ('./tests/test-object').
- Optimized some implementations (`src/object/is`)

#### New addition:  
  - `isLooselyOneOf` - For type checking with mix-match
  type refs (constructor names and constructors):
  ```javascript
  const someValue = 'someValue';
  isLooselyOneOf(someValue, 'Undefined', Function, 'Map'); 
  // `false` - Doesn't match any type.
  
  isLooselyOneOf(someValue, 'Undefined', String, 'Map'); 
  // `true` - Matches `String`
  
  isLooselyOneOf(someValue, 'Undefined', 'String', 'Map'); 
  // `true` - Matches 'String'
  ```
  - `instanceOfOne` - `instanceOf` for one or more types:
  ```javascript
  const someValue = 'hello';
  instanceOfOne(someValue, Function, String, Array)
  // `true` matches - String
  ```
  
### 1.9.0
- Added `toFunction` (for functional composition of values that must pass as functions).

### 1.8.0 
- Added `trampoline` method (for tail call elimination).

### 1.7.0
#### Deprecations
- Marked `hasOwnProperty` as deprecated (as property
 is not really in the haskell prelude and is a bit
 of an oddity when it comes to the functional mindset).
 
#### New additions
- Re-instantiated `flip3`, `flip4`, `flip5` - Turns out there was a use for these after-all (`fjl.native`).
- Added `native` which includes all the 
static methods that live on `Object` though
flipped and curried.
- Added 'fjl-mutable' as part of source.  All methods of 'fjl-mutable' now
live directly on 'fjl' and are defined in 'fjl/objects/defineProp' (or more directly in src at './src/objects/defineProp').

#### Development changes.
- Updated  'dev-deps' to use latest babel.
- Updated gulp version
- Updated .travis* file.
- Moved './gulpfile.js' to 'gulpfile.babel.js'  in order to easily use es6 imports.

### 1.6.2
- String support for `takeWhile`, `group`, and `groupBy`, `dropWhileEnd`.
- Tablelized tests for `takeWhile`, `dropWhileEnd`, and `dropWhileEnd`.

### 1.6.0
- A few more functions now support strings:
    - `map`, `intersperse`, `append`, `reverse`, and `concat`.
- `range` function doc-block updated.
- `listUtil` functions updated and their docs unblocked from jsdocs.
- `listUtil` methods are now exported from 'src/list'.
- Tests overhaul stage 1 progress.  
    - Converted some tests to table format (where implementations were touched and 
        where the functional programming style was too extreme).
    - Removed some library functions from tests where said functions were not being tested (use native functions for tests only (no-library functions intermingle (in tests))).
- Cleaned up imports in some places to protect from cyclic dependency issues.

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

