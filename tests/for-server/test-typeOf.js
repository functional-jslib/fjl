/**
 * Created by edlc on 1/30/17.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {typeOf} from '../../src/type-checking/typeOf';
import {isType} from '../../src/type-checking/is'; // @todo move the tests for `isType` to another test suite (function was renamed from `typeOfIs` and moved to a new package so it's tests have to move to).
import {apply} from '../../src/function/apply';
import {expectTrue, expectFalse, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('#typeOf', function () {
    it ('should be a function', function () {
        expectFunction(typeOf);
    });
    it ('should return a function when no value is passed in (is curried)', function () {
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
    it ('should be a function', function () {
        expectFunction(isType);
    });
    it ('should return `true` when passed in value is of passed in type name/string', function () {
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
    it ('should return `false` when passed in value is not of passed in type name/string', function () {
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
