
// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {compose} from '../src/uncurried/functionOps/compose_';
import {curry, curry2, curryN} from '../src/uncurried/functionOps/curry_';
import {log, add, subtract, length, expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('#functionOps.curry', function () {

    it ('should be of type functionOps.', function () {
        expectFunction(curry);
    });

    it ('should return a functionOps when called with or without args.', function () {
        expectFunction(curry());
        expectFunction(curry(99));
        expectFunction(curry(() => {}));
        expectFunction(curry(console.log));
    });

    it ('should return a functionOps that fails when no functionOps is passed in (as it\'s first param).', function () {
        assert.throws(curry(), Error);
        assert.throws(curry(99), Error);
    });

    it ('should return a curried functionOps.', function () {
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
            min8 = min(8),
            max5 = max(5),
            pow2 = x => pow(x, 2),
            isValidTangentLen =
                curry((a, b, cSqrd) => pow2(a) + pow2(b) === cSqrd, 2, 2),
            randomUpTo = curry((start, end) => Math.round(Math.random() * end + start), 0),
            expectedFor = num => min8(max5(pow2(num)));

        // Expect functions returned for `curry` calls
        expectFunction(isValidTangentLen);

        // Expect functions returned for `curry` calls
        [min8, max5, pow2].forEach(func => expectFunction(func));

        // Expect `curry`ed functions to work as expected
        expect(isValidTangentLen(8)).to.equal(true);
        expect(isValidTangentLen(21)).to.equal(false);

        // Expect `curry`ed functions to work as expected
        [8,5,3,2,1,0, randomUpTo(89), randomUpTo(55), randomUpTo(34)].forEach(num => {
            let composed = compose(min8, max5, pow2);
            expect(composed(num)).to.equal(expectedFor(num));
        });

        let add3Items = (a, b, c) => a + b + c,
            curriedAdd3Items = curry(add3Items);
    });

});

describe('#functionOps.curryN', function () {

    // Set curry here to use below
    let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
        addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
        divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

    it ('should be of type functionOps.', function () {
        expect(curryN).to.be.instanceOf(Function);
    });

    it ('should return a functionOps that throws an error when no arguments are passed.', function () {
        let result = curryN();
        expect(result).to.be.instanceOf(Function);
        assert.throws(result, Error);
    });

    it ('should pass in any values passed the arity when executing the curried functionOps', function () {
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
