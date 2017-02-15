[![Build Status](https://travis-ci.org/elycruz/fjl.png)](https://travis-ci.org/elycruz/fjl) 
[![GitHub version](https://badge.fury.io/gh/elycruz%2Ffjl.svg)](http://badge.fury.io/gh/elycruz%2Ffjl) 
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/elycruz/fjl.png)](https://david-dm.org/elycruz/fjl)
# fjl
====
Functional Javascript Library

### !Note: Not at any version, just a playground for developing some functional ideas.

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

### In the browser:
Include './dist/iife/fjl[.min].js' .

### In NodeJs: 

#### Using es2015 modules:
```
import fjl from './node_modules/fjl/src/fjl';
```
@todo add es6 config to package.json so module is importable as an es6 module by default (
 `import fjl from 'fjl';`
).

#### Using CommonJs modules:
just do a `require('fjl');`


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

- [(m) fjl.default](#m-fjldefault)


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
