/**
 * Created by elyde on 11/13/2016.
 * @todo update tests to be more comprehensive (and unitized).
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {compose} from '../../src/function/compose';
import {curry, curry2, __} from '../../src/function/curry';
import {/*expectFalse, expectEqual,*/ expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('curry', function () {

    it ('should be of type function.', function () {
        expectFunction(curry);
    });

    it ('should return a function when called with or without args.', function () {
        expectFunction(curry());
        expectFunction(curry(99));
        expectFunction(curry(() => {}));
        expectFunction(curry(console.log));
    });

    it ('should return a function that fails when no function is passed in (as it\'s first param).', function () {
        assert.throws(curry(), Error);
        assert.throws(curry(99), Error);
    });

    it ('should return a curried function.', function () {
        let min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2);

        // Expect functions
        [min8, max5, pow2].forEach(function (func) {
            expectFunction(func);
        });

        // Expect functions work as expected
        expect(min8(9)).to.equal(8);
        expect(min8(8)).to.equal(8);
        expect(min8(7)).to.equal(7);
        expect(max5(6)).to.equal(6);
        expect(max5(5)).to.equal(5);
        expect(max5(4)).to.equal(5);
        expect(pow2(2)).to.equal(4);
        expect(pow2(3)).to.equal(8);
        expect(pow2(4)).to.equal(16);
    });

    it ('should be able to correctly curry functions of different arity as long as their arity is met.', function () {
        let min = curry2(Math.min),
            max = curry2(Math.max),
            pow = curry2(Math.pow),
            min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2),
            isValidTangentLen = curry((a, b, cSqrd) => pow(a, 2) + pow(b, 2) === cSqrd, 2, 2),
            random = curry((start, end) => Math.round(Math.random() * end + start), 0),
            expectedFor = (num) => min(8, max(5, pow(2, num)));

        // Expect functions returned for `curry` calls
        expectFunction(isValidTangentLen);

        // Expect functions returned for `curry` calls
        [min8, max5, pow2].forEach(function (func) {
            expectFunction(func);
        });

        // Expect `curry`ed functions to work as expected
        expect(isValidTangentLen(8)).to.equal(true);
        expect(isValidTangentLen(21)).to.equal(false);

        // Expect `curry`ed functions to work as expected
        [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
            let composed = compose(min8, max5, pow2);
            expect(composed(num)).to.equal(expectedFor(num));
        });

        let add3Items = (a, b, c) => a + b + c,
            curriedAdd3Items = curry(add3Items);
    });

});
