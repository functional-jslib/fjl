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
import {expectFunction, add} from './../helpers';
import Functor from '../../src/functor/Functor';
import Apply from '../../src/functor/Apply';
import Chain from '../../src/functor/Chain';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let expectInstanceOf = (value, Instance) => expect(value).to.be.instanceOf(Instance),
    expectFunctor = value => expectInstanceOf(value, Functor),
    expectApply = value => expectInstanceOf(value, Apply),
    expectChain = value => expectInstanceOf(value, Chain);

describe('functor.Chain', function () {

    it('should return an new instance when called as a function', function () {
        let result = Chain();
        expectChain(result);
        expectApply(result);
        expectFunctor(result);
    });

    it('should construct an instance of `Functor` when called with `new`', function () {
        let result = new Chain();
        expectChain(result);
        expectApply(result);
        expectFunctor(result);
    });

    describe('Interface', function () {
        let instance = Chain();
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
            let functor = Chain(99),
                result = functor.map(num => num * 2);
            expectChain(result);
            expectApply(result);
            expectFunctor(result);
            expect(result === functor).to.equal(false);
            expect(result.value).to.equal(99 * 2);
        });
        it('should return a new instance of Functor that contains the return value ' +
            'of passed in function\'s call', function () {
            let result = Chain(99).map(num => num * 2);
            expectChain(result);
            expectApply(result);
            expectFunctor(result);
            expect(result.value).to.equal(99 * 2);
        });
    });

    describe('#chain', function () {
        it('should map incoming function over it\'s value and flatten it result if it is nested within an ' +
            'instance of it\'s own type', function () {
            let addReturnsChain = value => Chain(add(1, value)),
                instance = Chain(99),
                result1 = instance.chain(addReturnsChain), // nested result
                result2 = instance.chain(add(1)); // un-nested result

            // Check results
            [result1, result2].forEach(result => {
                expectChain(result);
                expectApply(result);
                expectFunctor(result);
                expect(result.value).to.equal(100);
            });
        });
    });

});
