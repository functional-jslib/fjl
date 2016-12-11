/**
 * Created by elyde on 12/11/2016.
 */
'use strict';

import {curry2, curry3} from './curry';
import {isFunction} from './type-checking';

export let id = value => value;

export let equals = curry2((functor1, functor2) => {
    return functor1.equals && isFunction(functor1.equals) ?
        functor1.equals(functor2) : functor1 === functor2;
});

export let concat = curry2((functor1, functor2) => {
    return functor1.concat && isFunction(functor1.concat) ?
        functor1.concat(functor2) : functor1 + functor2;
});

export let empty = functor => functor.constructor.of();

export let of = functor => functor.constructor.of();

export let map = curry2((fn, functor) => functor.map(fn));

export let filter = curry2((fn, functor) => functor.filter(fn));

export let reduce = curry2((fn, agg, functor) => functor.reduce(fn, agg));

export let reduceRight = curry2((fn, agg, functor) => functor.reduceRight(fn, agg));

export let ap = curry2((obj1, obj2) => obj1.ap(obj2));

export let chain = curry2((fn, functor) => functor.map(fn).join());

export let fnOrFn = fn => isFunction(fn) ? fn : function () {
    return fn;
};

export let join = monad => {
    let {value, constructor} = monad;
    return value instanceof constructor ? value : constructor.of(value);
};

export let joinR = monad => {
    let {value, constructor} = monad;
    while (value instanceof constructor) {
        monad = value;
    }
    return monad instanceof constructor ? monad : constructor.of(monad);
};

export let liftN = curry3((fn, functor1, ...otherFunctors) => {
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
