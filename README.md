[![Build Status](https://travis-ci.org/functional-jslib/fjl.png)](https://travis-ci.org/functional-jslib/fjl)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl)
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/functional-jslib/fjl.png)](https://david-dm.org/functional-jslib/fjl)
# fjl
Functional Javascript Library (inspired by Haskell's Prelude)

### Docs

**JSDocs** [https://functional-jslib.github.io/fjl]

 The docs are divided into modules though all methods in the library all live on `fjl` or the top level export
 of the library (the docs are written out that way to easier understand the separation and the grouping of
 methods (will give users a better idea of what methods are for what (without reading to much documentation))).

Modules with a prefixed '_' contain docs for un-curried members.
Modules without a prefixed '_' contain docs for curried members (one set of docs will be generated per module in
the future).

The jsdocs link listed above has the modules included on `fjl`, divided by the operation types ported over from the haskell prelude:

#### `booleanOps`
```
isTruthy, isFalsy, alwaysTrue, alwaysFalse
```

#### `listOps`
The `listOps` modules contains docs for everything imported from the `Data.List` haskell module.
```
append, appendMany, head, last, tail, init, uncons, unconsr, concat, concatMap,
reverse, intersperse, intercalate, transpose, subsequences, subsequences1, 
permutations, foldl, foldr, foldr1, mapAccumL, mapAccumR, iterate, repeat,
replicate, cycle, unfoldr, findIndex, findIndices, elemIndex, elemIndices,
take, drop, splitAt, takeWhile, dropWhile, dropWhileEnd, span, breakOnList, at,
find, filter, map, partition, elem, notElem, lookup, isPrefixOf, isSuffixOf, isInfixOf,
isSubsequenceOf, group, groupBy, inits, tails, stripPrefix, zip, zipN, zip3,
zip4, zip5, zipWith, zipWithN, zipWith3, zipWith4, zipWith5, unzip, unzipN, 
any, all, and, or, not, sum, product, maximum, minimum, scanl, scanl1, scanr, 
scanr1, nub, remove, sort, sortOn, sortBy, insert, insertBy, nubBy,
removeBy, removeFirstBy, unionBy, union, intersect, intersectBy, difference,
complement
```

#### `functionOps`
The methods comprising `functionsOps` are:
```
apply, call, curry, curry2, curry3, curry4, curry5, curryN,
until, flip, flip3, flip4, flip5, flipN,
negateF, negateP, negateF3, negateF4, negateF5, negateFMany,
id, compose, curry_, curry2_, curry3_, curry4_, curry5_, __ // Curry with placeholders
```

#### `objectOps`
```
assignDeep, assign, of, prop, typeOf, isType,
isFunction, isType, isClass, isCallable,
isArray, isObject, isBoolean, isNumber, isString, isMap,
isSet, isWeakMap, isWeakSet, isUndefined, isNull, isSymbol,
 isUsableImmutablePrimitive,
isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset,
objUnion, objIntersect, objDifference, objComplement
```

#### `stringOps`
```
lines, words, unwords, unlines
```

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods

Jsdocs here:
https://functional-jslib.github.io/fjl/

## Motivations:
- Haskell and it's `Prelude`.
- Lambda Calculus.
- The need for a way to do strongly typed javascript (in actual code (not with typescript)).
- The need to be able to write functional code very quickly and easily.
- A functional library that takes advantage of the es6 features of the language
 and is built from the ground up using functional concepts.
- A functional library that is exported to multiple formats (umd, amd, commonjs, es6-modules, and iife).
- A functional library that has curried and un-curried versions of included operations.  Et. al.
    `append`, `_append` (un-curried version)
- A library that shouldn't be to hard to develop on (methods grouped similarly to the way the haskell modules
are separated out 'Data.List' etc..
- Etc. etc..

### Needed
- [x] - ~~Implementations of the `scan*` methods?~~ Implemented as of version `0.21.0`
- [ ] ~~- "" of the Math methods?~~
- [X] ~~- A friendly function names module should be considered built
for some of these functions as most javascript developers
will not be familiar with the function names and paradigms
used in haskell.~~
- [ ] - Also some of the utility functions used to create
the libraries functions should be exported with clear and meaningful
names (they haven't been reviewed for export yet).

## Reasoning for paradigms
### Use of for-loops/while-loops instead of built-ins:
- They are faster than iterating with functional array additions (`map`, `forEach` etc.)
as you can see from many performance tests online @todo add references here
(or writing your own @todo add references here).
- They allow us to make our curried functional additions (`map`, `some` etc.)
more performant than just currying the built in ones.

## Sections in Readme:
- [Getting Started](#getting-started)
- [Development](#development)
- ~~[Unit Tests](#unit-tests)~~
- [Requirements](#requirements)
- [Supported Platforms](#supported-platforms)
- [License](#license)

## Getting Started:

### In Browser:
In the './dist' folder there are four distributed builds available for the
browser:

- './dist/amd' - Asynchronous module format.
- './dist/cjs' - CommonJs module format.
- './dist/iife' - Immediately Invoked Function Execution - (exports `fjl` as a global).
- './dist/umd' - Universal module definition format.

### In NodeJs: 

#### Using es2015 modules:
```
import {...} from 'fjl';
```

#### Using CommonJs modules:
```
const fjl = require('fjl');
```

## Development:
- Sources are in './src'
    - Sources are divided by un-curried definitions ('./src/uncurried')
    and curried definitions (files in './src/**/*' except the ones in './src/uncurried' (of course)).
    - './src/jsPlatform' and './src/uncurried/jsPlatform' are native platform specific method versions
     pulled out for use (functionally) in some places where we didn't want to intermingle definition collections (listOps, functionOps etc.).
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
'tests/test-listOps.js' - Tests 'listOps' module etc.

We are using 'chai' and 'mocha' though we may want to move to 'jest' in the future.

## Requirements:
- Javascript versions Ecmascript 5+

## Supported Platforms:

### Browsers
- IE9+, and all other modern day browsers.

### NodeJs
- 8+

## License:
[BSD 3 Clause](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") AND

## Resource:
- Docs format: http://usejsdoc.org/
- Haskell docs search engine: https://www.haskell.org/hoogle/
- Listing of entire Haskell prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html
- Haskell List Prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-List.html
