/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {curry2_, __, compose} from '../src/functionOps';

import {expect} from 'chai';

const apply = (fn, ...args) => fn.apply(null, args);

export let  expectInstanceOf = curry2_((value, instance) => expect(value).to.be.instanceOf(instance)),

    expectFunction = value => expectInstanceOf(value, Function),

    expectEqual = curry2_((value, value2) => expect(value).to.be.equal(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    expectLength = curry2_((len, element) => compose(expectEqual(__, len), length)(element)),

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
        shallowCompareArraysLeft(incoming, against) :
            shallowCompareObjectsLeft(incoming, against) ),

    shallowCompareArraysLeft = curry2_((incoming, against) => !incoming.some((_, ind) => against[ind] !== incoming[ind])),

    shallowCompareObjectsLeft = curry2_((incoming, against, keys) => !(keys || Object.keys(incoming))
        .some(key => against[key] !== incoming[key]) ),

    deepCompareObjectsLeft = curry2_((incoming, against, keys) =>
        !(keys || Object.keys(incoming)).map(key =>
            typeof against[key] === 'object' && typeof incoming[key] === 'object' ?
                deepCompareObjectsLeft(incoming[key], against[key]) : incoming[key] === against[key]
        )
            .some(bln => !bln)
    ),

    deepCompareLeft = (incoming, against) =>
        incoming === against || Object.keys(incoming).every(key => {
            const typeOfValue = typeof incoming[key];
            // console.log('deepcompare', incoming[key], against[key]);
            return typeOfValue === 'object' ?
               deepCompareLeft(incoming[key], against[key]) :
                against[key] === incoming[key];
        }),

    expectShallowEquals = curry2_((a, b) => expectTrue(shallowCompareOnLeft(a, b))),

    expectShallowEqual = expectShallowEquals,

    expectDeepEquals = curry2_((a, b) => expectTrue(deepCompareLeft(a, b))),

    range = curry2_((from, to, step = 1) => {
        let i = from;
        const out = [];
        if (step < 0 && i > 0) { for (; i >= to; i += step) { out.push(i); } }
        else if (step > 0 && i < to) { for (; i <= to; i += step) { out.push(i); } }
        else { throw new Error ('Invalid range requested'); }
        return out;
    }),

    log = console.log.bind(console),

    peek = (...args) => (log(...args), args.pop()),

    allYourBase = {all: {your: {base: {are: {belong: {to: {us: 0}}}}}}},

    alphabetCharCodeRange = range('a'.charCodeAt(0), 'z'.charCodeAt(0)),

    alphabetArray = alphabetCharCodeRange
        .map(charCode => String.fromCharCode(charCode)),

    alphabetString = alphabetArray.join(''),

    jsonClone = x => JSON.parse(JSON.stringify(x))

    ;
