/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {curry2} from './../src/curry';
import {expect} from 'chai';

export let add = curry2((...args) => {
        return args.reduce((agg, num) => num + agg, 0);
    }),

    multiply = curry2((...args) => {
        return args.reduce((agg, num) => num * agg, 1);
    }),

    divide = curry2((...args) => {
        return args.reduce((agg, num) => agg / num, args.shift());
    }),

    expectInstanceOf = curry2((value, Instance) => expect(value).to.be.instanceOf(Instance)),

    expectFunction = value => expect(value).to.be.instanceOf(Function),

    expectEqual = curry2((value, value2) => expect(value).to.be.equal(value2));

export default {
    add,
    multiply,
    divide,
    expectFunction,
    expectInstanceOf,
    expectEqual
};
