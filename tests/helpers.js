/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
import {curry2} from './../src/curry';
import {Monad} from './../src/monad/Monad';
import {expect} from 'chai';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

export let  expectInstanceOf = curry2((value, instance) => expect(value).to.be.instanceOf(instance)),

    expectFunction = value => expectInstanceOf(value, Function),

    expectEqual = curry2((value, value2) => expect(value).to.be.equal(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

    add = curry2((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    multiply = curry2((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    }),

    divide = curry2((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    }),
    unwrapMonad = monad => {
        var value = monad;
        while (value instanceof Monad) {
            value = join(monad);
        }
        return value;
    };

export default {
    expectFunction,
    expectInstanceOf,
    expectEqual,
    expectFalse,
    expectTrue,
    unwrapMonad,
    add,
    multiply,
    divide
};
