/**
 * Created by elyde on 12/10/2016.
 */
'use strict';
import {expect} from 'chai';
import {expectFunction} from './../helpers';
import Functor from './../../src/functors/Functor';
let expectFunctor = value => expect(value).to.be.instanceOf(Functor);

describe ('Functor', function () {
    it ('should return an new instance when called as a function', function () {
        expectFunctor(Functor());
    });
    it ('should construct an instance of `Functor` when called with `new`', function () {
        expectFunctor(new Functor());
    });
    describe('#map', function () {
        it ('should be a method on instances', function () {
            let instance = Functor();
            expectFunctor(instance);
            expectFunction(instance.map);
        });
        it ('should return a new instance of Functor', function () {
            let functor = Functor(99),
                result = functor.map(num => num * 2);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it ('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Functor(99).map(num => num * 2);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });
});
