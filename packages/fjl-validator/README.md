[![Build Status](https://travis-ci.org/functional-jslib/fjl-validator.png)](https://travis-ci.org/functional-jslib/fjl-validator)
[![GitHub version](https://badge.fury.io/gh/functional-jslib%2Ffjl-validator.svg)](http://badge.fury.io/gh/functional-jslib%2Ffjl-validator)
[![NPM version](https://badge.fury.io/js/fjl-validator.svg)](http://badge.fury.io/js/fjl-validator)
[![Dependencies](https://david-dm.org/functional-jslib/fjl-validator.png)](https://david-dm.org/functional-jslib/fjl-validator)
# fjl-validator
Functional validator(s) implementation (inspired by Zend/Validator validators).

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

`fjl-validator` was'nt meant to be used alone though what a user will most likely want is 
[`fjl-input-filter`](https://github.com/functional-jslib/fjl-input-filter) though below is a standalone hypothetical scenario:

```
// Let's say this is somewhere on the server:
import {regexValidator, stringLengthValidator, toValidationResult} from 'fjl-validator';

const nameFieldValidators = [
        stringLengthValidator({min: 3, max: 55}),
        regexValidator({
            pattern: /^[a-z][a-z"'.\s]*$/i,
            messageTemplates: {
                DOES_NOT_MATCH_PATTERN:
                    `Only letters, spaces, quotes (""", "'"), and periods are allowed for names.`
            }
        })
    ],
    
    runValidators = (validators, breakOnFailure, value) => {
        let result = true,
            i = 0,
            messageResults = [];
        if (!validators || !validators.length) {
            return toValidationResult({result});
        }
        const limit = validators.length;
        for (; i < limit; i++) {
            const vResult = validators[i](value);
            if (!vResult.result) {
                messageResults.push(vResult.messages);
                result = false;
                if (breakOnFailure) {
                    break;
                }
            }
        }
        return toValidationResult({result, messages: [].concat(...messageResults)});
    },
    
    nameFieldValue = '', // Extract/receive name field value here
    
    validationResult = runValidators(nameFieldValidators, false, nameFieldValue;
    
// Elsewhere (let's say, hypothetically in a react view)
import React, {Component} from 'react';
import {uuid} from './your-utils';

class SomeReactFormComponent extends Component {
    // ...
    render () {
        const {validationResult} = this.state;
        return (<div className="form-field">
            // ...
            // If validation result is `true` don't render anything, else render error messages
            {validationResult.result ? null :  
                (<ul>{validationResult.messages.map(message => (<li key={uuid()}>{message}</li>))}</ul>)
            // ...
        </div>);
    }
    // ...
}

```

#### Other examples:
- [fjl-input-filter test-fixture example](https://github.com/functional-jslib/fjl-input-filter/blob/master/tests/fixtures/input-filter-1.js)

### In NodeJs: 

#### Using es2015 modules:
```
import {...} from 'fjl-validator';
```

#### Using CommonJs modules:
```
const {...} = require('fjl-validator');
```

### In Browser:
See desired export type below:
- './dist/amd/' - Asynchronous module format.
- './dist/cjs/' - CommonJs module format.
- './dist/umd/' - Universal module definition format.
- './dist/iife/' - Immediately Invoked Function Execution - (exports `fjl` as a global).
- './dist/es6-module/' - Ecmascript 6 module format.

## Docs

**JSDocs** are here (https://functional-jslib.github.io/fjl-validator/) [https://functional-jslib.github.io/fjl-validator/].

### `alnumValidator` methods
 ```
alnumValidator, alnumValidator1, default
```
### `digitValidator` methods
 ```
digitValidator, digitValidator1, default
```
### `lengthValidator` methods
 ```
toLengthOptions, lengthValidatorNoNormalize, lengthValidator, default
```
### `notEmptyValidator` methods
 ```
toNotEmptyOptions, notEmptyValidatorNoNormalize, notEmptyValidator,
notEmptyValidator1, default
```
### `regexValidator` methods
 ```
toRegexValidatorOptions, regexValidatorNoNormalize, regexValidator,
default
```
### `stringLengthValidator` methods
 ```
toStringLengthOptions, stringLengthValidatorNoNormalize,
stringLengthValidator, default
```
### `ValidationUtils` methods
 ```
defaultValueObscurator, getErrorMsgByKey, toValidationOptions,
toValidationResult, isOneOf, default
```

### Quick Docs:

### Preamble:
All methods that take more than one named param (take two or more arguments) are curried:  I.e.,
```
alnumValidator, digitValidator, notEmptyValidator, 
regexValidator, stringLengthValidator, getErrorMsgByKey, // et. al.
```

- Explicit one arg variadic methods (`(...args) => (...)`) are not curried:
```
toValidationResult, toValidationOptions
``` 

- The docs below only outline the default exports, and the pertinent methods required for rolling up your 
own validation functions, from the sources in lib (except for 'ValidationUtils` file).  
To see what other methods are exported in lib you can read the in-depth docs at 
[https://functional-jslib.github.io/fjl-validator/](https://functional-jslib.github.io/fjl-validator/) .

### Exported:

#### `toValidationOptions(...options) {ValidationOptions}`
Returns valid validation options objects that can be used as validator options;

##### Params
- `options {Object}`
  - `valueObscured {Boolean}` 
  - `valueObscurator {Function.<String>}` - Obscurator function; E.g. `x => "..."`
  - `messageTemplates {Object.<String, (MessageTemplateCallback|Function|String)>}` - Key value pairs of error messages or error message callbacks (
    See virtual type `MessageTemplateCallback` @todo here).
    
##### Returns
`{ValidationOptions}` -  A strictly typed options object;  Merges passed in options onto strictly typed version which 
 will throw clear error message(s) if type(s) for properties do not match.
 
#### `toValidationResult(...options) {ValidationResult}`
Returns a valid validation result object;

##### Params
- `options {Object}`
    - `result {Boolean}` - Result of validation (`true || false` etc.). 
    - `messages {Array.<String>}` - Error messages if any.
    - `[value {*}]` - Optionally, value that was passed in for validation. 

##### Returns
`{ValidationResult}` - 
 A strictly typed validation result object;  Merges passed in options onto strictly typed version which 
 will throw clear error message(s) if type(s) do not match.

#### `regexValidator(options, value) {ValidationResult}`
Validates values using a regular expression.

##### Params
- `options {Object}`
  - Inherits all properties from `{ValidationOptions}` type (`{valueObscurator, valueObscured, messageTemplates}`).
  - `pattern {RegExp}`
  - `messageTemplates {Object}`
    - `DOES_NOT_MATCH_PATTERN` - Key on `messageTemplates` to populate for custom 'does-not-match-pattern' message.
- `value {*}` - Value to validate.

##### Returns
`{ValidationResult}`

#### `alnumValidator(options, value) {ValidationResult}`
Alpha-numeric value validator.

##### Params
- `options {Object}` - Same as `regexValidator`'s options.
- `value {*}`

##### Composed from
`regexValidator`

##### Returns
`{ValidationResult}`

#### `alnumValidator1(value) {ValidationResult}`
Same as `alnumValidator` except doesn't require an options object.

##### Params
- `value {*}`

##### Returns
`{ValidationResult}`

#### `digitValidator(options, value) {ValidationResult}`
Validates digits.  

##### Composed from 
`regexValidator`

##### Params
- `options {Object}` - Same as `regexValidator`'s options.
- `value {*}` - Value to validate.

##### Returns
`{ValidationResult}`

#### `notEmptyValidator(options, value) {ValidationResult}`
Validates that a value is not an empty;  I.e., 
Checks that value is not one of 
```
    [[], '', null, undefined, {}, Map(), Set(), WeakSet(), WeakMap()]
```
We'll refer to this set as `Empty` here.

##### Params
- `options {Object}`
  - Inherits all properties from `{ValidationOptions}` type (`{valueObscurator, valueObscured, messageTemplates}`) also.
  - `messageTemplates`
    - `EMPTY_NOT_ALLOWED` - Key that can be populated for custom message on receiving an `Empty` (in virtual types).
- `value {*}` - Value to validate.

##### Returns
`{ValidationResult}`

#### `notEmptyValidator1(value) {ValidationResult}`
Same as `notEmptyValidator` except ignores first parameter.

##### Params
- `value {*}` - Value to validate.

##### Returns
`{ValidationResult}`

#### `lengthValidator(options, value) {ValidationResult}`
Validates a lengthable items length.

##### Params
- `options {Object}`
    - `min {Number}` - Default `0`.
    - `max {Number}` - Default `Number.MAX_SAFE_INTEGER`
    - `messageTemplates {Object}`
        - `NOT_OF_TYPE {String|Function}` - Key for generating 'not of type' error.
        - `NOT_WITHIN_RANGE {String|Function}` - Key for generating 'not within range' error.
- `value {*}` - Value to validate.

##### Returns
`{ValidationResult}`

#### `stringLengthValidator(options, value) {ValidationResult}`
Validates a string's length.

##### Params
- `options {Object}`
    - `min {Number}` - Default `0`.
    - `max {Number}` - Default `Number.MAX_SAFE_INTEGER`
    - `messageTemplates {Object}`
            - `NOT_OF_TYPE {String|Function}` - Key for generating 'not of type' error.
            - `NOT_WITHIN_RANGE {String|Function}` - Key for generating 'not within range' error.
- `value {*}` - Value to validate.

##### Returns
`{ValidationResult}`


## Virtual Types:
#### `Empty` 
One of `[null, undefined, '', 0, false, [], {}, Map(), Set(), WeakMap(), WeakSet()]`.

#### `ValidationOptions {Object}`
##### Properties
- `valueObscured {Boolean}` - Whether to obscure value in validation error messages
when value doesn't pass validation.  Default `false`.
- `valueObscurator {Function}` - Function that takes the value
and returns an obscured version;  E.g., 
```
const obscurator = x => Array.fill('*', 0, (x + '').length).join('');
obscure('hello') === '*****' // equals `true` 
```
- `messageTemplates {Object}` - Key-value pair hash where
the values should be either strings and/or functions in the form of `(value, options) => ""` 
or functions that return error messages for failed validations;  E.g.,
```
import {digitValidator} from 'fjl-validator';

    const validateDigits = digitValidator({
        messageTemplates: {
            DOES_NOT_MATCH_PATTERN: x =>
                `Only digits accepted.  Value entered: "${x}".`
        }
    });

    deepEquals(validateDigits('abcdef'), {
        result: false,
        messages: ['Only digits accepted.  Value entered: "abcdef"']
    })
    ; // true
```

#### `MessageTemplateCallback {Function}`
##### Parameters
- `value {*}`
- `options {ValidationOptions}`
@todo `MessageTemplateCallback`'s signature should be `f(options, value)` not other way around (`f(value, options)`).
@todo Should be changed in later version of lib. 

#### `ValidationResult {Object}`
##### Properties
- `result {Boolean}` - Whether value passes validation or not.
- `messages {Array.<String>}` - Validation error messages if any.
- `value {*}` - Value that was validated.

#### `Validator {Function}` - Curried validation function.  Parameters:
##### Parameters
- `options {ValidationOptions}` - Validation/Validator options.
- `value {*}` - Value to be validated.

#### `version {String}` 
Library's version number.

## Development:
- For commands see './package.json' scripts.

### Dir structure
- Everything is in './src'.
- Distrubution is in './dist'.
- Docs are in './docs'.

### Testing
Using `jest` (see './package.json' scripts).

## License:
BSD 3 Clause - Included in sources.

## Resources:
- - Zend/Validator - https://zendframework.github.io/zend-validator/intro/


## Change log

### 0.7.0
#### Breaking changes
- Removed methods ending with '$' also known as un-curried methods
  (use their curried counter parts instead).
  
#### Other changes
- Updated build process to use babel 7.
- Added `lengthValidator` to the mix of validators.
