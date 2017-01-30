/**
 * Created by elyde on 1/30/2017.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import is from '../../src/is';
import {expectTrue, expectFalse, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('is functions', function () {
    // Function names
    [
        'isset',
        'issetAndOfType',
        'isNumber',
        'isFunction',
        'isArray',
        'isBoolean',
        'isObject',
        'isString',
        'isMap',
        'isSet',
        'isWeakMap',
        'isWeakSet',
        'isUndefined',
        'isNull',
        'isSymbol',
        'isEmpty',
        'isOfConstructablePrimitive'
    ]
        .forEach(key => {
            it(`should have a \`${key}\` function`, function () {
                expectFunction(is[key]);
            });
        });
});

describe('is#isFunction', function () {
    it('should return true if value is a function', function () {
        [() => {}, Math.pow, console.log, function () {}]
            .forEach(value => expectTrue(is.isFunction(value)));
    });
    it('should return `false` when value is not a function', function () {
        [-1, 0, 1, [], {}, 'abc']
            .forEach(value => expectFalse(is.isFunction(value)));
    });
});

describe('is#isset', function () {
    it('should return true for any value that is not `null` or `undefined`', function () {
        [-1, 0, 1, 'a', true, false, () => {}, [], {}, Symbol('hotdog')]
            .forEach(value => expectTrue(is.isset(value)));
    });
    it('should return `false` for any value that is `null` or `undefined`', function () {
        [null, undefined].forEach(value => expectFalse(is.isset(value)));
    });
});

describe('is#issetAndOfType', function () {
    it('should return true for any value that is "set" and is of given "Type"', function () {
        [
            [-1, Number],
            [0, 'Number'],
            [1, Number],
            ['a', String],
            [true, Boolean],
            [false, Boolean.name],
            [() => {
            }, Function],
            [[], Array.name],
            [{}, Object.name],
            [Symbol('hotdog'), Symbol]
        ]
            .forEach(tuple => expectTrue(is.issetAndOfType.apply(is, tuple)));
    });
    it('should return `false` for any value that is not "set" or is not of given "Type"', function () {
        [
            [-1, Array],
            [0, 'Function'],
            [1, Function],
            ['a', Boolean],
            [true, Object],
            [false, String],
            [() => {
            }, String.name],
            [[], 'String'],
            [{}, 'HotDog'],
            [Symbol('hotdog'), 'SomeConstructName']
        ]
            .forEach(tuple => expectFalse(is.issetAndOfType.apply(is, tuple)));
    });
});

describe('is#isArray', function () {
    it ('should return `true` when given value is an array', function () {
        expectTrue(is.isArray([]));
    });
    it ('should return `false` when given value is not an array', function () {
        expectFalse(is.isArray(function () {}));
    });
});

describe('is#isObject', function () {
    it ('should return `true` when given value is a direct instance of `Object`', function () {
        expectTrue(is.isObject({}));
    });
    it ('should return `false` when given value is not a direct instance of `Object`', function () {
        expectFalse(is.isObject(function () {}));
    });
});

describe('is#isBoolean', function () {
    it ('should return `true` when given value is a boolean', function () {
        expectTrue(is.isBoolean(true));
        expectTrue(is.isBoolean(false));
    });
    it ('should return `false` when given value is not a boolean', function () {
        expectFalse(is.isBoolean(function () {}));
    });
});

describe('is#isNumber', function () {
    it ('should return `true` when given value is a number', function () {
        expectTrue(is.isNumber(99));
        expectTrue(is.isNumber(-1.0));
        expectTrue(is.isNumber(Number('1e-3')));
    });
    it ('should return `false` when given value is not a number', function () {
        expectFalse(is.isNumber(function () {}));
        expectFalse(is.isNumber(NaN));
    });
});

describe('is#isString', function () {
    it ('should return `true` when given value is a string', function () {
        expectTrue(is.isString('hello'));
        expectTrue(is.isString(String('hello')));
    });
    it ('should return `false` when given value is not a string', function () {
        expectFalse(is.isString(function () {}));
        expectFalse(is.isString(NaN));
    });
});

if (typeof Map !== 'undefined') {
    describe('is#isMap', function () {
        it ('should return `true` when given value is a map', function () {
            expectTrue(is.isMap(new Map()));
        });
        it ('should return `false` when given value is not a map', function () {
            expectFalse(is.isMap(function () {}));
            expectFalse(is.isMap(NaN));
        });
    });
}

if (typeof Set !== 'undefined') {
    describe('is#isSet', function () {
        it ('should return `true` when given value is a set', function () {
            expectTrue(is.isSet(new Set()));
        });
        it ('should return `false` when given value is not a set', function () {
            expectFalse(is.isSet(function () {}));
            expectFalse(is.isSet(NaN));
        });
    });
}

if (typeof WeakMap !== 'undefined') {
    describe('is#isWeakMap', function () {
        it ('should return `true` when given value is a weak map', function () {
            expectTrue(is.isWeakMap(new WeakMap()));
        });
        it ('should return `false` when given value is not a weak map', function () {
            expectFalse(is.isWeakMap(function () {}));
            expectFalse(is.isWeakMap(NaN));
        });
    });
}

if (typeof WeakSet !== 'undefined') {
    describe('is#isWeakSet', function () {
        it ('should return `true` when given value is a weak set', function () {
            expectTrue(is.isWeakSet(new WeakSet()));
        });
        it ('should return `false` when given value is not a weak set', function () {
            expectFalse(is.isWeakSet(function () {}));
            expectFalse(is.isWeakSet(NaN));
        });
    });
}

describe('is#isUndefined', function () {
    it ('should return `true` when given value is a undefined', function () {
        expectTrue(is.isUndefined(undefined));
    });
    it ('should return `false` when given value is not a undefined', function () {
        expectFalse(is.isUndefined(function () {}));
        expectFalse(is.isUndefined(NaN));
    });
});

describe('is#isNull', function () {
    it ('should return `true` when given value is a null', function () {
        expectTrue(is.isNull(null));
    });
    it ('should return `false` when given value is not a null', function () {
        expectFalse(is.isNull(function () {}));
        expectFalse(is.isNull(NaN));
    });
});

describe('is#isSymbol', function () {
    it ('should return `true` when given value is a symbol', function () {
        expectTrue(is.isSymbol(Symbol('hello123')));
    });
    it ('should return `false` when given value is not a symbol', function () {
        expectFalse(is.isSymbol(function () {}));
        expectFalse(is.isSymbol(NaN));
    });
});

describe('is#isEmpty', function () {
    it ('should return `true` when given value is empty', function () {
        [0, null, undefined, '', [], {}, function () {}, () => {}]
            .forEach(value => expectTrue(is.isEmpty(value)));
    });
    it ('should return `false` when given value is not empty', function () {
        [1, 'something', [1, 2, 3], {a: 'b'}, function (a, b, c) {}, id => id]
        .forEach(value => expectFalse(is.isEmpty(value)));
    });
});

describe('is#isOfConstructablePrimitive', function () {
    it ('should return `true` when given value is of an "constructable"', function () {
        [[], {}, 99, 'hello']
            .forEach(value => expectTrue(is.isOfConstructablePrimitive((value))));
    });
    it ('should return `false` when given value is not of an "constructable"', function () {
        expectFalse(is.isOfConstructablePrimitive(NaN));
    });
});
