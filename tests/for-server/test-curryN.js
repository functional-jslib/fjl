/**
 * Created by elyde on 11/25/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import compose from '../../src/functionOps/compose';
import {curryN, __} from '../../src/functionOps/curry';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('curryN', function () {

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
        let add3Nums = curryN(addRecursive, 3);

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
        let multiply5Nums = curryN(multiplyRecursive, 5),
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
