/**
 * Created by edlc on 12/11/16.
 */
/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {expect} from 'chai';
import {expectFunction, add, multiply, divide} from './../helpers';
import Functor from '../../src/functor/Functor';
import Applicable from '../../src/functor/Applicable';
import Chainable from '../../src/functor/Chainable';

let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
    expectFunctor = value => expectInstanceOf(value, Functor),
    expectApplicable = value => expectInstanceOf(value, Applicable),
    expectChainable = value => expectInstanceOf(value, Chainable),
    expectValue = (value, expectedValue) => expect(value).to.equal(expectedValue);

describe('Chainable', function () {

    it('should return an new instance when called as a function', function () {
        let result = Chainable();
        expectChainable(result);
        expectApplicable(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Chainable();
        expectChainable(result);
        expectApplicable(result);
        expectFunctor(result);
    });

    describe('Interface', function () {
        let instance = Chainable();
        ['map', 'chain'].forEach((key) => {
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
            let functor = Chainable(99),
                result = functor.map(num => num * 2);
            expectChainable(result);
            expectApplicable(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Chainable(99).map(num => num * 2);
            expectChainable(result);
            expectApplicable(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#chain', function () {
        it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
            'instance of it\'s own type', function () {
            let addReturnsChainable = value => Chainable(add(1, value)),
                instance = Chainable(99),
                result1 = instance.chain(addReturnsChainable), // nested result
                result2 = instance.chain(add(1)); // un-nested result

            // Check results
            [result1, result2].forEach(result => {
                expectChainable(result);
                expectApplicable(result);
                expectFunctor(result);
                expect(result.value).to.equal(100);
            });
        });
    });

});
