[![Build Status](https://travis-ci.org/functional-jslib/fjl.png)](https://travis-ci.org/functional-jslib/fjl)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl)
[![NPM version](https://badge.fury.io/js/fjl.svg)](http://badge.fury.io/js/fjl)
[![Dependencies](https://david-dm.org/functional-jslib/fjl.png)](https://david-dm.org/functional-jslib/fjl)
# fjl
Functional Javascript Library

## Motivations:
- Haskell and it's `Prelude`.
- Lambda Calculus.
- The need for a way to do strong, and loose, type checking in combination,
however necessary, in actual javascript code (not in typescript).
- The need to be able to write functional code very quickly and
easily in combination with the aforementioned.
- A functional library that takes advantage of the es6 features of the language
and is built from the ground up using functional concepts.
- A functional library that is exported to multiple formats
(umd, amd, commonjs, es6-modules, and iife).
- "" that has both curried and un-curried versions of included operations.  Et. al. `append`, `_append` (uncurrued)
- Etc. etc..

### Docs
Jsdocs here:
https://functional-jslib.github.io/fjl/

### Notable methods not added from the haskell prelude:
- Math/Integral/Num/etc. methods
- `scan*`, `permutations` and several others in the list's prelude (these are pending implementation)
- Few others from prelude.

### Included methods
Methods dealing with lists (strings/arrays etc.) and objects.
Full list coming soon.

### Needed
- [x] - ~~Implementations of the `scan*` methods?~~ Implemented as of version `0.21.0`
- [ ] - "" of the Math methods?
- [ ] - A friendly function names module has to be built
for some of these functions as most javascript developers
will not be familiar with the function names and paradigms
used in haskell.
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
- [Unit Tests](#unit-tests)
- [Requirements](#requirements)
- [Supported Platforms](#supported-platforms)
- [License](#license)

## Getting Started:

### In Browser:
In the './dist' folder there are three distributed builds available for the
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

## Unit Tests:
To run unit tests:

1.)  First do an `npm install` in project root.

2.)  For running tests on './src' with node:
Run one of the following from your terminal (from repo root):
 - `$ npm test` 

## Requirements:
- Javascript versions Ecmascript 5+

## Supported Platforms:

### Browsers
- IE9+, and all other modern day browsers.

### NodeJs
- 8+

## License:
[GPL v2+](http://www.gnu.org/licenses/gpl-2.0.html "http://www.gnu.org/licenses/gpl-2.0.html") AND
[MIT](http://opensource.org/licenses/MIT "http://opensource.org/licenses/MIT")

## Dev notes:
- './.babelrc' is used only for tests.  Babel configurations found in './gulpfileConfig.json' are the 
configurations used for building the project.

## Resource:
- Docs format: http://usejsdoc.org/
- Haskell docs search engine: https://www.haskell.org/hoogle/
- Listing of entire Haskell prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Prelude.html
- Haskell List Prelude: http://hackage.haskell.org/package/base-4.10.1.0/docs/Data-List.html
