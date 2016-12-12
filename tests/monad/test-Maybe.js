/**
 * Created by edlc on 12/12/16.
 */

'use strict';

import {expect} from 'chai';
import {expectFunction, add, multiply, divide} from './../helpers';
import Functor from '../../src/functor/Functor';
import {Maybe, Just, Nothing} from '../../src/monad/Maybe';

let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
    expectFunctor = value => expectInstanceOf(value, Functor),
    expectJust = value => expectInstanceOf(value, Just),
    expectNothing = value => expectInstanceOf(value, Nothing),
    expectValue = (value, expectedValue) => expect(value).to.equal(expectedValue);

describe('Maybe', function () {

    it('should return `Nothing` when called as a function and passed in value is `null` or `undefined`', function () {
        let result = Maybe();
        expectNothing(result);
        expectFunctor(result);
    });

    it('should return `Just` when called as a function and passed in value is not `null` and not `undefined`', function () {
        let result = Maybe('something');
        expectJust(result);
        expectFunctor(result);
    });

    it('should return `Nothing` when called with new and passed in value is `null` or `undefined`', function () {
        let result = new Maybe();
        expectNothing(result);
        expectFunctor(result);
    });

    it('should return `Just` when called with new and passed in value is not `null` and not `undefined`', function () {
        let result = new Maybe('something');
        expectJust(result);
        expectFunctor(result);
    });

    describe('Statics', function () {
        it('should have a static `of` property that acts as unit.', function () {
            // let result = Maybe.of(multiply(4)).ap(Maybe(25));
            // expectFunction(Maybe.of);
            // expectMaybe(Maybe.of());
            // expectApplicable(result);
            // expectValue(result.value, 100);
        });
    });


});
