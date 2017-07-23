/**
 * Created by elydelacruz on 7/22/2017.
 */

import {curry, curry2} from './curry';

export const

    fPure = name => x => x[name](),

    fPureTakesOne = name => curry((arg, f) => f[name](arg)),

    fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2)),

    fPureTakes3 = name => curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),

    fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args)),

    fOpPureOnOneOrMore = name => curry2((functor, ...args) => functor[name](...args)),

    fOpHigherOrderOn2 = name => curry((fn, functor) => functor[name](fn)), // map, some, forEach etc.

    fOpHigherOrderOn3 = name => curry((fn, agg, functor) => functor[name](fn, agg)), // reduce, reduceRight

    fOpTakesArrayPredicate = fOpHigherOrderOn2;
