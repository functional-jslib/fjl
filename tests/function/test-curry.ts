import {curry, curry2, curry3, curry4, curry5, curryN} from '../../src/function/curry';
import {alphabetArray} from '../helpers';

describe('#curryN', () => {

    // Set curry here to use below
    let multiplyRecursive = (...args) => args.reduce((agg, num) => num * agg, 1),
        addRecursive = (...args) => args.reduce((agg, num) => num + agg, 0);

    it ('should be of type function.', () => {
        expect(curryN).toBeInstanceOf(Function);
    });

    it ('should throw an error when not receiving an argument at param `0`.', () => {
        expect(curryN).toThrow();
    });

    it ('should pass in any values passed in after the arity when executing the curried function', () => {
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

    it ('should return a function that will not execute until the passed in "executeArity" is met.', () => {
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

describe('#curry', () => {

    it ('should be of type function.', () => {
        expect(curry).toBeInstanceOf(Function);
    });

    it ('should return a function when receiving a function.', () => {
        expect(curry(() => undefined)).toBeInstanceOf(Function);
        expect(curry(() => {})).toBeInstanceOf(Function);
    });

    it ('should throw an error when receiving anything other than a function (for first param)', () => {
        [99, false, true, null, undefined, [], {}].forEach(x => {
            expect(() => curry(x)).toThrow();
        });
    });

    it ('should return a curried function.', () => {
        let min8 = curry(Math.min, 8),
            max5 = curry(Math.max, 5),
            pow2 = curry(Math.pow, 2);

        // Expect functions
        [min8, max5, pow2].forEach(func =>
            expect(func).toBeInstanceOf(Function)
        );

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

    it ('should be able to correctly curry functions of different arity as long as their arity is met.', () => {
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
        expect(isValidTangentLen).toBeInstanceOf(Function);

        // Expect functions returned for `curry` calls
        [min8, max5, pow2].forEach(func => {
            expect(func).toBeInstanceOf(Function);
        });

        // Expect `curry`ed functions to work as expected
        expect(isValidTangentLen(8)).toEqual(true);
        expect(isValidTangentLen(21)).toEqual(false);

        // Expect `curry`ed functions to work as expected
        [8,5,3,2,1,0, random(89), random(55), random(34)].forEach(function (num) {
            let composed = x => [min8, max5, pow2].reduceRight((agg, f) => f(agg), x);
            expect(composed(num)).toEqual(expectedFor(num));
        });
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
        expect(alphabetArray.length).toEqual(26);

        // Test even numbers
        expect(evenSomeNums.every(x => x % 2 === 0)).toEqual(true);

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
                expect(fn).toBeInstanceOf(Function);
                const
                    newArgs = args.slice(0),
                    newFn = fn(newArgs.shift());
                expect(newFn).toBeInstanceOf(Function);
                expect(newFn.length).toEqual(expectedArityAfterFirstParam);
                expect(newFn(...newArgs)).toEqual(expected);
            });
    });
});
