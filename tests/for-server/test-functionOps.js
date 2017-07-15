/**
 * Created by u067265 on 5/1/17.
 */

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
'use strict';
import {assert, expect} from 'chai';
import {call, apply} from '../../src/functionOps';
import {add, length, expectFalse, expectTrue, expectEqual, expectFunction} from './helpers';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

describe ('Function Operators', function () {

    // @todo implement more extensive tests later
    describe ('#call', function () {
        it ('should be a function', function () {
            expectFunction(call);
        });
        it ('should call a function passed into it', function () {
            expectEqual(call(add, 1, 2, 3, 4, 5), 15);
        });
        it ('should take context into account', function () {
            const sideEffectsOp = () => {
                this.hello = 'ola';
                return this;
            };
            expectEqual(call(sideEffectsOp, {}).hello, 'ola');
        });
    });

    // @todo implement more extensive tests later
    describe ('#apply', function () {
        it ('should be a function', function () {
            expectFunction(apply);
        });
        it ('should call a function passed into it with args array passed in as third parameter', function () {
            expectEqual(apply(add, [1, 2, 3, 4, 5]), 15);
        });
        it ('should take context into account', function () {
            const sideEffectsOp = () => {
                this.hello = 'ola';
                return this;
            };
            expectEqual(apply(sideEffectsOp, {}).hello, 'ola');
        });
    });
});
