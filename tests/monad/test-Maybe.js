/**
 * Created by edlc on 12/12/16.
 */

'use strict';

import {expect} from 'chai';
import {expectInstanceOf, expectFunction, expectEqual, add, multiply, divide} from './../helpers';
import Functor from '../../src/functor/Functor';
import {Nothing, Just, Maybe} from '../../src/monad/Maybe';

let expectMonad = value => expectInstanceOf(value, Monad),
    expectJust = value => expectInstanceOf(value, Just),
    expectNothing = value => expectInstanceOf(value, Nothing);

describe('Maybe', function () {

    it('should return `Nothing` when called as a function and passed in value is `null` or `undefined`', function () {
        let result = Maybe();
        expectNothing(result);
    });

    it('should return `Just` when called as a function and passed in value is not `null` and not `undefined`', function () {
        let result = Maybe('something');
        expectJust(result);
    });

    it('should return `Nothing` when called with new and passed in value is `null` or `undefined`', function () {
        let result = new Maybe();
        expectNothing(result);
    });

    it('should return `Just` when called with new and passed in value is not `null` and not `undefined`', function () {
        let result = new Maybe('something');
        expectJust(result);
    });

});
