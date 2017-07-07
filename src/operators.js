/**
 * Created by elyde on 12/11/2016.
 */
'use strict';

import {curry2, curry3} from './curry';
import {typeOf} from './typeOf';

import {complement as objComplement,
    difference as objDifference,
    union as objUnion,
    intersect as objIntersect} from './objOperators';

import {complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect} from './arrayOperators';

export const map = curry2((fn, functor) => functor.map(fn)),

    filter = curry2((fn, functor) => functor.filter(fn)),

    reduce = curry3((fn, agg, functor) => functor.reduce(fn, agg)),

    reduceRight = curry3((fn, agg, functor) => functor.reduceRight(fn, agg)),

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
    map,
    filter,
    reduce,
    reduceRight,
    complement,
    difference,
    union,
    intersect
};
