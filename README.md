[![Build Status](https://travis-ci.org/elycruz/fjl.png)](https://travis-ci.org/elycruz/fjl) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Ffjl.svg)](http://badge.fury.io/gh/elycruz%2Ffjl) 
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/elycruz/fjl.png)](https://david-dm.org/elycruz/fjl)
# fjl
Functional Javascript Library

## This branch is in Alpha

## Motivations:
- Haskell and it's `Prelude`.
- Lambda Calculus.
- The need for a way to do strong, and loose, type checking in combination
however necessary in actual javascript code (not in typescript).
- The need to be able to write functional code very quickly and
easily in combination with the aforementioned.
- A functional library that takes advantage of the es6 features of the language
and is built from the ground up using functional concepts.
- A functional library that is exported to multiple formats
(umd, amd, commonjs, es6-modules, and iife).
- Etc. etc..

### Needed
- [ ] - A friendly function names module has to be built
for some of these functions as most javascript developers
will not be familiar with the function names and paradigms
used in haskell.
- [ ] - Also some of the utility functions used to create
the libraries functions should be exported with clear and meaningful
names (they haven't been reviewed for export yet).

## Reasoning for paradigms
### Use of for loops:
- They are faster than iterating with functional array additions (`map`, `forEach` etc.)
as you can see from many performance tests online @todo add references here
(or writing your own @todo add references here).
- They perform faster than `while` and `do {} while {}` loops.
- They allow us to make our curried functional additions (`map`, `some` etc.)
more performant than just currying the built in ones.

## Sections in Readme:
- [Getting Started](#getting-started)
- [Unit Tests](#unit-tests)
- [Requirements](#requirements)
- [Supported Platforms](#supported-platforms)
- [License](#license)

## Getting Started:

### In Browser:
In the './dist' folder there are three distributed builds available for the
browser:

- './dist/iife' - Immediately Invoked Function Execution - (exports `fjl` as a global).
- './dist/cjs' - CommonJs module format.
- './dist/umd' - Universal module definition format.

### In NodeJs: 

#### Using CommonJs modules:
```
const fjl = require('fjl');
```

#### Using es2015 modules:
```
import fjl from './node_modules/fjl/src/fjl';
```

## Fjl Members List:
#### Members, Properties and Methods:


### fjl.ASC
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.DESC
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.__
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.apply
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.arrayComplement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.arrayDifference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.arrayIntersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.arrayUnion
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.assign
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.assignDeep
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.call
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.complement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.compose
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.concat
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry
```
fjl.curry (fn {Function}, ...initialArgs {*}): {Function}

``` 

[Back to fjl members list.](#fjl-members-list)

### fjl.curry2
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry2_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry2_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry3_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry3_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry4_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry4_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry5_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry5_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curryN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curryN_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curryN_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry_
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.difference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.errorIfNotTypeFactory
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.filter
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flatten
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.flattenMulti
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.getSortByOrder
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.head
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.init
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.instanceOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.intersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isArray
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isBoolean
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isConstructablePrimitive
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isEmpty
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isFunction
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isMap
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isNull
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isNumber
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isObject
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isString
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isSymbol
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isUndefined
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isWeakMap
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isWeakSet
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.isset
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.issetAndOfType
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.join
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.last
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.lengths
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.lines
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.map
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.notEmptyAndOfType
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objComplement
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objDifference
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objIntersect
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.objUnion
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.orderedLengths
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.pureCurry
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.pureCurry2
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.pureCurry3
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.pureCurry4
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.pureCurry5
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.pureCurryN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.reduce
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.reduceRight
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.reverse
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sortAsc
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sortDesc
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.sortDescByLength
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.split
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.subClass
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.subClassMulti
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.tail
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.typeOf
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.typeOfIs
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.union
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unlines
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unwords
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unzip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.unzipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.version
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.words
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zip
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.zipN
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

## Unit Tests:
To run unit tests:

1.)  First do an `npm install` in project root.

2.)  For running tests on './src' with node:
Run one of the following from your terminal:
 - `$ gulp tests`, 
 - `$ npm tests` 
 - `mocha tests/ --harmony --compilers js:babel-core/register`

3.)  For running tests on './dist/cjs' with node:
 - `mocha tests/for-cjs --harmony`

## Requirements:
- Javascript versions Ecmascript 5+

## Supported Platforms:

### Browsers
- IE9+, and all other modern day browsers.

### NodeJs
- ~~4.0.0+~~
- 6.11.x+

## License:
[GPL v2+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") AND
[MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")

## Notes:
- './.babelrc' is used only for tests.  Babel configurations found in './gulpfileConfig.json' are the 
configurations used for building the project.

## Todos:
### MVP 1.0.0
- [X] - Rename `pureCurry` and `pureCurryN` to `curry` and `curryN` respectively.
- [X] - Rename old `curry{suffix}` functions to `curry{suffix}_` in lieu of previous change (also since 
these functions are overloaded and aren't pure curry functions due to their placeholder manipulation feature).
- [X] - ~~Remove functional operators (`zero`, `alt` etc.)  out into their own package (?) (tentative).~~
- [X] - ~~Make all functional members compatible with es6 classes.~~ No constructors included in library.
- [ ] - Remove use of 'gulp-better-rollup' in favor of using rollup directly.
- [ ] - Re-instate the use of .travisci file when project is passed 'alpha' stage.'

