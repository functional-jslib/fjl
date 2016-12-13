/**
 * Created by elyde on 12/11/2016.
 */
'use strict';

import {curry2, curry3} from './curry';
import {isFunction} from './type-checking';

export let id = value => value,

    equals = curry2((functor1, functor2) => {
        return functor1.equals && isFunction(functor1.equals) ?
            functor1.equals(functor2) : functor1 === functor2;
    }),

    concat = curry2((functor1, functor2) => {
        return functor1.concat && isFunction(functor1.concat) ?
            functor1.concat(functor2) : functor1 + functor2;
    }),

    empty = functor => functor.constructor.of(),

    of = functor => functor.constructor.of(),

    map = curry2((fn, functor) => functor.map(fn)),

    filter = curry2((fn, functor) => functor.filter(fn)),

    reduce = curry2((fn, agg, functor) => functor.reduce(fn, agg)),

    reduceRight = curry2((fn, agg, functor) => functor.reduceRight(fn, agg)),

    ap = curry2((obj1, obj2) => obj1.ap(obj2)),

    chain = curry2((fn, functor) => functor.map(fn).join()),

    fnOrFn = fn => isFunction(fn) ? fn : function () {
        return fn;
    },

    join = monad => {
        let {value, constructor} = monad;
        return value instanceof constructor ? value : constructor.of(value);
    },

    joinR = monad => {
        let {value, constructor} = monad;
        while (value instanceof constructor) {
            monad = value;
        }
        return monad instanceof constructor ? monad : constructor.of(monad);
    },

    liftN = curry3((fn, functor1, ...otherFunctors) => {
        return otherFunctors.reduce((aggregator, functor) => aggregator.ap(functor), functor1.map(fn));
    });

export default {
    id,
    equals,
    concat,
    empty,
    of,
    map,
    filter,
    reduce,
    reduceRight,
    ap,
    chain,
    fnOrFn,
    join,
    joinR,
    liftN
};
