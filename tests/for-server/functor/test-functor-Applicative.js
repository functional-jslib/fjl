/**
 * Created by edlc on 12/11/16.
 */
/**
 * Created by elyde on 12/10/2016.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import {expectFunction, add, multiply, divide} from '../helpers';
import Functor from '../../../src/functor/Functor';
import Apply from '../../../src/functor/Apply';
import Applicative from '../../../src/functor/Applicative';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('functor.Applicative', function () {

    let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
        expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply),
        expectApplicative = value => expectInstanceOf(value, Applicative),
        expectValue = (value, expectedValue) => expect(value).to.equal(expectedValue);

    it('should return an new instance when called as a function', function () {
        let result = Applicative();
        expectApplicative(result);
        expectApply(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Applicative();
        expectApplicative(result);
        expectApply(result);
        expectFunctor(result);
    });

    describe('Statics', function () {
        it('should have a static `of` property that acts as unit.', function () {
            let result = Applicative.of(multiply(4)).ap(Applicative(25));
            expectFunction(Applicative.of);
            expectApplicative(Applicative.of());
            expectApply(result);
            expectValue(result.value, 100);
        });
    });

});
