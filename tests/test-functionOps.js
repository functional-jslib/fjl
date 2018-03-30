/**
 * Created by u067265 on 5/1/17.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';

import {
    apply, call, compose,
    curry, curry2, curryN, __,
    curry_, curry2_, curry3_, curry5_, curryN_,
    flip, flipN, until, id
}
from '../src/functionOps';

import {log, add, subtract, length, expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('#functionOps', function () {

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
        it ('should call a function passed into it with args _listOps passed in as second parameter', function () {
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

        it ('should be of type function.', function () {
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
            'from generated function.', function () {
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

    describe('#curry', function () {

        it ('should be of type function.', function () {
            expectFunction(curry);
        });

        it ('should return a function when called with one or more "correct" args.', function () {
            expectFunction(curry(log, 99));
            expectFunction(curry(log));
        });

        it ('should throw an error when receiving anything other than a function for first param', function () {
            [99, false, true, null, undefined, [], {}].forEach(x => {
                assert.throws(() => curry(x), Error);
            });
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

    describe('#curryN', function () {

        // Set curry here to use below
        let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
            addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
            divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

        it ('should be of type function.', function () {
            expect(curryN).to.be.instanceOf(Function);
        });

        it ('should return a function that throws an error when no arguments are passed.', function () {
            let result = curryN();
            expect(result).to.be.instanceOf(Function);
            assert.throws(result, Error);
        });

        it ('should pass in any values passed the arity when executing the curried function', function () {
            let add3Nums = curryN(3, addRecursive);

            // Curry add to add 3 numbers
            expect(add3Nums()(1, 2, 3)) .to.equal(6);
            expect(add3Nums(1)(2, 3))   .to.equal(6);
            expect(add3Nums(1, 2,)(3))  .to.equal(6);
            expect(add3Nums(1, 2, 3))   .to.equal(6);

            // Curry `add` to add any numbers passed required arity
            expect(add3Nums()(1, 2, 3, 5, 6))   .to.equal(17);
            expect(add3Nums(1)(2, 3, 5, 6))     .to.equal(17);
            expect(add3Nums(1, 2)(3, 5, 6))     .to.equal(17);
            expect(add3Nums(1, 2, 3, 5, 6))     .to.equal(17);
        });

        it ('should respect the passed in "executeArity" (shouldn\'t be called to passed in arity length is reached', function () {
            let multiply5Nums = curryN(5, multiplyRecursive),
                multiplyExpectedResult = Math.pow(5, 5),
                argsToTest = [
                    [5, 5, 5, 5, 5],
                    [5, 5, 5, 5],
                    [5, 5, 5],
                    [5, 5],
                    [5]
                ],
                partiallyAppliedResults = [
                    multiply5Nums(),
                    multiply5Nums(5),
                    multiply5Nums(5, 5),
                    multiply5Nums(5, 5, 5),
                    multiply5Nums(5, 5, 5, 5)
                ];

            // Curry multiply and pass args in non-linear order
            argsToTest.forEach(function (args, index) {
                expect(partiallyAppliedResults[index]).to.be.instanceOf(Function);
                expect(partiallyAppliedResults[index].apply(null, args)).to.equal(multiplyExpectedResult);
            });

        });

    });

    describe('#curry_', function () {

        // Set curry here to use below
        let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
            addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
            divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

        it ('should be of type function.', function () {
            expect(curry_).to.be.instanceOf(Function);
        });

        it ('should throw an error when receiving anything other than a function for first param', function () {
            [99, false, true, null, undefined, [], {}].forEach(x => {
                assert.throws(() => curry_(x), Error);
            });
        });

        it ('should return a properly curried function when correct arity for said function is met.', function () {
            let min8 = curry_(Math.min, 8),
                max5 = curry_(Math.max, 5),
                pow2 = curry_(Math.pow, 2);

            // Expect functions
            [min8, max5, pow2].forEach(function (func) {
                expect(func).to.be.instanceOf(Function);
            });

            // Expect functions work correctly
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
            let min = curry2_(Math.min),
                max = curry2_(Math.max),
                pow = curry2_(Math.pow),
                min8 = curry_(Math.min, 8),
                max5 = curry_(Math.max, 5),
                pow2 = curry_(Math.pow, 2),
                isValidTangentLen = curry_((a, b, cSqrd) => pow(a, 2) + pow(b, 2) === cSqrd, 2, 2),
                random = curry_((start, end) => Math.round(Math.random() * end + start), 0),
                expectedFor = (num) => min(8, max(5, pow(2, num)));

            // Expect functions returned for `curry` calls
            expect(isValidTangentLen).to.be.instanceOf(Function);

            // Expect functions returned for `curry` calls
            [min8, max5, pow2].forEach(function (func) {
                expect(func).to.be.instanceOf(Function);
            });

            // Expect `curry`ed functions to work as expected
            expect(isValidTangentLen(8)).to.equal(true);
            expect(isValidTangentLen(21)).to.equal(false);

            // Expect `curry`ed functions to work as expected
            [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
                let composed = compose(min8, max5, pow2);
                expect(composed(num)).to.equal(expectedFor(num));
            });
        });

        it ('should enforce `Placeholder` values when currying', function () {
            let add = curry3_(addRecursive),
                multiply = curry5_(multiplyRecursive),
                multiplyExpectedResult = Math.pow(5, 5);

            // Curry add to add 3 numbers
            expect(add(__, __, __)(1, 2, 3)).to.equal(6);
            expect(add(1, __, __)(2, 3)).to.equal(6);
            expect(add(1, 2, __)(3)).to.equal(6);
            expect(add(1, 2, 3)).to.equal(6);

            // Curry multiply and pass args in non-linear order
            expect(multiply(__, __, __, __, __)(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply(__, __, 5, __, __)(5, 5, 5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply(5, __, 5, __, __)(5, 5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply(5, __, 5, __, 5)(5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply(5, __, 5, 5, 5)(5)).to.equal(multiplyExpectedResult);
            expect(multiply(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);

            expect(add(__, __, __)(1, 2, 3, 5, 6)).to.equal(17);
            expect(add(__, 1, __)(2, 3, 5, 6)).to.equal(17);
            expect(add(__, 1, 2)(3, 5, 6)).to.equal(17);
            expect(add(1, 2, 3, 5, 6)).to.equal(17);

        });

        it ('should respect argument order and placeholder order.', function () {
            // Curry divideR to divde 3 or more numbers
            expect(curry_(divideR, 25, 5)).to.be.instanceOf(Function);
            expect(curry_(divideR, __, 625, __)(3125, 5)).to.equal(1);
            expect(curry_(divideR, Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
        });

    });

    describe('#curryN_', function () {

        // Set curry here to use below
        let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
            addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
            divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

        it ('should be of type function.', function () {
            expect(curryN_).to.be.instanceOf(Function);
        });

        it ('should return a function that throws an error when no arguments are passed.', function () {
            let result = curryN_();
            expect(result).to.be.instanceOf(Function);
            assert.throws(result, Error);
        });

        it ('should enforce `Placeholder` values when currying', function () {
            let add3Nums = curryN_(3, addRecursive),
                multiply5Nums = curryN_(5, multiplyRecursive),
                multiplyExpectedResult = Math.pow(5, 5);

            // Curry add to add 3 numbers
            expect(add3Nums(__, __, __)(1, 2, 3)).to.equal(6);
            expect(add3Nums(1, __, __)(2, 3)).to.equal(6);
            expect(add3Nums(1, 2, __)(3)).to.equal(6);
            expect(add3Nums(1, 2, 3)).to.equal(6);

            // Curry multiply and pass args in non-linear order
            expect(multiply5Nums(__, __, __, __, __)(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply5Nums(__, __, 5, __, __)(5, 5, 5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply5Nums(5, __, 5, __, __)(5, 5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply5Nums(5, __, 5, __, 5)(5, 5)).to.equal(multiplyExpectedResult);
            expect(multiply5Nums(5, __, 5, 5, 5)(5)).to.equal(multiplyExpectedResult);
            expect(multiply5Nums(5, 5, 5, 5, 5)).to.equal(multiplyExpectedResult);

        });

        it ('should pass in any values passed the arity when executing the curried function', function () {
            let add3Nums = curryN_(3, addRecursive);

            // Curry add to add 3 numbers
            expect(add3Nums(__, __, __)(1, 2, 3)).to.equal(6);
            expect(add3Nums(1, __, __)(2, 3)).to.equal(6);
            expect(add3Nums(1, 2, __)(3)).to.equal(6);
            expect(add3Nums(1, 2, 3)).to.equal(6);

            // Curry `add` to add any numbers passed required arity
            expect(add3Nums(__, __, __)(1, 2, 3, 5, 6)).to.equal(17);
            expect(add3Nums(__, 1, __)(2, 3, 5, 6)).to.equal(17);
            expect(add3Nums(__, 1, 2)(3, 5, 6)).to.equal(17);
            expect(add3Nums(1, 2, 3, 5, 6)).to.equal(17);
        });

        it ('should respect the passed in "executeArity" (shouldn\'t be called to passed in arity length is reached', function () {
            let multiply5Nums = curryN_(5, multiplyRecursive),
                multiplyExpectedResult = Math.pow(5, 5),
                argsToTest = [
                    [5, 5, 5, 5, 5],
                    [5, 5, 5, 5],
                    [5, 5, 5],
                    [5, 5],
                    [5]
                ],
                partiallyAppliedResults = [
                    multiply5Nums(__, __, __, __, __),
                    multiply5Nums(__, __, 5, __, __),
                    multiply5Nums(5, __, 5, __, __),
                    multiply5Nums(5, __, 5, __, 5),
                    multiply5Nums(5, __, 5, 5, 5)
                ];

            // Curry multiply and pass args in non-linear order
            argsToTest.forEach(function (args, index) {
                expect(partiallyAppliedResults[index]).to.be.instanceOf(Function);
                expect(partiallyAppliedResults[index].apply(null, args)).to.equal(multiplyExpectedResult);
            });

        });

        it ('should respect argument order and placeholder order.', function () {
            let divideC = curryN_(3, divideR);

            // Curry divideR to divde 3 or more numbers
            expect(divideC(25, 5)).to.be.instanceOf(Function);
            expect(divideC(__, 625, __)(3125, 5)).to.equal(1);
            expect(divideC(Math.pow(3125, 2), 3125, __)(5)).to.equal(625);
        });

    });

});
