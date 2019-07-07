import {trampoline} from '../../src/function/trampoline';

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
