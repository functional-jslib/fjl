/**
 * Created by elyde on 12/11/2016.
 */
/**
 * Created by edlc on 12/11/16.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {expect} from 'chai';
import {expectFunction, add, multiply, divide} from '../helpers';
import Functor from '../../../src/functor/Functor';
import Bifunctor from '../../../src/functor/Bifunctor';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('functor.Bifunctor', function () {

    let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
        expectFunctor = value => expectInstanceOf(value, Functor),
        expectBifunctor = value => expectInstanceOf(value, Bifunctor);

    it('should return an new instance when called as a function', function () {
        let result = Bifunctor();
        expectBifunctor(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Bifunctor();
        expectBifunctor(result);
        expectFunctor(result);
    });

    describe('Interface', function () {
        let instance = Bifunctor();
        ['map', 'bimap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` and `value2` properties', function () {
            let propDesc1 = Object.getOwnPropertyDescriptor(instance, 'value'),
                propDesc2 = Object.getOwnPropertyDescriptor(instance, 'value2');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propDesc1.enumerable).to.equal(false);
            expect(propDesc2.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Bifunctor(99),
                result = functor.map(num => num * 2);
            expectBifunctor(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Bifunctor(99).map(num => num * 2);
            expectBifunctor(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#bimap', function () {
        let functor = Bifunctor(21, 34),
            times2 = num => num * 2,
            result = functor.bimap(times2, times2);
        it('should return a new instance of Functor', function () {
            expectBifunctor(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            expectBifunctor(result);
            expectFunctor(result);
            expect(result.value).to.equal(21 * 2);
            expect(result.value2).to.equal(34 * 2);
        });
    });

});
