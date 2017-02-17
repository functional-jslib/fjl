[![Build Status](https://travis-ci.org/elycruz/fjl.png)](https://travis-ci.org/elycruz/fjl) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Ffjl.svg)](http://badge.fury.io/gh/elycruz%2Ffjl) 
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/elycruz/fjl.png)](https://david-dm.org/elycruz/fjl)
# fjl
====
Functional Javascript Library

### Tests
Note: Extra commands (tests written in es6):
`mocha tests/ --harmony --compilers js:babel-core/register`

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

## Packages and members list:
#### Legend 
- **(f)** - File prefix.  Denotes item is a file in the package.
- **(p)** - Package prefix.  Denotes item is a package;  E.g., an object with access to package members directly on it.

#### Packages and Members List list:

- [(f) fjl.arrayOperators](#f-fjlarrayoperators)
- [(f) fjl.assign](#f-fjlassign)
- [(f) fjl.compose](#f-fjlcompose)
- [(f) fjl.curry](#f-fjlcurry)
- [(f) fjl.errorIfNotTypeFactory](#f-fjlerrorifnottypefactory)
- [(f) fjl](#f-fjl)
- [(p) fjl.generated](#p-fjlgenerated)
  - [(f) fjl.generated.version](#f-fjlgeneratedversion)
- [(f) fjl.is](#f-fjlis)
- [(f) fjl.not](#f-fjlnot)
- [(f) fjl.objOperators](#f-fjlobjoperators)
- [(f) fjl.operators](#f-fjloperators)
- [(f) fjl.subClass](#f-fjlsubclass)
- [(f) fjl.typeOf](#f-fjltypeof)


## Fjl Members List:
#### Legend 
- **(m)** - Member prefix.  Denotes item is a member;  E.g., A method or property.

#### Members, Properties and Methods:

- [(m) fjl.assign](#m-fjlassign)
- [(m) fjl.assignDeep](#m-fjlassigndeep)
- [(m) fjl.compose](#m-fjlcompose)
- [(m) fjl.__](#m-fjl__)
- [(m) fjl.curry](#m-fjlcurry)
- [(m) fjl.curryN](#m-fjlcurryn)
- [(m) fjl.curry2](#m-fjlcurry2)
- [(m) fjl.curry3](#m-fjlcurry3)
- [(m) fjl.curry4](#m-fjlcurry4)
- [(m) fjl.curry5](#m-fjlcurry5)
- [(m) fjl.subClass](#m-fjlsubclass)
- [(m) fjl.subClassMulti](#m-fjlsubclassmulti)
- [(m) fjl.isset](#m-fjlisset)
- [(m) fjl.issetAndOfType](#m-fjlissetandoftype)
- [(m) fjl.typeOf](#m-fjltypeof)
- [(m) fjl.typeOfIs](#m-fjltypeofis)
- [(m) fjl.isNumber](#m-fjlisnumber)
- [(m) fjl.isFunction](#m-fjlisfunction)
- [(m) fjl.isArray](#m-fjlisarray)
- [(m) fjl.isBoolean](#m-fjlisboolean)
- [(m) fjl.isObject](#m-fjlisobject)
- [(m) fjl.isString](#m-fjlisstring)
- [(m) fjl.isMap](#m-fjlismap)
- [(m) fjl.isSet](#m-fjlisset)
- [(m) fjl.isWeakSet](#m-fjlisweakset)
- [(m) fjl.isWeakMap](#m-fjlisweakmap)
- [(m) fjl.isUndefined](#m-fjlisundefined)
- [(m) fjl.isNull](#m-fjlisnull)
- [(m) fjl.isSymbol](#m-fjlissymbol)
- [(m) fjl.isEmpty](#m-fjlisempty)
- [(m) fjl.isConstructablePrimitive](#m-fjlisconstructableprimitive)
- [(m) fjl.notEmptyAndOfType](#m-fjlnotemptyandoftype)
- [(m) fjl.errorIfNotTypeFactory](#m-fjlerrorifnottypefactory)
- [(m) fjl.complement](#m-fjlcomplement)
- [(m) fjl.difference](#m-fjldifference)
- [(m) fjl.intersect](#m-fjlintersect)
- [(m) fjl.union](#m-fjlunion)
- [(m) fjl.objComplement](#m-fjlobjcomplement)
- [(m) fjl.objDifference](#m-fjlobjdifference)
- [(m) fjl.objIntersect](#m-fjlobjintersect)
- [(m) fjl.objUnion](#m-fjlobjunion)
- [(m) fjl.arrayDifference](#m-fjlarraydifference)
- [(m) fjl.arrayIntersect](#m-fjlarrayintersect)
- [(m) fjl.arrayComplement](#m-fjlarraycomplement)
- [(m) fjl.arrayUnion](#m-fjlarrayunion)
- [(m) fjl.length](#m-fjllength)
- [(m) fjl.version](#m-fjlversion)


### (f) fjl.arrayCombinators
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.arrayOperators
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.assign
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.combinators
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.compose
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.curry
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.errorIfNotTypeFactory
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.generated.version
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.is
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.not
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.objCombinators
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.objOperators
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.operators
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.subClass
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (f) fjl.typeOf
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (p) fjl.data
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (p) fjl.functor
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (p) fjl.generated
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

### (p) fjl.monad
@todo - Added documentation here.
[Back to other packages and members list.](#other-packages-and-members)

## Unit Tests:
To run unit tests:

1.)  First do an `npm install` in project root.

2.)  For running tests with node:
Run one of the following from your terminal:
 - `$ gulp tests`, 
 - `$ npm tests` 
 
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
