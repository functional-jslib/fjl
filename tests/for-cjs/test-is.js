/**
 * Created by elyde on 1/30/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
const {isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet, isConstructablePrimitive}  = require('../../dist/cjs/is');
const {expectTrue, expectFalse, expectFunction}  = require('./helpers');
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('is#isFunction', function () {
    it('should return true if value is a functionOps', function () {
        [() => {}, Math.pow, console.log, function () {}]
            .forEach(value => expectTrue(isFunction(value)));
    });
    it('should return `false` when value is not a functionOps', function () {
        [-1, 0, 1, [], {}, 'abc']
            .forEach(value => expectFalse(isFunction(value)));
    });
});

describe('is#isArray', function () {
    it ('should return `true` when given value is an listOps', function () {
        expectTrue(isArray([]));
    });
    it ('should return `false` when given value is not an listOps', function () {
        expectFalse(isArray(function () {}));
    });
});

describe('is#isObject', function () {
    it ('should return `true` when given value is a direct instance of `Object`', function () {
        expectTrue(isObject({}));
    });
    it ('should return `false` when given value is not a direct instance of `Object`', function () {
        expectFalse(isObject(function () {}));
    });
});

describe('is#isBoolean', function () {
    it ('should return `true` when given value is a booleanOps', function () {
        expectTrue(isBoolean(true));
        expectTrue(isBoolean(false));
    });
    it ('should return `false` when given value is not a booleanOps', function () {
        expectFalse(isBoolean(function () {}));
    });
});

describe('is#isNumber', function () {
    it ('should return `true` when given value is a numberOps', function () {
        expectTrue(isNumber(99));
        expectTrue(isNumber(-1.0));
        expectTrue(isNumber(Number('1e-3')));
    });
    it ('should return `false` when given value is not a numberOps', function () {
        expectFalse(isNumber(function () {}));
        expectFalse(isNumber(NaN));
    });
});

describe('is#isString', function () {
    it ('should return `true` when given value is a stringOps', function () {
        expectTrue(isString('hello'));
        expectTrue(isString(String('hello')));
    });
    it ('should return `false` when given value is not a stringOps', function () {
        expectFalse(isString(function () {}));
        expectFalse(isString(NaN));
    });
});

if (typeof Map !== 'undefined') {
    describe('is#isMap', function () {
        it ('should return `true` when given value is a map', function () {
            expectTrue(isMap(new Map()));
        });
        it ('should return `false` when given value is not a map', function () {
            expectFalse(isMap(function () {}));
            expectFalse(isMap(NaN));
        });
    });
}

if (typeof Set !== 'undefined') {
    describe('is#isSet', function () {
        it ('should return `true` when given value is a set', function () {
            expectTrue(isSet(new Set()));
        });
        it ('should return `false` when given value is not a set', function () {
            expectFalse(isSet(function () {}));
            expectFalse(isSet(NaN));
        });
    });
}

if (typeof WeakMap !== 'undefined') {
    describe('is#isWeakMap', function () {
        it ('should return `true` when given value is a weak map', function () {
            expectTrue(isWeakMap(new WeakMap()));
        });
        it ('should return `false` when given value is not a weak map', function () {
            expectFalse(isWeakMap(function () {}));
            expectFalse(isWeakMap(NaN));
        });
    });
}

if (typeof WeakSet !== 'undefined') {
    describe('is#isWeakSet', function () {
        it ('should return `true` when given value is a weak set', function () {
            expectTrue(isWeakSet(new WeakSet()));
        });
        it ('should return `false` when given value is not a weak set', function () {
            expectFalse(isWeakSet(function () {}));
            expectFalse(isWeakSet(NaN));
        });
    });
}

describe('is#isUndefined', function () {
    it ('should return `true` when given value is a undefined', function () {
        expectTrue(isUndefined(undefined));
    });
    it ('should return `false` when given value is not a undefined', function () {
        expectFalse(isUndefined(function () {}));
        expectFalse(isUndefined(NaN));
    });
});

describe('is#isNull', function () {
    it ('should return `true` when given value is a null', function () {
        expectTrue(isNull(null));
    });
    it ('should return `false` when given value is not a null', function () {
        expectFalse(isNull(function () {}));
        expectFalse(isNull(NaN));
    });
});

describe('is#isSymbol', function () {
    it ('should return `true` when given value is a symbol', function () {
        expectTrue(isSymbol(Symbol('hello123')));
    });
    it ('should return `false` when given value is not a symbol', function () {
        expectFalse(isSymbol(function () {}));
        expectFalse(isSymbol(NaN));
    });
});
