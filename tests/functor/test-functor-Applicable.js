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
import {expectFunction, add, multiply, divide} from './../helpers';
import Functor from '../../src/functor/Functor';
import Apply from '../../src/functor/Apply';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
    expectFunctor = value => expectInstanceOf(value, Functor),
    expectApply = value => expectInstanceOf(value, Apply);

describe('functor.Apply', function () {

    it('should return an new instance when called as a function', function () {
        let result = Apply();
        expectApply(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Apply();
        expectApply(result);
        expectFunctor(result);
    });

    describe ('Statics', function () {

    });


    describe('Interface', function () {
        let instance = Apply();
        ['map', 'ap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a non-enumerated `value` property', function () {
            let propsDesc = Object.getOwnPropertyDescriptor(instance, 'value');
            expect(Object.keys(instance).length).to.equal(0);
            expect(propsDesc.enumerable).to.equal(false);
        });
    });

    describe('#map', function () {
        it('should return a new instance of Functor', function () {
            let functor = Apply(99),
                result = functor.map(num => num * 2);
            expectApply(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Apply(99).map(num => num * 2);
            expectApply(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Apply(add(1)),
                result = instance.ap(Apply(99));
            expectFunctor(result);
            expectApply(result);
            expect(result.value).to.equal(100);
        });
    });

});
