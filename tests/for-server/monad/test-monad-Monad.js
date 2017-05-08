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

describe('monad.Monad', function () {

    let expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply),
        expectApplicative = value => expectInstanceOf(value, Applicative),
        expectChain = value => expectInstanceOf(value, Chain),
        expectMonad = value => expectInstanceOf(value, Monad);

    describe('Construction', function () {

        it('should return `Monad` when called as a function and passed in value is `null` or `undefined`', function () {
            let result = Monad();
            expectMonad(result);
        });

        it('should return `Monad` when called as a function and passed in value is not `null` and not `undefined`', function () {
            let result = Monad('something');
            expectMonad(result);
        });

        it('should return `Monad` when called with new and passed in value is `null` or `undefined`', function () {
            let result = new Monad();
            expectMonad(result);
        });

        it('should return `Monad` when called with new and passed in value is not `null` and not `undefined`', function () {
            let result = new Monad('something');
            expectMonad(result);
        });

    });

});
