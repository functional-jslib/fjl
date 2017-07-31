/**
 * Created by u067265 on 5/1/17.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {apply} from '../../src/function/apply';
import {call} from '../../src/function/call';
import {flip, flipN, until, id} from '../../src/function/function';
import {log, add, subtract, length, expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('Function Operators', function () {

    // @todo implement more extensive tests later
    describe ('#call', function () {
        it ('should be a function', function () {
            expectFunction(call);
        });
        it ('should be curried', function () {
            const adder = call(add);
            expectFunction(adder());
            expectEqual(adder(1, 2, 3, 4, 5), 15);
        });
        it ('should call a function passed into it along with passed in arguments', function () {
            expectEqual(call(add, 1, 2, 3, 4, 5), 15);
        });
    });

    // @todo implement more extensive tests later
    describe ('#apply', function () {
        it ('should be a function', function () {
            expectFunction(apply);
        });
        it ('should be curried', function () {
            const addAllInArray = apply(add);
            expectFunction (addAllInArray);
            expectEqual(addAllInArray([1, 2, 3, 4, 5]), 15);
        });
        it ('should call a function passed into it with args array passed in as second parameter', function () {
            expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
        });
    });

    describe ('#flip', function () {
        it ('should be a function', function () {
            expectFunction(flip);
        });
        it ('should return a function', function () {
            expectFunction(flip());
            expectFunction(flip(subtract));
        });
        it ('should return a function which executes its params in reverse.', function () {
            const subtractor = flip(subtract);
            expectFunction(subtractor);
            expectEqual(subtract(2, 1), subtractor(1, 2));
            expectEqual(subtract(1, 2), subtractor(2, 1));
        });
    });

    describe ('#flipN', function () {
        it ('should be a function', function () {
            expectFunction(flipN);
        });
        it ('should return a function', function () {
            expectFunction(flipN());
            expectFunction(flipN(subtract));
        });
        it ('should return a function which executes its params in reverse.', function () {
            const subtractor = flipN(subtract);
            expectFunction(subtractor);
            expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
            expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
        });
    });

    describe ('#until', function () {
        it ('should be a function', function () {
            expectFunction(until);
        });

        it ('should run while predicate returns `false`', function () {
            const result = until(x => x >= 100, x => { log(x); return x + x; }, 1);
            expectEqual(result, 128);
            log('Result:', result);
        });

        it ('should throw an error when no predicate is passed in', function () {
            assert.throws(
                () => until(null, x => { log(x); return x + x; }, 1),
                Error
            );
        });

        it ('should throw an error when no operation is passed in', function () {
            assert.throws(
                () => until(x => x >= 100, null, 1),
                Error
            );
        });
    });

    describe ('#id', function () {
        it ('should be a function', function () {
            expectFunction(id);
        });
        it ('should return whatever you give it', function () {
            expectEqual(id(1), 1);
            expectEqual(id(undefined), undefined);
        });
    });

});
