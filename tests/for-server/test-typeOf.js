/**
 * Created by edlc on 1/30/17.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {typeOf, typeOfIs} from '../../src/typeOf';
import {expectTrue, expectFalse, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('#typeOf', function () {
    it ('should be a function', function () {
        expectFunction(typeOf);
    });
    it ('should require an arity of `1`', function () {
        expectEqual(typeOf.length, 1);
    });
    it ('should return "Undefined" when no value is passed in', function () {
        expectEqual(typeOf(), 'Undefined');
    });
    it ('should return the passed type\'s name', function () {
        [
            [[],    'Array'],
            [{},    'Object'],
            ['',    'String'],
            [function () {}, 'Function'],
            [99,    'Number'],
            [true,  'Boolean'],
            [false, 'Boolean'],
            [null,  'Null'],
            [undefined, 'Undefined']
        ]
            .forEach(tuple => expectEqual(typeOf(tuple[0]), tuple[1]));
    });
});

describe('#typeOfIs', function () {
    it ('should be a function', function () {
        expectFunction(typeOfIs);
    });
    it ('should require an arity of `2`', function () {
        expectEqual(typeOfIs.length, 2);
    });
    it ('should return `false` when no value is passed in', function () {
        expectFalse(typeOfIs());
    });
    it ('should return `true` when passed in value is of passed in type name/string', function () {
        [
            [[],    'Array'],
            [{},    'Object'],
            ['',    'String'],
            [function () {}, 'Function'],
            [99,    'Number'],
            [true,  'Boolean'],
            [false, 'Boolean'],
            [null,  'Null'],
            [undefined, 'Undefined']
        ]
            .forEach(tuple => expectTrue(typeOfIs.apply(null, tuple)));
    });
    it ('should return `true` when passed in value is of passed in type constructor', function () {
        [
            [[],    Array],
            [{},    Object],
            ['',    String],
            [function () {}, Function],
            [99,    Number],
            [true,  Boolean],
            [false, Boolean]
        ]
            .forEach(tuple => expectTrue(typeOfIs.apply(null, tuple)));
    });
    it ('should return `false` when passed in value is not of passed in type name/string', function () {
        [
            [[],    'Object'],
            [{},    'Array'],
            ['',    'NaN'],
            [function () {}, 'Number'],
            [99,    'Function'],
            [true,  'NaN'],
            [false, 'Number']
        ]
            .forEach(tuple => expectFalse(typeOfIs.apply(null, tuple)));
    });
    it ('should return `false` when passed in value is not of passed in type constructor', function () {
        [
            [[],    Object],
            [{},    Array],
            ['',    NaN],
            [function () {}, Number],
            [99,    Function],
            [true,  NaN],
            [false, Number]
        ]
            .forEach(tuple => expectFalse(typeOfIs.apply(null, tuple)));
    });
});
