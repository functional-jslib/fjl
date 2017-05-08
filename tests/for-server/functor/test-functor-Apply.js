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
import {expectInstanceOf, expectEqual, expectFunction,
    expectTrue, hasOwnProperty, add} from '../helpers';
import Functor from '../../../src/functor/Functor';
import Apply from '../../../src/functor/Apply';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe('functor.Apply', function () {

    let expectFunctor = value => expectInstanceOf(value, Functor),
        expectApply = value => expectInstanceOf(value, Apply);

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

    describe('Interface', function () {
        let instance = Apply();
        ['map', 'ap'].forEach((key) => {
            it('should method #' + key, function () {
                expectFunction(instance[key]);
            });
        });
        it('should have a `value` property', function () {
            expectTrue(hasOwnProperty(instance, 'value'));
        });
    });

    describe('#ap', function () {
        it('should map incoming functor over it\'s value', function () {
            let instance = Apply(add(1)),
                result = instance.ap(Apply(99));
            expectFunctor(result);
            expectApply(result);
            expectEqual(result.value, 100);
        });
    });

});
