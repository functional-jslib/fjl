[![Build Status](https://travis-ci.org/functional-jslib/fjl-input-filter.png)](https://travis-ci.org/functional-jslib/fjl-input-filter)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl-input-filter.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl-input-filter)
[![NPM version](https://badge.fury.io/js/fjl-input-filter.svg)](http://badge.fury.io/js/fjl-input-filter)
[![Dependencies](https://david-dm.org/functional-jslib/fjl-input-filter.png)](https://david-dm.org/functional-jslib/fjl-input-filter)
# fjl-input-filter
Input filter validation functions - These allows you to create input and input-filter objects that can be used (by included utility functions)
to easily validate a body of input fields quickly and easily (see usage examples further below).

## Sections in Readme:
- [Basic idea](#basic-idea)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Docs](#docs)
- [Motivation](#motivations)
- [Development](#development)
- [Supported Platforms](#supported-platforms)
- [License](#license)
- [Resources](#resources)
- [Change log](#change-log)

## Basic idea:
- **Validators** - Functions that validate a given input and return a validation result.
- **Filters** - Functions that take a value and give you a 'possibly' transformed value.
- **Inputs** - Objects that contain rules used for validation (breakOnFailure, a list of validators, a list of filters etc.)
- **InputFilters** - Collection of input objects that can be validated together as a whole.
(see usage example(s) below): 

## Requirements:
- Javascript Ecmascript 5+.

### Supported Platforms:

#### Browsers
- IE9+, and all other modern day browsers.

#### NodeJs
- 8+

## Getting Started:

### In NodeJs: 
#### Using es2015 modules:
```
import {...} from 'fjl-input-filter';
```

#### Using CommonJs modules:
```
const {...} = require('fjl-input-filter');
```

### In Browser:
See desired export type below:
- './dist/amd/' - Asynchronous module format.
- './dist/cjs/' - CommonJs module format.
- './dist/umd/' - Universal module definition format.
- './dist/iife/' - Immediately Invoked Function Execution - (exports `fjlInputFilter` as a global).
- './dist/es6-module/' - Ecmascript 6 module format.

## Docs

**JSDocs** are here (https://functional-jslib.github.io/fjl-input-filter/) [https://functional-jslib.github.io/fjl-input-filter/].

Docs in readme aren't fully fleshed out yet (see jsdocs, usage examples, and/or tests instead).

### `Input` methods
 ```
noValidationRequired, validateInput, validateIOInput, runValidators,
runIOValidators, runFilters, runIOFilters, toInput,
toInputValidationResult, Input
```
### `InputFilter` methods
 ```
validateInputFilter, validateIOInputFilter, validateIOInputWithName,
toInputFilter, toInputFilterResult, InputFilter
```


In-line summary docs follow:


## Api:
### `validateInputFilter(inputFilter, incomingData)`
### `validateIOInputFilter(inputFilter, incomingData, ioErrorHandler)`
### `validateInput(inputObj, value)`
### `validateIOInput(inputObj, value, ioErrorHandler)`
### `toInputFilter(inputsObj, breakOnFailure {Boolean}, out = {})`
### `toInputFilterResult(resultObj, out = {})`
### `toInputValidationResult(resultObj)`
### `toInput(inputOptions, out = {})`

#### Constructors
### `Input(options)`
#### Methods
- **`validate(data) : InputValidationResult`**
- **`validateIO(data) : Promise.<InputValidationResult>`**

### `InputFilter(inputsObj, breakOnFailure {Boolean})`
#### Methods
- **`validate(data) : InputFilterResult`**
- **`validateIO(data) : Promise.<InputFilterResult>`**

## Virtual Types
### InputValidationResult
### InputFilterResult

## External Virtual Types
**See:** fjl-validator repo/module
### ValidationResult
### ValidatorOptions

## Development:
- For commands see './package.json' scripts.

### Dir structure
- Everything is in './src'.
- Distribution is in './dist'.
- Docs are in './docs'.

### Testing
Using `jest` (see './package.json' scripts).

## License:
BSD 3 Clause - Included in sources.

## Resources:
- Zend/InputFilter: https://docs.zendframework.com/zend-inputfilter/intro/
- fjl-validator: https://github.com/functional-jslib/fjl-validator
- fjl-filter (WIP): https://github.com/functional-jslib/fjl-filter

## Change log
### 1.2.5
- Dependencies and dev-dependencies updated to latest.
- Tests updated to reflect updated dev-dependencies (jest complained about nested 'describe' blocks and nested 'test' blocks (primarily issue had to do with async and non-async tests)).
 
### 0.18.0
#### Breaking changes
- Removed uncurried methods (methods ending with `$`) (use curried methods instead).
*Removed*:
- `errorIfNotTypeOnTarget$` - ('fjl' provides this now)
- `errorIfNotTypeOnTarget` - ("")
- `defineEnumProps$`
- `defineProps$`

- Renamed auxillary methods:
    - `_descriptorForSettable` becomes `createTypedDescriptor`.
    - `_makeDescriptorEnumerable` becomes `toEnumerableDescriptor`.
    - `_targetDescriptorTuple` becomes `toTargetDescriptorTuple`.
    
#### Other changes:
- Normalized API (removed un-curried methods from exports and non-api specific (un-required) methods).
- Updated build process (using babel7 now).
- Replaced `mocha` and `chai` with `jest`.
- Changed license from "MIT" to "BSD3".
- Version and build tag links to top of readme file.
- Et. al.
