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

@todo 

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
