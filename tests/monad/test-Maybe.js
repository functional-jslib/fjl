/**
 * Created by edlc on 12/12/16.
 */

'use strict';

import {expect} from 'chai';
import compose from '../../src/compose';
import {__} from '../../src/curry';
import {expectInstanceOf, expectFunction, expectEqual, add, multiply, divide} from './../helpers';
import Monad from '../../src/monad/Monad';
import {id} from '../../src/operators';

import {Maybe, Just, Nothing} from '../../src/monad/Maybe';

let expectMonad = value => expectInstanceOf(value, Monad),
    expectMaybe = value => expectInstanceOf(value, Maybe) && expectMonad(value),
    expectJust = value => expectInstanceOf(value, Just),
    expectNothing = value => expectInstanceOf(value, Nothing),
    monadInterface = ['ap', 'map', 'join', 'chain'];

describe('Maybe', function () {

    describe('Construction:', function () {

        it('should map to `Nothing` when constructed using function syntax and passed in value is `null` or `undefined`', function () {
            let result = Maybe();
            expectMaybe(result);
            expectNothing(result.map(id));
        });

        it('should map to `Just` when constructed using function syntax function and passed in value is not `null` and not `undefined`', function () {
            let result = Maybe('something');
            expectMaybe(result);
            expectJust(result.map(id));
        });

        it('should map to `Nothing` when constructed with new and passed in value is `null` or `undefined`', function () {
            let result = new Maybe();
            expectMaybe(result);
            expectNothing(result.map(id));
        });

        it('should map to `Just` when constructed with new and passed in value is not `null` and not `undefined`', function () {
            let result = new Maybe('something');
            expectMaybe(result);
            expectJust(result.map(id));
        });

    });

    describe('#Nothing', function () {
        let someInstance = Nothing();

        describe ('Constructor', function () {
            it('should be a singleton instance even when call `new Nothing()`', function () {
                [new Nothing(), Nothing(), Nothing()].reduce((aggInstance, instance) => {
                    expectNothing(aggInstance);
                    expectEqual(aggInstance, instance);
                    return instance;
                }, new Nothing());
            });
        });

        monadInterface.forEach(key => {
            describe ('#' + key, function () {
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



});
