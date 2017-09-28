/**
 * Created by elyde on 7/20/2017.
 * Curried functional versions of common array methods (`filter`, `map`, etc.).
 * @module jsPlatform.arrayOps
 */

import {fPureTakesOne_, fPureTakes2_, fPureTakesOneOrMore_} from   '../utils/utils';

import {defineReverse} from   '../uncurried/jsPlatform/arrayOpsUncurried';

export const

    /**
     * Maps a functionOps to functor (listOps etc.).
     * @function module:arrayOps.map
     * @param fn {Function}
     * @param functor {Array|{map: {Function}}}
     * @returns {Array|{map: {Function}}}
     */
    map = fPureTakesOne_('map'),

    /**
     * Filters a functor (listOps etc.) with passed in functionOps.
     * @function module:arrayOps.filter
     * @param fn {Function}
     * @param functor {Array|{filter: {Function}}}
     * @returns {Array|{filter: {Function}}}
     */
    filter = fPureTakesOne_('filter'),

    /**
     * Reduces a foldable (listOps etc.) with passed in functionOps.
     * @function module:arrayOps.reduce
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {Array|{reduce: {Function}}}
     */
    reduce = fPureTakes2_('reduce'),

    /**
     * Reduces a foldable (listOps etc.) from the right with passed in functionOps.
     * @function module:arrayOps.reduceRight
     * @param fn {Function}
     * @param functor {Array|{reduceRight: {Function}}}
     * @returns {Array|{reduceRight: {Function}}}
     */
    reduceRight = fPureTakes2_('reduceRight'),

    /**
     * For each on functor (Array|Object|etc.).
     * @function module:arrayOps.forEach
     * @param fn {Function}
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type of objectOps you pass in unless it doesn't have a `forEach` method.
     * @throws {Error} - When passed in functor doesn't have a `forEach` method.
     */
    forEach = fPureTakesOne_('forEach'),

    /**
     * Returns `true` if `fn` (predicate) returns true for at least one item
     * in functor else returns `false`.
     * @function module:arrayOps.some
     * @param fn {Function} - Predicate.
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have a `some` method.
     */
    some = fPureTakesOne_('some'),

    /**
     * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
     * @function module:arrayOps.every
     * @param fn {Function} - Predicate.
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    every = fPureTakesOne_('every'),

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @function module:arrayOps.concat
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    concat = fPureTakesOneOrMore_('concat'),

    /**
     * Array.prototype.join
     * @function module:arrayOps.join
     * @param separator {String|RegExp}
     * @param arr {Array}
     * @returns {String}
     */
    join = fPureTakesOne_('join'),

    /**
     * Same as Array.prototype.slice
     * @function module:arrayOps.slice
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = fPureTakes2_('slice'),

    /**
     * Same as Array.prototype.push
     * @function module:arrayOps.push
     * @param item {*}
     * @param arr {Array}
     * @returns {Number}
     */
    push = fPureTakesOneOrMore_('push'),

    /**
     * Reverses an listOps (shimmed if not exists).
     * @function module:arrayOps.reverse
     * @return {Array}
     */
    reverse = defineReverse();
