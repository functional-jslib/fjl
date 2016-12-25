/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {curry2} from './../src/curry';
import {expect} from 'chai';

export let  expectInstanceOf = curry2((value, instance) => expect(value).to.be.instanceOf(instance)),

    expectFunction = value => expect(value).to.be.instanceOf(Function),

    expectEqual = curry2((value, value2) => expect(value).to.be.equal(value2)),

    expectFalse = value => expectEqual(value, false),

    expectTrue = value => expectEqual(value, true),

    add = curry2((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    multiply = curry2((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    }),

    divide = curry2((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    });

export default {
    expectFunction,
    expectInstanceOf,
    expectEqual,
    expectFalse,
    expectTrue,
    add,
    multiply,
    divide
};
