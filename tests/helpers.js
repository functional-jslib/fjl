/**
 * Created by elyde on 12/10/2016.
 */

import {curry2_, __, compose} from '../src/functionOps';

export const

    expectInstanceOf = curry2_((value, instance) => expect(value).toBeInstanceOf(instance)),

    expectFunction = value => expectInstanceOf(value, Function),

    expectEqual = curry2_((value, value2) => expect(value).toEqual(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    expectLength = curry2_((len, element) => compose(expectEqual(__, len), length)(element)),

    expectError = fn => expect(fn).toThrow(),

    hasOwnProperty = (instance, key) => Object.prototype.hasOwnProperty.call(instance, key),

    length = something => something.length,

    add = curry2_((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    subtract = curry2_((arg0, ...args) => {
        return args.reduce((agg, num) => agg - num, arg0);
    }),

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
