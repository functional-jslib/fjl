/**
 * Created by edlc on 12/12/16.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';

import {expect} from 'chai';
import {expectEqual, expectInstanceOf, expectFunction, add, multiply} from '../helpers';
import compose from '../../../src/compose';
import __ from '../../../src/curry';
import Functor from '../../../src/functor/Functor';
import Apply from '../../../src/functor/Apply';
import Applicative from '../../../src/functor/Applicative';
import Chain from '../../../src/functor/Chain';
import Monad from '../../../src/monad/Monad';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

import IO from '../../../src/monad/IO';

describe('monad.IO', function () {

    let expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply),
        expectApplicative = value => expectInstanceOf(value, Applicative),
        expectChain = value => expectInstanceOf(value, Chain),
        expectMonad = value => expectInstanceOf(value, Monad),
        expectIO = value => expectInstanceOf(value, IO);

    describe('Construction', function () {

        it('should return `IO` when called as a function and passed in value is `null` or `undefined`', function () {
            let result = IO();
            expectMonad(result);
            expectIO(result);
        });

        it('should return `IO` when called as a function and passed in value is not `null` and not `undefined`', function () {
            let result = IO('something');
            expectIO(result);
            expectMonad(result);
        });

        it('should return `IO` when called with new and passed in value is `null` or `undefined`', function () {
            let result = new IO();
            expectIO(result);
            expectMonad(result);
        });

        it('should return `IO` when called with new and passed in value is not `null` and not `undefined`', function () {
            let result = new IO('something');
            expectIO(result);
            expectMonad(result);
        });

    });

    describe ('#map', function () {
        const times2 = x => x * 2,
            io99 = new IO(99),
            io2 = IO(function () { return 1 + 1; }),
            io8 = io2.map(times2).map(times2),
            subjectsAndValues = [[io99, 99], [io2, 2], [io8, 8]];
        it ('should contain a function as it\'s internal value when interacting with it via `map`', function () {
            subjectsAndValues.forEach(tuple => {
                tuple[0].map(expectFunction);
            });
        });
        it ('should return an instanceof IO', function () {
            subjectsAndValues.forEach(tuple => {
                expectIO(tuple[0].map(x => x));
            });
        });
        it ('should contain a function that returns the expected value', function () {
            subjectsAndValues.forEach(tuple => {
                tuple[0].map(expectEqual(tuple[1]));
            });
        });
    });

    describe ('monad.IO.of', function () {
        it ('should return an `IO` with any non-function values wrapped in a function', function () {
            let io = IO.of(99);
            expectFunction(io.value);
            expectEqual(io.value(), 99);
        });
        it ('should return an `IO` containing the function passed in if the value passed in is a function', function () {
            const action = function () { return 'two plus two'; },
                io = IO.of(action);
            io.map(expectEqual(action));
            expectEqual(action, io.value);
            io.map(str => {
                expectEqual(str, action());
                console.log(str);
            });
        });
    });

});
