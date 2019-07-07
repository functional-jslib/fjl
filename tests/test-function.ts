/**
 * Created by elyde on 5/1/17.
 * @todo Upgrade tests to use test-tables where possible.
 */

import {
    apply, call, until, trampoline, toFunction
}
    from '../src/function';


import {
    add, expectEqual, expectError,
    expectFunction, falsyList,
    truthyList
} from './helpers';

describe ('#function', function () {

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
