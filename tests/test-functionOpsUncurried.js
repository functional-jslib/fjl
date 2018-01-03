/**
 * Created by u067265 on 5/1/17.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';

import {assert, expect} from 'chai';
import {reverse} from '../src/uncurried/_listOps';
import {
    curry2, compose, call, apply, flip, flip3, flip4, flip5, flipN, until, id
} from '../src/uncurried/_functionOps';

import {log, add, subtract, length, expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';

// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('#functionOps_', function () {

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
        it ('should call a function passed into it with args _listOps passed in as second parameter', function () {
            expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
        });
    });

    describe ('#flip', function () {
        const fncs = [flip, flip3, flip4, flip5];
        it ('each implementation (flip, flip3, flip4, flip5) should be a function', function () {
            fncs.forEach(expectFunction);
        });
        it ('each implementation ("") should return a function', function () {
            fncs.forEach(fn => {
                expectFunction(fn());
                expectFunction(fn(subtract));
            });
        });
        it ('each implementation ("") should return a function which executes its params in reverse.', function () {
            const
                concatStr2 = (a, b) => a + b,
                concatStr3 = (a, b, c) => a + b + c,
                concatStr4 = (a, b, c, d) => a + b + c + d,
                concatStr5 = (a, b, c, d, e) => a + b + c + d + e,
                args = ['a', 'b', 'c', 'd', 'e'];
            [
                flip(concatStr2),
                flip3(concatStr3),
                flip4(concatStr4),
                flip5(concatStr5)].forEach((fn, ind) => {
                    const argsToOpOn = args.slice(0, ind + 2),
                        argsToOpOnReversed = reverse(argsToOpOn);
                        expectFunction(fn);
                        expectEqual(apply(fn, argsToOpOn), argsToOpOnReversed.join(''));
                        expectEqual(apply(fn, argsToOpOnReversed), argsToOpOn.join(''));
                });
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
            const result = until(x => x >= 100, x => { return x + x; }, 1);
            expectEqual(result, 128);
            // log('Result:', result);
        });

        it ('should throw an error when no predicate is passed in', function () {
            assert.throws(
                () => until(null, x => { return x + x; }, 1),
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

    describe('#compose', function () {

        it ('should be of type _functionOps.', function () {
            expect(compose).to.be.instanceOf(Function);
        });

        it ('should return a function whether or not any parameters were passed in to it.', function () {
            expect(compose()).to.be.instanceOf(Function);
            expect(compose(console.log)).to.be.instanceOf(Function);
        });

        it ('should return a function that when used returns the passed in value if `compose` ' +
            'itself didn\'t receive any parameters.', function () {
            let result = compose();
            expect(result(99)).to.equal(99);
        });

        it ('should be able to compose an arbitrary numberOps of functions and execute them as expected ' +
            'from generated _functionOps.', function () {
            let min = curry2(Math.min),
                max = curry2(Math.max),
                pow = curry2(Math.pow),
                composed = compose(min(8), max(5), pow(2)),
                randomNum = curry2( (start, end) => Math.round(Math.random() * end + start) ),
                random = randomNum(0),
                expectedFor = (num) => min(8, max(5, pow(num, 2)));
            [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
                expect(composed(num)).to.equal(expectedFor(num));
            });
        });

    });

});
