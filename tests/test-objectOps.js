/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by elyde on 11/25/2016.
 * @todo add more extensive tests for `hasOwnProperty`
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {instanceOf, hasOwnProperty, keys} from '../src/uncurried/jsPlatform/objectUncurried';
import {objComplement, objDifference, objUnion, objIntersect} from '../src/objectOps/objectOps';
import {apply} from '../src/functionOps/apply';
import {typeOf} from '../src/objectOps/typeOf';
import {
    isType,
    isNumber, isFunction, isArray, isBoolean, isObject, isString,
    isUndefined, isNull, isSymbol, isMap, isSet,
    isWeakMap, isWeakSet} from '../src/objectOps/is';
import {expectTrue, expectFalse, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('#objectOps', function () {

    describe('#hasOwnProperty', function () {
        it ('should be a functionOps', function () {
            expectFunction(hasOwnProperty);
        });
        it ('should return true when passed in objectOps has the passed in property name', function () {
            const obj = {hello: 'ola', ola: 'mambo'};
            expectTrue(hasOwnProperty('hello', obj));
            expectTrue(hasOwnProperty('ola', obj));
        });
        it ('should return false when passed in objectOps doesn\'t have the passed in property name', function () {
            expectFalse(hasOwnProperty('hello', {}));
            expectFalse(hasOwnProperty('mambo', {}));
        });
    });

    describe('#typeOf', function () {
        it ('should be a functionOps', function () {
            expectFunction(typeOf);
        });
        it ('should return a functionOps when no value is passed in (is curried)', function () {
            expectEqual(typeOf(), 'Undefined');
        });
        it ('should return the passed type\'s name', function () {
            [
                ['Array', []],
                ['Object', {}],
                ['String', ''],
                ['Function', function () {}],
                ['Number', 99],
                ['Boolean', true],
                ['Boolean', false],
                ['Null', null],
                ['Undefined', undefined]
            ]
                .forEach(tuple => expectEqual(apply(typeOf, tuple)));
        });
    });

    describe('#isType', function () {
        it ('should be a functionOps', function () {
            expectFunction(isType);
        });
        it ('should return `true` when passed in value is of passed in type name/stringOps', function () {
            [
                ['Array', []],
                ['Object', {}],
                ['String', ''],
                ['Function', function () {}],
                ['Number', 99],
                ['Boolean', true],
                ['Boolean', false],
                ['Null', null],
                ['Undefined', undefined]
            ]
                .forEach(tuple => expectTrue(apply(isType, tuple)));
        });
        it ('should return `true` when passed in value is of passed in type constructor', function () {
            [
                [Array, []],
                [Object, {}],
                [String, ''],
                [Function, function () {}],
                [Number, 99],
                [Boolean, true],
                [Boolean , false]
            ]
                .forEach(tuple => expectTrue(apply(isType, tuple)));
        });
        it ('should return `false` when passed in value is not of passed in type name/stringOps', function () {
            [
                ['Object', []],
                ['Array', {}],
                ['NaN', ''],
                ['Number', function () {}],
                ['Function', 99],
                ['NaN', true],
                ['Number', false]
            ]
                .forEach(tuple => expectFalse(apply(isType, tuple)));
        });
        it ('should return `false` when passed in value is not of passed in type constructor', function () {
            [
                [Object, []],
                [Array, {}],
                [NaN, ''],
                [Number, function () {}],
                [Function, 99],
                [NaN, true],
                [Number, undefined],
                [Array, false]
            ]
                .forEach(tuple => expectFalse(apply(isType, tuple)));
        });
    });

    describe('#isFunction', function () {
        it('should return true if value is a functionOps', function () {
            [() => {}, Math.pow, console.log, function () {}]
                .forEach(value => expectTrue(isFunction(value)));
        });
        it('should return `false` when value is not a functionOps', function () {
            [-1, 0, 1, [], {}, 'abc']
                .forEach(value => expectFalse(isFunction(value)));
        });
    });

    describe('#isArray', function () {
        it ('should return `true` when given value is an listOps', function () {
            expectTrue(isArray([]));
        });
        it ('should return `false` when given value is not an listOps', function () {
            expectFalse(isArray(function () {}));
        });
    });

    describe('#isObject', function () {
        it ('should return `true` when given value is a direct instance of `Object`', function () {
            expectTrue(isObject({}));
        });
        it ('should return `false` when given value is not a direct instance of `Object`', function () {
            expectFalse(isObject(function () {}));
        });
    });

    describe('#isBoolean', function () {
        it ('should return `true` when given value is a booleanOps', function () {
            expectTrue(isBoolean(true));
            expectTrue(isBoolean(false));
        });
        it ('should return `false` when given value is not a booleanOps', function () {
            expectFalse(isBoolean(function () {}));
        });
    });

    describe('#isNumber', function () {
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

    describe('#isString', function () {
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
        describe('#isMap', function () {
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
        describe('#isSet', function () {
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
        describe('#isWeakMap', function () {
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
        describe('#isWeakSet', function () {
            it ('should return `true` when given value is a weak set', function () {
                expectTrue(isWeakSet(new WeakSet()));
            });
            it ('should return `false` when given value is not a weak set', function () {
                expectFalse(isWeakSet(function () {}));
                expectFalse(isWeakSet(NaN));
            });
        });
    }

    describe('#isUndefined', function () {
        it ('should return `true` when given value is a undefined', function () {
            expectTrue(isUndefined(undefined));
        });
        it ('should return `false` when given value is not a undefined', function () {
            expectFalse(isUndefined(function () {}));
            expectFalse(isUndefined(NaN));
        });
    });

    describe('#isNull', function () {
        it ('should return `true` when given value is a null', function () {
            expectTrue(isNull(null));
        });
        it ('should return `false` when given value is not a null', function () {
            expectFalse(isNull(function () {}));
            expectFalse(isNull(NaN));
        });
    });

    describe('#isSymbol', function () {
        it ('should return `true` when given value is a symbol', function () {
            expectTrue(isSymbol(Symbol('hello123')));
        });
        it ('should return `false` when given value is not a symbol', function () {
            expectFalse(isSymbol(function () {}));
            expectFalse(isSymbol(NaN));
        });
    });

    describe('#instanceOf', function () {
        it ('should return true when parameter two is of type parameter one', function () {
            expectTrue(instanceOf(Function, function () {}));
        });
        it ('should return false when parameters two is not of type parameter one', function () {
            expectFalse(instanceOf(Function, {}));
        })
    });

    describe('#objComplement', function () {
        it('should be a functionOps', function () {
            expectFunction(objComplement);
        });
        it('should return an objectOps with only properties not found in the first obj', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                subj3 = {e: 5, f: 6, g: 7},
                result = objComplement(subj1, subj2, subj3);
            [subj2, subj3].forEach(function (subj) {
                keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
            keys(subj1).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });
    });

    describe('#objDifference', function () {

        it('should be a functionOps', function () {
            expectFunction(objDifference);
        });

        it('should return all the props from obj1 that aren\'t in obj2', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {d: 4},
                result = objDifference(subj1, subj2);
            Object.keys(subj1).forEach(key => {
                expectEqual(result[key], subj1[key]);
            });
            Object.keys(subj2).forEach(key => {
                expectFalse(result.hasOwnProperty(key));
            });
        });

    });

    describe('#objUnion', function () {
        it('should be a functionOps', function () {
            expectFunction(objUnion);
        });
        it ('should return an objectOps containing all properties from the two objects passed in', function () {
            let subj1 = {a: 1, b: 2, c: 3},
                subj2 = {e: 5, f: 6, g: 7},
                result = objUnion(subj1, subj2);
            [subj2, subj1].forEach(function (subj) {
                Object.keys(subj).forEach(key => {
                    expectEqual(result[key], subj[key]);
                });
            });
        });
    });

    describe('#objIntersect', function () {
        it('should be a functionOps', function () {
            expectFunction(objUnion);
        });
        it ('should return an objectOps that contains values from both passed in objects', function () {
            let subj1 = {a: 1, b: 2, c: 3, e: 4, f: 8},
                subj2 = {a: 5, b: 6, c: 7, g: 9},
                sharedKeys = ['a', 'b', 'c'],
                result = objIntersect(subj1, subj2);
            sharedKeys.forEach(key => {
                expectEqual(result[key], subj2[key]);
            });
        });
    });

});
