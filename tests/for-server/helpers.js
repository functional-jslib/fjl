/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
import {curry2_} from '../../src/function/curry';
import {expect} from 'chai';
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

export let  expectInstanceOf = curry2_((value, instance) => expect(value).to.be.instanceOf(instance)),

    expectFunction = value => expectInstanceOf(value, Function),

    expectEqual = curry2_((value, value2) => expect(value).to.be.equal(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

    length = something => something.length,

    add = curry2_((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    multiply = curry2_((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    }),

    divide = curry2_((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    }),

    subtract = curry2_((arg0, ...args) => {
        return args.reduce((agg, num) => agg - num, arg0);
    }),

    shallowCompareOnLeft = curry2_((incoming, against) => Array.isArray(incoming) ?
        shallowCompareArraysLeft(incoming, against) : shallowCompareObjectsLeft(incoming, against) ),

    shallowCompareArraysLeft = curry2_((incoming, against) => !incoming.some((_, ind) => against[ind] !== incoming[ind])),

    shallowCompareObjectsLeft = curry2_((incoming, against, keys) => !(keys || Object.keys(incoming))
        .some(key => against[key] !== incoming[key]) ),

    expectShallowEquals = curry2_((a, b) => expectTrue(shallowCompareOnLeft(a, b))),

    range = curry2_((from, to, step = 1) => {
        let inc = from;
        const out = [];
        while (inc <= to) {
            out.push(inc);
            if (inc > to) {
                break;
            }
            inc += step;
        }
        return out;
    }),
    log = console.log.bind(console);

export default {
    expectFunction,
    expectInstanceOf,
    expectEqual,
    expectFalse,
    expectTrue,
    expectShallowEquals,
    hasOwnProperty,
    length,
    add,
    multiply,
    divide,
    shallowCompareArraysLeft,
    shallowCompareObjectsLeft,
    shallowCompareOnLeft,
    range
};
