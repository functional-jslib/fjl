/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

// ~~~ STRIP ~~~
// This part gets stripped out when
// generating browser version of test(s).
let {curry2__: curry2} = require('../../dist/cjs/curry'),
    {expect} = require('chai');
// These variables get set at the top IIFE in the browser.
// ~~~ /STRIP ~~~

let expectInstanceOf = curry2((value, instance) => expect(value).to.be.instanceOf(instance)),

    expectFunction = value => expectInstanceOf(value, Function),

    expectEqual = curry2((value, value2) => expect(value).to.be.equal(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

    length = something => something.length,

    add = curry2((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    multiply = curry2((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    }),

    divide = curry2((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    }),

    shallowCompareOnLeft = curry2((incoming, against) => Array.isArray(incoming) ?
        shallowCompareArraysLeft(incoming, against) : shallowCompareObjectsLeft(incoming, against) ),

    shallowCompareArraysLeft = curry2((incoming, against) => !incoming.some((_, ind) => against[ind] !== incoming[ind])),

    shallowCompareObjectsLeft = curry2((incoming, against, keys) => !(keys || Object.keys(incoming))
        .some(key => against[key] !== incoming[key]) ),

    expectShallowEquals = curry2((a, b) => expectTrue(shallowCompareOnLeft(a, b))),

    range = curry2((from, to, step = 1) => {
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
    });

module.exports = {
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
