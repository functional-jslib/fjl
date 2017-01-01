/**
 * Created by edlc on 12/12/16.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import {unwrapMonad, expectInstanceOf, expectFunction, expectEqual, add, multiply} from '../helpers';
import Monad from '../../../src/monad/Monad';
import {Maybe, Just, Nothing, maybe} from '../../../src/monad/Maybe';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('monad.Maybe', function () {

    let expectMonad = value => expectInstanceOf(value, Monad),
        expectMaybe = value => expectInstanceOf(value, Maybe) && expectMonad(value),
        expectJust = value => expectInstanceOf(value, Just),
        expectNothing = value => expectInstanceOf(value, Nothing),
        monadInterface = ['ap', 'map', 'join', 'chain'];

    describe('Construction:', function () {

        it('should contain a `Nothing` when constructed using function syntax and passed in value is `null` or `undefined`', function () {
            let result = Maybe();
            expectMaybe(result);
            result.map(expectNothing);
        });

        it('should contain a `Just` when constructed using function syntax function and passed in value is not `null` and not `undefined`', function () {
            let result = Maybe('something');
            expectMaybe(result);
            result.map(expectJust);
        });

        it('should contain a `Nothing` when constructed with new and passed in value is `null` or `undefined`', function () {
            let result = new Maybe();
            expectMaybe(result);
            result.map(expectNothing);
        });

        it('should contain a `Just` when constructed with new and passed in value is not `null` and not `undefined`', function () {
            let result = new Maybe('something');
            expectMaybe(result);
            result.map(expectJust);
        });

    });

    describe('#Nothing', function () {
        let someInstance = Nothing();

        describe('Constructor', function () {
            it('should be a singleton instance even when call `new Nothing()`', function () {
                [new Nothing(), Nothing(), Nothing()].reduce((aggInstance, instance) => {
                    expectNothing(aggInstance);
                    expectEqual(aggInstance, instance);
                    return instance;
                }, new Nothing());
            });
        });

        monadInterface.forEach(key => {
            describe('#' + key, function () {
                it(`should have a \`${key}\` method`, function () {
                    expectFunction(someInstance[key]);
                });
                it('should return a singleton instance of `Nothing`', function () {
                    let result = someInstance[key]();
                    expectNothing(result);
                    expectEqual(result, someInstance);
                });
            });
        });
    });

    describe('#Just', function () {

        describe('Constructor', function () {
            it('should return an instance when receiving any value  (when called with `new` and without `new`)', function () {
                [null, undefined, 99, 0, -1, true, false, [1, 2, 3], {}, {a: 'b'}, () => {
                }]
                    .forEach(value => {
                        expectJust(Just(value));
                        expectJust(new Just(value));
                    });
            });

            it('should return an instance of itself even when receiving no value (when called with `new` and without `new`)', function () {
                expectJust(Just());
                expectJust(new Just());
            });
        });

        describe('Statics', function () {
            it('#of (should act as unit)', function () {
                let result = Just.of(multiply(4)).ap(Just(25));
                expectFunction(Just.of);
                expectJust(Just.of());
                expectEqual(result.value, 100);
            });
        });

        describe('Interface ["' + (monadInterface.join('", "') + '"]'), function () {
            let someInstance = Just();
            monadInterface.forEach(key => {
                it(`should have a \`${key}\` method`, function () {
                    expectFunction(someInstance[key]);
                });
            });
        });

        describe('#map', function () {
            let someFn = value => value.toString();
            it('should return nothing when contained value is `null` or `undefined`', function () {
                expectNothing(Just().map(someFn));
                expectNothing(Just(null).map(someFn));
                expectNothing(Just(undefined).map(someFn));
            });
            expectJust(Just(-1).map(someFn));
            expectJust(Just(0).map(someFn));
            expectJust(Just(1).map(someFn));
            [-1, 0, 1, true, false, [1, 2, 3], {}, {a: 'b'}, () => {}]
                .forEach(function (value) {
                    it('should return an instance of `Just` when contained value is ' +
                        '`' + value.toString() + '`', function () {
                        expectJust(Just(value).map(someFn));
                    });
                });
        });

        describe('#ap', function () {
            it('should map incoming functor over it\'s value', function () {
                let instance = Just(add(1)),
                    result = instance.ap(Just(99));
                expectJust(result);
                expectEqual(result.value, 100);
            });
        });

        describe('#chain', function () {
            it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
                'instance of it\'s own type', function () {
                let addReturnsJust = value => Just(add(1, value)),
                    instance = Just(99),
                    result1 = instance.chain(addReturnsJust), // nested result
                    result2 = instance.chain(add(1)); // un-nested result

                // Check results
                [result1, result2].forEach(result => {
                    expectJust(result);
                    expectEqual(result.value, 100);
                });
            });
        });

        describe('#join', function () {
            it('should remove one level of monadic structure on it\'s own type;  ' +
                'E.g., If it\'s inner value is of the same type.', function () {
                let innerMostValue = 5,
                    monad1 = Just(innerMostValue),
                    monad2 = Just(monad1),
                    monad3 = Just(monad2),
                    monad4 = Just(),
                    expectInnerValueEqual = (value, value2) => expectEqual(value, value2),
                    expectations = (result, equalTo) => {
                        expectJust(result);
                        expectInnerValueEqual(result.value, equalTo);
                    };
                expectations(monad1.join(), innerMostValue);
                expectations(monad2.join(), innerMostValue);
                expectations(monad3.join(), monad1);
                expectations(monad4.join(), undefined);
            });
        });

    });

    describe('#maybe', function () {
        it ('should be a function', function () {
            expectFunction(maybe);
        });
        it ('should return the `left` when passed in functor maps to a functor with a value of ' +
            '`null` or `undefined` (or if it is `Nothing`) and it should return the value contained' +
            'within the passed in functor otherwise', function () {
            [[maybe(99, (value => value * 2), Nothing()), 99],
             [maybe(99, (value => value * 2), Just(100)), 200],
             [maybe(99, (value => value * 2), Just(null)), 99],
             [maybe(99, (value => value * 2), Just()), 99],
             [maybe(99, (value => value * 2), Maybe(99)), 198]
            ].forEach(tuple => {
                expectEqual(tuple[0], unwrapMonad(tuple[1]));
            });
        });
    });

});
