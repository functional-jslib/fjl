/**
 * Created by elyde on 5/1/17.
 * @todo Upgrade tests to use test-tables where possible.
 */

import {
    apply, call, compose,
    curry, curry2, curry3, curry4, curry5, curryN,
    flip, flip3, flip4, flip5, flipN, until, id,
    noop
}
from '../src/function';

import {add, subtract, expectEqual, expectError,
    expectFunction, expectTrue, alphabetArray} from './helpers';

describe ('#function', function () {

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
        it ('should fail when argument `1` is not a function', () => {
            expect(() => call(99, null)).toThrow(Error);
            expect(() => call(undefined, undefined)).toThrow(Error);
        });
    });

    describe ('#apply', function () {
        it ('should be a function', function () {
            expectFunction(apply);
        });
        it ('should be curried', function () {
            const addAllInArray = apply(add);
            expectFunction (addAllInArray);
            expectEqual(addAllInArray([1, 2, 3, 4, 5]), 15);
        });
        it ('should call a function passed into it with args list passed in as second parameter', function () {
            expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
        });
        it ('should fail when argument `1` is not a function', () => {
            expect(() => apply(99, null)).toThrow(Error);
            expect(() => apply(undefined, undefined)).toThrow(Error);
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
            expectError(
                () => until(null, x => { return x + x; }, 1)
            );
        });

        it ('should throw an error when no operation is passed in', function () {
            expectError(
                () => until(x => x >= 100, null, 1)
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
            expect(compose).toBeInstanceOf(Function);
        });

        it ('should return a function whether or not any parameters were passed in to it.', function () {
            expect(compose()).toBeInstanceOf(Function);
            expect(compose(console.log)).toBeInstanceOf(Function);
        });

        it ('should return a function that when used returns the passed in value if `compose` ' +
            'itself didn\'t receive any parameters.', function () {
            let result = compose();
            expect(result(99)).toEqual(99);
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
                expect(composed(num)).toEqual(expectedFor(num));
            });
        });

    });

    describe('#curryN', function () {

        // Set curry here to use below
        let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
            addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0),
            divideR = (...args) => args.reduce((agg, num) => agg / num, args.shift());

        it ('should be of type function.', function () {
            expect(curryN).toBeInstanceOf(Function);
        });

        it ('should throw an error when not receiving an argument at param `0`.', function () {
            expectError(curryN);
        });

        it ('should pass in any values passed in after the arity when executing the curried function', function () {
            let add3Nums = curryN(3, addRecursive);

            // Curry add to add 3 numbers
            expect(add3Nums()(1, 2, 3)) .toEqual(6);
            expect(add3Nums(1)(2, 3))   .toEqual(6);
            expect(add3Nums(1, 2)(3))  .toEqual(6);
            expect(add3Nums(1, 2, 3))   .toEqual(6);

            // Curry `add` to add any numbers passed required arity
            expect(add3Nums()(1, 2, 3, 5, 6))   .toEqual(17);
            expect(add3Nums(1)(2, 3, 5, 6))     .toEqual(17);
            expect(add3Nums(1, 2)(3, 5, 6))     .toEqual(17);
            expect(add3Nums(1, 2, 3, 5, 6))     .toEqual(17);
        });

        it ('should return a function that will not execute until the passed in "executeArity" is met.', function () {
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
                expect(partiallyAppliedResults[index]).toBeInstanceOf(Function);
                expect(partiallyAppliedResults[index].apply(null, args)).toEqual(multiplyExpectedResult);
            });

        });

    });

    describe('#curry', function () {

        it ('should be of type function.', function () {
            expectFunction(curry);
        });

        it ('should return a function when receiving a function.', function () {
            expectFunction(curry(() => undefined));
            expectFunction(curry(function () {}));
        });

        it ('should throw an error when receiving anything other than a function (for first param)', function () {
            [99, false, true, null, undefined, [], {}].forEach(x => {
                expectError(() => curry(x));
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
            expect(min8(9)).toEqual(8);
            expect(min8(8)).toEqual(8);
            expect(min8(7)).toEqual(7);
            expect(max5(6)).toEqual(6);
            expect(max5(5)).toEqual(5);
            expect(max5(4)).toEqual(5);
            expect(pow2(2)).toEqual(4);
            expect(pow2(3)).toEqual(8);
            expect(pow2(4)).toEqual(16);
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
            expect(isValidTangentLen(8)).toEqual(true);
            expect(isValidTangentLen(21)).toEqual(false);

            // Expect `curry`ed functions to work as expected
            [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
                let composed = compose(min8, max5, pow2);
                expect(composed(num)).toEqual(expectedFor(num));
            });

            let add3Items = (a, b, c) => a + b + c,
                curriedAdd3Items = curry(add3Items);
        });

    });

    describe('#curry2, #curry3, #curry4, #curry5', () => {
        it ('should returned a curried function which curries 2 parameters', () => {
            const
                min = curry2(Math.min),
                max = curry2(Math.max),
                onlyEvens = (...args) => args.filter(x => x % 2 === 0),
                onlyEvens3 = curry3(onlyEvens),
                onlyEvens4 = curry4(onlyEvens),
                onlyEvens5 = curry5(onlyEvens),
                someNums = alphabetArray.map((_, i) => i),
                evenSomeNums = onlyEvens(...someNums)
                ;

            // Test test cases' subject data
            // ----
            // Alphabet array
            expectEqual(alphabetArray.length, 26);

            // Test even numbers
            expectTrue(evenSomeNums.every(x => x % 2 === 0));

            // Tests table
            //  [fn, args, expected, expectedArityAfterFirstFnParam]
            [
                [min, [0, 1], 0, 1],
                [max, [0, 1], 1, 1],
                [max, [0, 1, 3, 5, 3, 1], 5, 1],
                [min, [0, 1, 3, 2, 1], 0, 1],
                [onlyEvens3, someNums, evenSomeNums, 2],
                [onlyEvens4, someNums, evenSomeNums, 3],
                [onlyEvens5, someNums, evenSomeNums, 4]
            ]
                .forEach(([fn, args, expected, expectedArityAfterFirstParam]) => {
                    expectFunction(fn);
                    const
                        newArgs = args.slice(0),
                        newFn = fn(newArgs.shift());
                    expectFunction(newFn);
                    expectEqual(newFn.length, expectedArityAfterFirstParam);
                    expectEqual(newFn(...newArgs), expected);
                });
        });
    });

    describe('#noop', function () {
        it ('should return `undefined` always', () => {
            [null, false, undefined, 0, {}, [], () => undefined].forEach(x => {
                expect(noop(x)).toEqual(undefined);
            });
        });
    });

});
