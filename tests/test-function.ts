/**
 * Created by elyde on 5/1/17.
 * @todo Upgrade tests to use test-tables where possible.
 */

import {
    apply, call,
    flip, flip3, flip4, flip5, flipN, until, id,
    trampoline, noop, toFunction
}
    from '../src/function';


import {
    add, subtract, expectEqual, expectError,
    expectFunction, falsyList,
    truthyList
} from './helpers';

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

    describe('#noop', function () {
        it ('should return `undefined`', () => {
            expect(noop()).toEqual(undefined);
        });
    });

    describe('#trampoline', () => {
        it ('should be able to trampoline a function no matter how many recursive calls are made', () => {
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

    describe('#toFunction', () => {
        it('should always return a function', () => {
           falsyList.map(x => (<Array<any>>[x, Function]))
               .concat(truthyList.map(x => [x, Function]))
               .forEach(([arg, expectedType]) => {
                   expect(toFunction(arg)).toBeInstanceOf(expectedType);
               });
           expect(toFunction()).toBeInstanceOf(Function);
        });
    });
});

/*
trampoline (function, loopBreaker)
 */
