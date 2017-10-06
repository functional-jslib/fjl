/**
 * Created by elyde on 1/21/2017.
 */
// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
let {expect, assert}  = require('chai');
let errorIfNotTypeFactory  = require('../../../dist/cjs/errorIfNotTypeFactory');
let {curry, curry2}  = require('../../../dist/cjs/curry');
let {expectFunction}  = require('../../../tests/for-cjs/helpers');
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('errorIfNotTypeFactory', function () {

    it ('should be of type functionOps.', function () {
        expectFunction(errorIfNotTypeFactory);
    });

    it ('should return a functionOps whether or not any parameters were passed in to it.', function () {
        expectFunction(errorIfNotTypeFactory());
        expectFunction(errorIfNotTypeFactory('someContextNameHere'));
    });

    it ('should return a functionOps that when fired with error condition should include the shared contextName.', function () {
        let fn1 = errorIfNotTypeFactory(),
            fn2 = errorIfNotTypeFactory('someContextNameHere');
        expectFunction(fn1);
        expectFunction(fn2);
        assert.throws(curry(fn1, 'someValueName', 99, Array),
            '.someValueName is required to be of one of ' +
                'the types : ["Array"].  Type received: Number');
        assert.throws(curry(fn2, 'someValueName', 99, Array),
            'someContextNameHere.someValueName is required to be of one of ' +
            'the types : ["Array"].  Type received: Number');
        assert.throws(curry(fn2, 'someValueName', 99, Array, String, Function),
            'someContextNameHere.someValueName is required to be of one of ' +
            'the types : ["Array", "String", "Function"].  Type received: Number');
    });

    it ('should return a functionOps that throws an error when the passed in value doesn\'t match one of ' +
        'the "one-or-more" passed in types.', function () {
        let errorIfNotType = errorIfNotTypeFactory('someContextName');
        assert.throws(curry(errorIfNotType, 'someValueName', 99, Array), Error);
        assert.throws(curry(errorIfNotType, 'someValueName', 99, String, Array), Error);
        assert.throws(curry(errorIfNotType, 'someValueName', 99, String, Function, Array), Error);
    });

    it ('should return a functionOps that does not throw an error when the passed in value matches one of ' +
        'the "one-or-more" passed in types.', function () {
        let errorIfNotType = errorIfNotTypeFactory('someContextName');
        assert.doesNotThrow(curry(errorIfNotType, 'someValueName', 99, Array, Number, String), Error);
        assert.doesNotThrow(curry(errorIfNotType, 'someValueName', 99, Number, Array), Error);
        assert.doesNotThrow(curry(errorIfNotType, 'someValueName', 99, String, Function, Number), Error);
    });

});
