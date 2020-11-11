import {Curry, curry, Curry1, Curry2, curry2, Curry3, curry3, curry4, Curry5, curry5, curryN, CurryOf2} from '../../packages/function';
import {alphabetArray} from '../helpers';
import {Binary, Nary, NaryOf, Unary} from "../../packages/types";

describe('#curryN', () => {
    // Some funcs to use in tests
    const recursiveBinOp = (op: Binary<number>, start: number): Binary<number> =>
            (...args: number[]): number => args.reduce((a, b) => {
                return op(a, b);
            }, start),
        multiplyRecursive = recursiveBinOp((a, b) => a * b, 1),
        addRecursive = recursiveBinOp((a, b) => a + b, 0);

    it('should be of type function.', () => {
        expect(curryN).toBeInstanceOf(Function);
    });

    it('should throw an error when not receiving any argument at param `0`.', () => {
        expect(curryN).toThrow();
    });

    it('should pass in any values passed in after the arity when executing the curried function', () => {
        const add3Nums = curryN(3, addRecursive),
            addNums: Curry5<number> = add3Nums as Curry5<number>;

        // Curry add to add 3 numbers
        expect((add3Nums() as Curry3<number>)(1, 2, 3)).toEqual(6);
        expect((add3Nums(1) as Curry2<number>)(2, 3)).toEqual(6);
        expect((add3Nums(1, 2) as Curry1<number>)(3)).toEqual(6);
        expect(add3Nums(1, 2, 3)).toEqual(6);

        // Curry `add` to add any numbers passed required arity
        expect((addNums() as Curry3<number>)(1, 2, 3, 4, 5)).toEqual(15);
        expect((addNums(1) as Curry2<number>)(2, 3, 4, 5)).toEqual(15);
        expect((addNums(1, 2) as Curry1<number>)(3, 4, 5)).toEqual(15);
        expect(addNums(1, 2, 3, 4, 5)).toEqual(15);
    });

    it('should return a function that will not execute until the passed in "executeArity" is met.', () => {
        const multiply5Nums = curryN(5, multiplyRecursive) as Curry5<number>,
            multiplyExpectedResult = Math.pow(5, 5),
            argsToTest = [
                [5, 5, 5, 5, 5],
                [5, 5, 5, 5],
                [5, 5, 5],
                [5, 5],
                [5]
            ],
            partiallyAppliedResults: Array<Curry<number>> = [
                multiply5Nums() as Curry<number>,
                multiply5Nums(5) as Curry<number>,
                multiply5Nums(5, 5) as Curry<number>,
                multiply5Nums(5, 5, 5) as Curry<number>,
                multiply5Nums(5, 5, 5, 5) as Curry<number>
            ];

        // Curry multiply and pass args in non-linear order
        argsToTest.forEach(function (args, index) {
            expect(partiallyAppliedResults[index]).toBeInstanceOf(Function);
            expect(
                (partiallyAppliedResults[index])(...args)
            ).toEqual(multiplyExpectedResult);
        });

    });

});

describe('#curry', () => {

    it('should be of type function.', () => {
        expect(curry).toBeInstanceOf(Function);
    });

    it('should return a function when receiving a function.', () => {
        expect(curry(() => undefined)).toBeInstanceOf(Function);
        expect(curry(() => {
        })).toBeInstanceOf(Function);
    });

    it('should throw an error when receiving anything other than a function (for first param)', () => {
        [99, false, true, null, undefined, [], {}].forEach(x => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            expect(() => curry(x)).toThrow();
        });
    });

    it('should return a curried function.', () => {
        const min8 = curry(Math.min, 8),
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

    it('should be able to correctly curry functions of different arity as long as their arity is met.', () => {
        const min = curry2(Math.min) as Curry2<number>,
            max = curry2(Math.max) as Curry2<number>,
            pow = curry2(Math.pow) as Curry2<number>,
            min8 = curry(Math.min, 8) as Curry1<number>,
            max5 = curry(Math.max, 5) as Curry1<number>,
            pow2 = curry(Math.pow, 2) as Curry1<number>,
            isValidTangentLen = curry((a, b, cSqrd) => <number>pow(a, 2) + <number>pow(b, 2) === cSqrd, 2, 2),
            random = curry((start, end) => Math.round(Math.random() * (end - start) + start), 0) as Curry1<number>,
            expectedFor: Unary<number> = num => <number>min(8, <number>max(5, <number>pow(2, num))),
            op: Unary<number> = x2 => [min8, max5, pow2].reduceRight((agg, f) => f(agg), x2) as number
        ;

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
        [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(x =>
            expect(op(x as number)).toEqual(expectedFor(x as number))
        );
    });

});

describe('#curry2, #curry3, #curry4, #curry5', () => {
    it('should returned a curried function which curries 2 parameters', () => {
        const
            min = curry2(Math.min),
            max = curry2(Math.max),
            onlyEvens = (...args): number[] => args.filter(x => x % 2 === 0),
            onlyEvens3 = curry3(onlyEvens),
            onlyEvens4 = curry4(onlyEvens),
            onlyEvens5 = curry5(onlyEvens),
            someNums = alphabetArray.map((_, i) => i) as number[],
            evenSomeNums = onlyEvens(...someNums) as number[]
        ;

        // Test test cases' subject data
        // ----
        // Alphabet array
        expect(alphabetArray.length).toEqual(26);

        // Test even numbers
        expect(evenSomeNums.every(x => x % 2 === 0)).toEqual(true);

        // Tests table
        //  [fn, args, expected]
        (<Array<[Curry2<number>, number[], number | number[]]>>[
            [min as Curry2<number>, [0, 1], 0],
            [max, [0, 1], 1],
            [max, [0, 1, 3, 5, 3, 1], 5],
            [min, [0, 1, 3, 2, 1], 0],
            [onlyEvens3, someNums, evenSomeNums],
            [onlyEvens4, someNums, evenSomeNums],
            [onlyEvens5, someNums, evenSomeNums]
        ])
            .forEach(([fn, args, expected]) => {
                expect(fn).toBeInstanceOf(Function);
                const
                    newArgs = args.slice(0),
                    newFn = fn(newArgs.shift()) as Nary<number>;
                expect(newFn).toBeInstanceOf(Function);
                expect(newFn(...newArgs)).toEqual(expected);
            });
    });
});
