[![Build Status](https://travis-ci.org/elycruz/fjl.png)](https://travis-ci.org/elycruz/fjl) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Ffjl.svg)](http://badge.fury.io/gh/elycruz%2Ffjl) 
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/elycruz/fjl.png)](https://david-dm.org/elycruz/fjl)
# fjl
Functional Javascript Library

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

- [fjl.__](#fjl__)
- [fjl.apply](#fjlapply)
- [fjl.arrayComplement](#fjlarraycomplement)
- [fjl.arrayDifference](#fjlarraydifference)
- [fjl.arrayIntersect](#fjlarrayintersect)
- [fjl.arrayUnion](#fjlarrayunion)
- [fjl.assign](#fjlassign)
- [fjl.assignDeep](#fjlassigndeep)
- [fjl.call](#fjlcall)
- [fjl.complement](#fjlcomplement)
- [fjl.compose](#fjlcompose)
- [fjl.curry](#fjlcurry)
- [fjl.curryN](#fjlcurryn)
- [fjl.curry2](#fjlcurry2)
- [fjl.curry3](#fjlcurry3)
- [fjl.curry4](#fjlcurry4)
- [fjl.curry5](#fjlcurry5)
- [fjl.curry__](#fjlcurry__)
- [fjl.curryN__](#fjlcurryn__)
- [fjl.curry2_](#fjlcurry2_)
- [fjl.curry3_](#fjlcurry3_)
- [fjl.curry4_](#fjlcurry4_)
- [fjl.curry5_](#fjlcurry5_)
- [fjl.difference](#fjldifference)
- [fjl.errorIfNotTypeFactory](#fjlerrorifnottypefactory)
- [fjl.filter](#fjlfilter)
- [fjl.intersect](#fjlintersect)
- [fjl.isset](#fjlisset)
- [fjl.issetAndOfType](#fjlissetandoftype)
- [fjl.isNumber](#fjlisnumber)
- [fjl.isFunction](#fjlisfunction)
- [fjl.isArray](#fjlisarray)
- [fjl.isBoolean](#fjlisboolean)
- [fjl.isObject](#fjlisobject)
- [fjl.isString](#fjlisstring)
- [fjl.isMap](#fjlismap)
- [fjl.isSet](#fjlisset)
- [fjl.isWeakSet](#fjlisweakset)
- [fjl.isWeakMap](#fjlisweakmap)
- [fjl.isUndefined](#fjlisundefined)
- [fjl.isNull](#fjlisnull)
- [fjl.isSymbol](#fjlissymbol)
- [fjl.isEmpty](#fjlisempty)
- [fjl.isConstructablePrimitive](#fjlisconstructableprimitive)
- [fjl.map](#fjlmap)
- [fjl.notEmptyAndOfType](#fjlnotemptyandoftype)
- [fjl.objComplement](#fjlobjcomplement)
- [fjl.objDifference](#fjlobjdifference)
- [fjl.objIntersect](#fjlobjintersect)
- [fjl.objUnion](#fjlobjunion)
- [fjl.reduce](#fjlreduce)
- [fjl.reduceRight](#fjlreduceright)
- [fjl.subClass](#fjlsubclass)
- [fjl.subClassMulti](#fjlsubclassmulti)
- [fjl.typeOf](#fjltypeof)
- [fjl.typeOfIs](#fjltypeofis)
- [fjl.union](#fjlunion)
- [fjl.version](#fjlversion)

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

### fjl.curryN__
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.curry__
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

### fjl.isset
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.issetAndOfType
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

### fjl.subClass
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.subClassMulti
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

### fjl.version
@todo - Added documentation here.
[Back to fjl members list.](#fjl-members-list)

### fjl.__
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
- 4.0.0+

## License:
[GPL v2+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") AND
[MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")

## Todos:
### MVP 1.0.0
- [ ] - Rename `pureCurry` and `pureCurryN` to `curry` and `curryN` respectively.
- [ ] - Rename old `curry{suffix}` functions to `curry{suffix}_` in lieu of previous change (also since 
these functions are overloaded and aren't pure curry functions due to their placeholder manipulation feature).
- [X] - ~~Remove functional operators (`zero`, `alt` etc.)  out into their own package (?) (tentative).~~
- [ ] - Make all functional members compatible with es6 classes.
