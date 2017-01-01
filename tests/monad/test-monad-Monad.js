/**
 * Created by edlc on 12/12/16.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import {expectEqual, expectInstanceOf, expectFunction, add, multiply} from './../helpers';
import {__} from './../../src/curry';
import compose from './../../src/compose';
import Functor from '../../src/functor/Functor';
import Apply from '../../src/functor/Apply';
import Applicative from '../../src/functor/Applicative';
import Chain from '../../src/functor/Chain';
import Monad from '../../src/monad/Monad';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let expectFunctor = value => expectInstanceOf(value, Functor),
    expectApply = value => expectInstanceOf(value, Apply),
    expectApplicative = value => expectInstanceOf(value, Applicative),
    expectChain = value => expectInstanceOf(value, Chain),
    expectMonad = value => compose(expectInstanceOf(__, Monad), expectChain, expectApplicative, expectApply, expectFunctor);

describe('monad.Monad', function () {

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

    describe('Statics', function () {
        it('should have a static `of` property that acts as unit.', function () {
            let result = Monad.of(multiply(4)).ap(Monad(25));
            expectFunction(Monad.of);
            expectMonad(Monad.of());
            expectMonad(result);
            expectEqual(result.value, 100);
        });
    });

    describe('Interface', function () {
        let instance = Monad();
        ['map', 'ap', 'chain', 'join'].forEach(key => {
            it(`should have a "${key}" method`, function () {
                expectFunction(instance[key]);
            });
        });
    });

    describe('#map', function () {

        it('should be a method on instances', function () {
            let instance = Monad();
            expectMonad(instance);
            expectFunction(instance.map);
        });

        it('should return a new instance of Functor', function () {
            let functor = Monad(99),
                result = functor.map(num => num * 2);
            expectMonad(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });

        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Monad(99).map(num => num * 2);
            expectMonad(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Monad(add(1)),
                result = instance.ap(Monad(99));
            expectMonad(result);
            expectEqual(result.value, 100);
        });
    });

    describe('#chain', function () {
        it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
            'instance of it\'s own type', function () {
            let addReturnsChain = value => Monad(add(1, value)),
                instance = Monad(99),
                result1 = instance.chain(addReturnsChain), // nested result
                result2 = instance.chain(add(1)); // un-nested result

            // Check results
            [result1, result2].forEach(result => {
                expectMonad(result);
                expectEqual(result.value, 100);
            });
        });
    });

    describe('#join', function () {
        it('should remove one level of monadic structure on it\'s own type;  ' +
            'E.g., If it\'s inner value is of the same type.', function () {
            let innerMostValue = 5,
                monad1 = Monad(innerMostValue),
                monad2 = Monad(monad1),
                monad3 = Monad(monad2),
                monad4 = Monad(),
                expectInnerValueEqual = (value, value2) => expectEqual(value, value2),
                expectations = (result, equalTo) => {
                    expectMonad(result);
                    expectInnerValueEqual(result.value, equalTo);
                };
            expectations(monad1.join(), innerMostValue);
            expectations(monad2.join(), innerMostValue);
            expectations(monad3.join(), monad1);
            expectations(monad4.join(), undefined);
        });
    });

});
