/**
 * Created by elyde on 7/20/2017.
 */

import {curry, curry2} from './curry';

const

    pure = name => functor => functor[name](),

    pureOnOneTypeOneOrMore = name => curry2((functor, ...args) => functor[name](...args)),

    higherOrderOn2 = name => curry((fn, functor) => functor[name](fn)), // map, some, forEach etc.

    higherOrderOn3 = name => curry((fn, agg, functor) => functor[name](fn, agg)); // reduce, reduceRight

export const

    /**
     * Maps a function to functor (array etc.).
     * @function module:arrayOperators.map
     * @param fn {Function}
     * @param functor {Array|{map: {Function}}}
     * @returns {Array|{map: {Function}}}
     */
    map = higherOrderOn2('map'),

    /**
     * Filters a functor (array etc.) with passed in function.
     * @function module:arrayOperators.filter
     * @param fn {Function}
     * @param functor {Array|{filter: {Function}}}
     * @returns {Array|{filter: {Function}}}
     */
    filter = higherOrderOn2('filter'),

    /**
     * Reduces a foldable (array etc.) with passed in function.
     * @function module:arrayOperators.reduce
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {Array|{reduce: {Function}}}
     */
    reduce = higherOrderOn2('reduce'),

    /**
     * Reduces a foldable (array etc.) from the right with passed in function.
     * @function module:arrayOperators.reduceRight
     * @param fn {Function}
     * @param functor {Array|{reduceRight: {Function}}}
     * @returns {Array|{reduceRight: {Function}}}
     */
    reduceRight = higherOrderOn3('reduceRight'),

    forEach = higherOrderOn2('forEach'),

    some = higherOrderOn2('some'),

    every = higherOrderOn2('every'),

    concat = pureOnOneTypeOneOrMore('concat');
