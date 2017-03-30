/**
 * Created by elyde on 12/11/2016.
 */
'use strict';

import {curry2, curry3} from './curry';
import {isConstructablePrimitive} from './is';
import {typeOf} from './typeOf';

import {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './objOperators';

import {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect} from './arrayOperators';

export const id = value => value,

    equals = curry2((functor1, functor2) => {
        return functor1.equals ? functor1.equals(functor2) : functor1 === functor2;
    }),

    concat = curry2((functor1, functor2) => {
        return functor1.concat ? functor1.concat(functor2) : functor1 + functor2;
    }),

    of = functor => {
        let constructor = functor.constructor,
            retVal;
        if (constructor.of) {
            retVal = constructor.of();
        }
        else if (!isConstructablePrimitive(functor)) {
            retVal = new constructor();
        }
        return retVal || constructor();
    },

    empty = functor => functor.constructor.empty ? functor.constructor.empty() : of(functor),

    zero = functor => functor.constructor.zero ? functor.constructor.zero() : of(functor),

    ap = curry2((obj1, obj2) => obj1.ap ? obj1.ap(obj2) : obj1(obj2)),

    alt = curry2((functor1, functor2) => functor1.alt ? functor1.alt(functor2) : functor1 || functor2),

    map = curry2((fn, functor) => functor.map(fn)),

    filter = curry2((fn, functor) => functor.filter(fn)),

    reduce = curry3((fn, agg, functor) => functor.reduce(fn, agg)),

    reduceRight = curry3((fn, agg, functor) => functor.reduceRight(fn, agg)),

    join = (functor, delimiter) => Array.isArray(functor) ? functor.join(delimiter) : functor.join(),

    chain = curry2((fn, functor) => functor.chain ? functor.chain(fn) : join(map(fn, functor))),

    // chainRec = () => {},

    liftN = curry3((fn, functor1, ...otherFunctors) => {
        return otherFunctors.reduce(
            (aggregator, functor) => ap(aggregator, functor), map(fn, functor1)
        );
    }),

    extend = curry2((fn, functor) => functor.extend(fn)),

    extract = curry2((fn, functor) => functor.extract(fn)),

    promap = curry2((fn1, fn2, functor) => functor.promap(fn1, fn2)),

    bimap = curry2((fn1, fn2, functor) => functor.bimap(fn1, fn2)),

    complement = curry2((functor, ...others) => {
        switch (typeOf(functor)) {
            case 'Array':
                return arrayComplement(functor, ...others);
            default:
                return objComplement(functor, ...others);
        }
    }),

    difference = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayDifference(functor1, functor2);
            default:
                return objDifference(functor1, functor2);
        }
    }),

    union = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayUnion(functor1, functor2);
            default:
                return objUnion(functor1, functor2);
        }
    }),

    intersect = curry2((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayIntersect(functor1, functor2);
            default:
                return objIntersect(functor1, functor2);
        }
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
    join,
    alt,
    zero,
    liftN,
    bimap,
    promap
};
