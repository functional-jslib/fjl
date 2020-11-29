import {add} from "../utils/test-utils";
import {apply} from './apply';
import {call} from "../platform/function";
import {compose} from "./compose";
import {Binary, Nary, Unary, UnaryPred} from "../types";
import {curry, Curry, Curry1, curry2, Curry2, curry3, Curry3, curry4, curry5, Curry5, curryN} from "./curry";
import {
    alphabetArray,
    expectEqual,
    expectError,
    expectFunction,
    falsyList,
    subtract,
    truthyList
} from "../tests/helpers";
import {flip, flip3, flip4, flip5, flipN} from "./flip";
import {fnOrError} from "./fnOrError";
import {id} from "./id";
import {negateF, negateF2, negateF3, negateFN} from "./negate";
import {noop} from "./noop";
import {toFunction} from "./toFunction";
import {trampoline} from "./trampoline";
import {until} from "./until";

describe('#apply', () => {
    it('apply instanceof Function', function () {
        expect(apply).toBeInstanceOf(Function);
    });
    it('Can do `apply(fn)(args)` (is curried)', function () {
        const addAllInArray = apply(add);
        expect(addAllInArray).toBeInstanceOf(Function);
        expect(addAllInArray([1, 2, 3, 4, 5])).toEqual(15);
    });
    it('should call a function passed into it with args list passed in as second parameter', function () {
        expect(apply(add)([1, 2, 3, 4, 5])).toEqual(15);
    });
    it('should fail when argument `1` is not a function', () => {
        expect(() => apply(null, null)).toThrow(Error);
        expect(() => apply(undefined, undefined)).toThrow(Error);
    });
});

describe('#call', () => {
    it('should be a function', () => {
        expect(call).toBeInstanceOf(Function);
    });
    it('should be curried', () => {
        const adder = call(add);
        expect(adder()).toBeInstanceOf(Function);
        expect(adder(1, 2, 3, 4, 5)).toEqual(15);
    });
    it('should call a function passed into it along with passed in arguments', () => {
        expect(call(add, 1, 2, 3, 4, 5)).toEqual(15);
    });
    it('should fail when argument `1` is not a function', () => {
        expect(() => call(null, null)).toThrow(Error);
        expect(() => call(undefined, undefined)).toThrow(Error);
    });
});

describe('#compose', () => {
    it('should be of type function.', () => {
        expect(compose).toBeInstanceOf(Function);
    });

    it('should return a function whether or not any parameters were passed in.', () => {
        expect(compose()).toBeInstanceOf(Function);
        expect(compose(console.log)).toBeInstanceOf(Function);
    });

    it('should return a function that when used returns the passed in value if `compose` ' +
        'itself didn\'t receive any parameters.', () => {
        const result = compose() as <T>(x: T) => T;
        expect(result(99)).toEqual(99);
    });

    it('should be able to compose an arbitrary number of functions and execute them as expected.', () => {
        const min = a => (b): number => Math.min(a, b),
            max = a => (b): number => Math.max(a, b),
            pow = a => (b): number => Math.pow(a, b),
            composed = compose<number, number>(min(8), max(5), pow(2)),
            randomNum = start => (end: number): number => Math.round(Math.random() * end + start),
            random = randomNum(0),
            expectedFor = (num): number => min(8)(max(5)(pow(num)(2)));
        [8, 5, 3, 2, 1, 0, random(89), random(55), random(34)].forEach(num => {
            expect(composed(num)).toEqual(expectedFor(num));
        });
    });

});

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

describe('#flip', () => {
    it('should be a function', function () {
        expectFunction(flip);
    });
    it('should return a function', function () {
        // @ts-ignore
        expectFunction(flip());
        expectFunction(flip(subtract));
    });
    it('should return a function which executes its params in reverse.', function () {
        const subtractor = flip(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(2, 1), subtractor(1, 2));
        expectEqual(subtract(1, 2), subtractor(2, 1));
    });
});

describe('#flipN', () => {
    it('should be a function', function () {
        expectFunction(flipN);
    });
    it('should return a function', function () {
        // @ts-ignore
        expectFunction(flipN());
        expectFunction(flipN(subtract));
    });
    it('should return a function which executes its params in reverse.', function () {
        const subtractor = flipN(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
        expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
    });
});

describe('#flip3', () => {
    it('should be a function', function () {
        expectFunction(flip3);
    });
    it('should return a function', function () {
        // @ts-ignore
        expectFunction(flip3());
        expectFunction(flip3(subtract));
    });
    it('should return a function which executes its params in reverse.', function () {
        const subtractor = flip3(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(3, 2, 1), subtractor(1, 2, 3));
        expectEqual(subtract(1, 2, 3), subtractor(3, 2, 1));
    });
});

describe('#flip4', () => {
    it('should be a function', function () {
        expectFunction(flip4);
    });
    it('should return a function', function () {
        // @ts-ignore
        expectFunction(flip4());
        expectFunction(flip4(subtract));
    });
    it('should return a function which executes its params in reverse.', function () {
        const subtractor = flip4(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(4, 3, 2, 1), subtractor(1, 2, 3, 4));
        expectEqual(subtract(1, 2, 3, 4), subtractor(4, 3, 2, 1));
    });
});

describe('#flip5', () => {
    it('should be a function', function () {
        expectFunction(flip5);
    });
    it('should return a function', function () {
        // @ts-ignore
        expectFunction(flip5());
        expectFunction(flip5(subtract));
    });
    it('should return a function which executes its params in reverse.', function () {
        const subtractor = flip5(subtract);
        expectFunction(subtractor);
        expectEqual(subtract(5, 4, 3, 2, 1), subtractor(1, 2, 3, 4, 5));
        expectEqual(subtract(1, 2, 3, 4, 5), subtractor(5, 4, 3, 2, 1));
    });
});

describe('#fnOrError', () => {
    it('should be a function', () => {
        expect(fnOrError).toBeInstanceOf(Function);
    });
    it('should have an arity of 2', () => {
        expect(fnOrError.length).toEqual(2);
    });
    it('should throw an error when not receiving a function', () => {
        falsyList.forEach(f => {
            expect(() => fnOrError('f', f)).toThrow();
        });
    });
    it('should not throw an error when receiving a function', () => {
        const result = fnOrError('fnOrError', fnOrError);
        expect(result).toBeInstanceOf(Function);
    });
});

describe('#id', () => {
    it('should be a function', function () {
        expect(id).toBeInstanceOf(Function);
    });
    it('should have arity of `1`', () => {
        expect(id.length).toEqual(1);
    });
    it('should return whatever you give it', function () {
        expect(id(1)).toEqual(1);
        expect(id(undefined)).toEqual(undefined);
    });
});

describe('#negateF', () => {
    it('should negate predicate handed to it at an arity of `1`', () => {
        (<Array<[UnaryPred<any>, any, boolean]>>[
            [x => x > 1, 1, true],      // negated
            [x => x === 1, 1, false],   // ""
            [x => x < 1, 1, true]       // ""
        ])
            .forEach(([fn, arg, expected]) => {
                const negated = negateF(fn);
                expect(negated(arg)).toEqual(expected);
            });
    });
});

describe('#negateF2', () => {
    it('should negate predicates handed to it with an arity of `2`', () => {
        (<Array<[UnaryPred<any>, [number, number], boolean]>>[
            [(a, b) => a > b, [1, 2], true],    // negated
            [(a, b) => a === b, [1, 2], true],  // negated
            [(a, b) => a < b, [1, 2], false],   // negated
        ])
            .forEach(([fn, [a, b], expected]) => {
                const negated = negateF2(fn);
                expect(negated(a, b)).toEqual(expected);
            });
    });
});

describe('#negateF3', () => {
    it('should negate predicates handed to it with an arity of `3`', () => {
        (<Array<[UnaryPred<any>, [number, number, number], boolean]>>[
            [(a, b, c) => a > b && c === 0, [1, 2, 1], true],      // negated
            [(a, b, c) => a === b && c === 0, [1, 2, 1], true],    // negated
            [(a, b, c) => a < b && c === 0, [1, 2, 1], true],      // negated
        ])
            .forEach(([fn, [a, b, c], expected]) => {
                const negated = negateF3(fn);
                expect(negated(a, b, c)).toEqual(expected);
            });
    });
});

describe('#negateFN', () => {
    (<Array<[UnaryPred<any>, [number, number, number], boolean]>>[
        [x => x > 1, [1, 0, 0], true],                      // negated
        [(a, b) => a === b, [1, 2, 1], true],               // negated
        [(a, b, c) => a < b && c === 0, [1, 2, 1], true],   // negated
    ])
        .forEach(([fn, [a, b, c], expected]) => {
            const fnLen = fn.length,
                negated = negateFN(fn);
            it(`should negate predicates handed to it with an arity of ${fnLen}`, () => {
                expect(negated(a, b, c)).toEqual(expected);
            });
            it('should return a variadic function', () => {
                expect(negated.length).toEqual(0);
            });
        });
});

describe('#noop', function () {
    it('should be a function', () => {
        expect(noop).toBeInstanceOf(Function);
    });
    it('should have no arity', () => {
        expect(noop.length).toEqual(0);
    });
    it('should return `undefined`', () => {
        expect(noop()).toEqual(undefined);
    });
});

describe('#toFunction', () => {
    truthyList.concat(falsyList).forEach(x => {
        const f = toFunction(x);
        it(`should return a function when given ${x}`, () => {
            expect(f).toBeInstanceOf(Function);
        });
        if (!(x instanceof Function)) {
            it('should return given value when value is not a function', () => {
                expect(f()).toEqual(x);
            });
        }
    });
});

describe('#trampoline', () => {
    it('should be able to trampoline a function no matter how many recursive calls are made', () => {
        const factorialThunk = (agg, n) => n <= 1 ?
            agg : () => factorialThunk(agg * n, n - 1),
            trampolined = trampoline(factorialThunk)
            // trampolinedUntil = until(x => typeof x !== 'function', fn => fn())
        ;
        [
            [0, 1],
            [1, 1],
            [2, 2],
            [3, 6],
            [4, 24],
            [5, 120],
            [6, 720],
            [7, 7 * 720],
            [8, 8 * 7 * 720],
            [9, 9 * 8 * 7 * 720],
            [10, 10 * 9 * 8 * 7 * 720],
            [32768, Infinity], // normally breaks the stack (not with trampoline)
        ]
            .forEach(([arg, expected]) => {
                expect(trampolined(1, arg)).toEqual(expected);
                // expect(trampolinedUntil(factorialThunk(1, arg))).toEqual(expected);
            });
    });
});

describe('#until', function () {
    it('should be a function', function () {
        expectFunction(until);
    });

    it('should run while predicate returns `false`', function () {
        const result = until(x => x >= 100, x => {
            return x + x;
        }, 1);
        expectEqual(result, 128);
        // log('Result:', result);
    });

    it('should throw an error when no predicate is passed in', function () {
        expectError(
            () => until(null, x => {
                return x + x;
            }, 1)
        );
    });

    it('should throw an error when no operation is passed in', function () {
        expectError(
            () => until(x => x >= 100, null, 1)
        );
    });
});
