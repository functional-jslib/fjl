/**
 * Created by elyde on 7/20/2017.
 * Curried functional versions of common array methods (`filter`, `map`, etc.).
 * @module jsPlatform_array
 */

import {fPureTakesOne_, fPureTakes2_, fPureTakesOneOrMore_} from '../utils';

/**
 * Reverses an listOps (shimmed if not exists).
 * @function module:jsPlatform_array.reverse
 * @return {Array}
 */
export {reverse} from '../uncurried/jsPlatform/array_';

export const

    /**
     * Maps a functionOps to functor (listOps etc.).
     * @function module:jsPlatform_array.map
     * @param fn {Function}
     * @param functor {Array|{map: {Function}}}
     * @returns {Array|{map: {Function}}}
     */
    map = fPureTakesOne_('map'),

    /**
     * Filters a functor (listOps etc.) with passed in functionOps.
     * @function module:jsPlatform_array.filter
     * @param fn {Function}
     * @param functor {Array|{filter: {Function}}}
     * @returns {Array|{filter: {Function}}}
     */
    filter = fPureTakesOne_('filter'),

    /**
     * Reduces a foldable (listOps etc.) with passed in functionOps.
     * @function module:jsPlatform_array.reduce
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {Array|{reduce: {Function}}}
     */
    reduce = fPureTakes2_('reduce'),

    /**
     * Reduces a foldable (listOps etc.) from the right with passed in functionOps.
     * @function module:jsPlatform_array.reduceRight
     * @param fn {Function}
     * @param functor {Array|{reduceRight: {Function}}}
     * @returns {Array|{reduceRight: {Function}}}
     */
    reduceRight = fPureTakes2_('reduceRight'),

    /**
     * For each on functor (Array|Object|etc.).
     * @function module:jsPlatform_array.forEach
     * @param fn {Function}
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
     * @throws {Error} - When passed in functor doesn't have a `forEach` method.
     */
    forEach = fPureTakesOne_('forEach'),

    /**
     * Returns `true` if `fn` (predicate) returns true for at least one item
     * in functor else returns `false`.
     * @function module:jsPlatform_array.some
     * @param fn {Function} - Predicate.
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have a `some` method.
     */
    some = fPureTakesOne_('some'),

    /**
     * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
     * @function module:jsPlatform_array.every
     * @param fn {Function} - Predicate.
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have an `every` method.
     */
    every = fPureTakesOne_('every'),

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @function module:jsPlatform_array.concat
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have an `every` method.
     */
    concat = fPureTakesOneOrMore_('concat'),

    /**
     * Array.prototype.join
     * @function module:jsPlatform_array.join
     * @param separator {String|RegExp}
     * @param arr {Array}
     * @returns {String}
     */
    join = fPureTakesOne_('join'),

    /**
     * Same as Array.prototype.slice
     * @function module:jsPlatform_array.slice
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = fPureTakes2_('slice'),

    /**
     * Same as Array.prototype.push
     * @function module:jsPlatform_array.push
     * @param item {*}
     * @param arr {Array}
     * @returns {Number}
     */
    push = fPureTakesOneOrMore_('push');
