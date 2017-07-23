/**
 * Created by elyde on 1/30/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import {instanceOf} from '../../src/instanceOf';
import {isset, isNumber,
    isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isEmpty, isMap, isSet,
    isWeakMap, isWeakSet} from '../../src/is';
import {expectTrue, expectFalse, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('is#isFunction', function () {
    it('should return true if value is a function', function () {
        [() => {}, Math.pow, console.log, function () {}]
            .forEach(value => expectTrue(isFunction(value)));
    });
    it('should return `false` when value is not a function', function () {
        [-1, 0, 1, [], {}, 'abc']
            .forEach(value => expectFalse(isFunction(value)));
    });
});

describe('is#isset', function () {
    it('should return true for any value that is not `null` or `undefined`', function () {
        [-1, 0, 1, 'a', true, false, () => {}, [], {}, Symbol('hotdog')]
            .forEach(value => expectTrue(isset(value)));
    });
    it('should return `false` for any value that is `null` or `undefined`', function () {
        [null, undefined].forEach(value => expectFalse(isset(value)));
    });
});

describe('is#isArray', function () {
    it ('should return `true` when given value is an array', function () {
        expectTrue(isArray([]));
    });
    it ('should return `false` when given value is not an array', function () {
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
    it ('should return `true` when given value is a boolean', function () {
        expectTrue(isBoolean(true));
        expectTrue(isBoolean(false));
    });
    it ('should return `false` when given value is not a boolean', function () {
        expectFalse(isBoolean(function () {}));
    });
});

describe('is#isNumber', function () {
    it ('should return `true` when given value is a number', function () {
        expectTrue(isNumber(99));
        expectTrue(isNumber(-1.0));
        expectTrue(isNumber(Number('1e-3')));
    });
    it ('should return `false` when given value is not a number', function () {
        expectFalse(isNumber(function () {}));
        expectFalse(isNumber(NaN));
    });
});

describe('is#isString', function () {
    it ('should return `true` when given value is a string', function () {
        expectTrue(isString('hello'));
        expectTrue(isString(String('hello')));
    });
    it ('should return `false` when given value is not a string', function () {
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

describe('is#isEmpty', function () {
    it ('should return `true` when given value is empty', function () {
        [0, null, undefined, '', [], {}, function () {}, () => {}]
            .forEach(value => expectTrue(isEmpty(value)));
    });
    it ('should return `false` when given value is not empty', function () {
        [1, 'something', [1, 2, 3], {a: 'b'}, function (a, b, c) {}, id => id]
        .forEach(value => expectFalse(isEmpty(value)));
    });
});

describe('is#instanceOf', function () {
    it ('should return true when parameter two is of type parameter one', function () {
        expectTrue(instanceOf(Function, function () {}));
    });
    it ('should return false when parameters two is not of type parameter one', function () {
        expectFalse(instanceOf(Function, {}));
    })
});
