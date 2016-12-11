/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {curry2} from './../src/curry';
import {expect} from 'chai';

export let add = curry2((...args) => {
    return args.reduce((agg, num) => num + agg, 0);
});

export let multiply = curry2((...args) => {
    return args.reduce((agg, num) => num * agg, 1);
});

export let divide = curry2((...args) => {
    return args.reduce((agg, num) => agg / num, args.shift());
});

export let expectFunction = value => expect(value).to.be.instanceOf(Function);

export default {
    add,
    multiply,
    divide,
    expectFunction
}
