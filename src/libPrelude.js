/**
 * Created by elydelacruz on 7/22/2017.
 */

import {curry, curry2} from './curry';

export const

    fOpPure = name => functor => functor[name](),

    fOpPureOnOneOrMore = name => curry2((functor, ...args) => functor[name](...args)),

    fOpHigherOrderOn2 = name => curry((fn, functor) => functor[name](fn)), // map, some, forEach etc.

    fOpHigherOrderOn3 = name => curry((fn, agg, functor) => functor[name](fn, agg)); // reduce, reduceRight
