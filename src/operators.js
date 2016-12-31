/**
 * Created by elyde on 12/11/2016.
 */
'use strict';

import {curry2, curry3} from './curry';
import {isFunction, isPrimitive} from './is';

export let id = value => value,

    length = functor => functor.length,

    equals = curry2((functor1, functor2) => {
        return functor1.equals && isFunction(functor1.equals) ?
            functor1.equals(functor2) : functor1 === functor2;
    }),

    concat = curry2((functor1, functor2) => {
        return functor1.concat && isFunction(functor1.concat) ?
            functor1.concat(functor2) : functor1 + functor2;
    }),

    of = functor => {
        let constructor = functor.constructor,
            retVal;
        if (constructor.of) {
            retVal = constructor.of();
        }
        else if (!isPrimitive(functor)) {
            retVal = constructor();
        }
        else {
            retVal = new constructor();
        }
        return retVal;
    },

    empty = functor => of(functor),

    map = curry2((fn, functor) => functor.map(fn)),

    filter = curry2((fn, functor) => functor.filter(fn)),

    reduce = curry2((fn, agg, functor) => functor.reduce(fn, agg)),

    reduceRight = curry2((fn, agg, functor) => functor.reduceRight(fn, agg)),

    ap = curry2((obj1, obj2) => obj1.ap(obj2)),

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

    chain = curry2((fn, functor) => join(map(fn, functor))),

    liftN = curry3((fn, functor1, ...otherFunctors) => {
        return otherFunctors.reduce((aggregator, functor) => ap(aggregator, functor), map(fn, functor1));
    }),

    maxLength = (array1, array2) => {
        if (array1.length > array2.length) {
            return array1;
        }
        else if (array2.length > array1.length) {
            return array2;
        }
        return array1;
    },

    minLength = (array1, array2) => {
        if (array1.length < array2.length) {
            return array1;
        }
        else if (array2.length < array1.length) {
            return array2;
        }
        return array1;
    };

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
    join,
    joinR,
    liftN,
    maxLength,
    minLength
};
