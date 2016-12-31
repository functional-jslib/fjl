/**
 * Created by elyde on 12/11/2016.
 */
'use strict';

import {curry2, curry3} from './curry';
import {isFunction, isOfConstructable} from './is';

export let id = value => value,

    length = something => something.length,

    equals = curry2((functor1, functor2) => {
        return functor1.equals && isFunction(functor1.equals) ?
            functor1.equals(functor2) : functor1 === functor2;
    }),

    concat = curry2((functor1, functor2) => {
        return functor1.concat ? functor1.concat(functor2) : functor1 + functor2;
    }),

    of = (functor, value)=> {
        let constructor = functor.constructor,
            retVal;
        if (constructor.of) {
            retVal = constructor.of(value);
        }
        else if (isOfConstructable(functor)) {
            retVal = new constructor(value);
        }
        else {
            retVal = constructor(value);
        }
        return retVal;
    },

    empty = functor => functor.empty ? functor.empty() : of(functor),

    // zero = functor => functor.zero ? functor.zero() : of(functor),

    ap = curry2((obj1, obj2) => obj1.ap ? obj1.ap(obj2) : obj1(obj2)),

    // alt = curry2((functor1, functor2) => functor1.alt ? functor1.alt(functor2) : functor1 || functor2),

    map = curry2((fn, functor) => functor.map(fn)),

    filter = curry2((fn, functor) => functor.filter(fn)),

    reduce = curry3((fn, agg, functor) => functor.reduce(fn, agg)),

    reduceRight = curry3((fn, agg, functor) => functor.reduceRight(fn, agg)),

    join = monad => {
        return Object.prototype.hasOwnProperty.call(monad, 'value') ? monad.value : of(monad);
    },

    chain = curry2((fn, functor) => join(map(fn, functor))),

    // chainRec,

    liftN = curry3((fn, functor1, ...otherFunctors) => {
        return otherFunctors.reduce((aggregator, functor) => ap(aggregator, functor), map(fn, functor1));
    }),

    extend = curry2((fn, functor) => functor.extend(fn)),

    extract = curry2((fn, functor) => functor.extract(fn)),

    // promap,

    // bimap,

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
    liftN,
    maxLength,
    minLength
};
