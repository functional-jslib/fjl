/**
 * Created by elyde on 7/20/2017.
 * All functions here are functional versions of methods of types;  E.g., map, filter etc.
 * @todo add `reverse` to './compounded'
 */

import {fPureTakesOne, fPureTakes2, fPureTakesOneOrMore} from '../utils/utils';

/**
 * Array.prototype.reverse generator (generates a functionOps that calls the prototype version or a
 * shimmed version if it doesn't exist).
 * @returns {Function}
 */
function defineReverse () {
    return Array.prototype.reverse ? x => x.reverse() :
        x => x.reduceRight((agg, item) => {
            agg.push(item);
            return agg;
        }, []);
}

export const

    /**
     * Maps a functionOps to functor (listOps etc.).
     * @functionOps module:arrayOperators.map
     * @param fn {Function}
     * @param functor {Array|{map: {Function}}}
     * @returns {Array|{map: {Function}}}
     */
    map = fPureTakesOne('map'),

    /**
     * Filters a functor (listOps etc.) with passed in functionOps.
     * @functionOps module:arrayOperators.filter
     * @param fn {Function}
     * @param functor {Array|{filter: {Function}}}
     * @returns {Array|{filter: {Function}}}
     */
    filter = fPureTakesOne('filter'),

    /**
     * Reduces a foldable (listOps etc.) with passed in functionOps.
     * @functionOps module:arrayOperators.reduce
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {Array|{reduce: {Function}}}
     */
    reduce = fPureTakes2('reduce'),

    /**
     * Reduces a foldable (listOps etc.) from the right with passed in functionOps.
     * @functionOps module:arrayOperators.reduceRight
     * @param fn {Function}
     * @param functor {Array|{reduceRight: {Function}}}
     * @returns {Array|{reduceRight: {Function}}}
     */
    reduceRight = fPureTakes2('reduceRight'),

    /**
     * For each on functor (Array|Object|etc.).
     * @param fn {Function}
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type of objectOps you pass in unless it doesn't have a `forEach` method.
     * @throws {Error} - When passed in functor doesn't have a `forEach` method.
     */
    forEach = fPureTakesOne('forEach'),

    /**
     * Returns `true` if `fn` (predicate) returns true for at least one item
     * in functor else returns `false`.
     * @param fn {Function} - Predicate.
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have a `some` method.
     */
    some = fPureTakesOne('some'),

    /**
     * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
     * @param fn {Function} - Predicate.
     * @param functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    every = fPureTakesOne('every'),

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    concat = fPureTakesOneOrMore('concat'),

    /**
     * Array.prototype.join
     * @functionOps module:listPrelude.join
     * @param separator {String|RegExp}
     * @param arr {Array}
     * @returns {String}
     */
    join = fPureTakesOne('join'),

    /**
     * Same as Array.prototype.slice
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = fPureTakes2('slice'),

    /**
     * Same as Array.prototype.push
     * @param item {*}
     * @param arr {Array}
     * @returns {Number}
     */
    push = fPureTakesOneOrMore('push'),

    /**
     * Reverses an listOps (shimmed if not exists).
     * @functionOps module:listPrelude.reverse
     * @return {Array}
     */
    reverse = defineReverse();
