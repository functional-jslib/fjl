/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length`)
 *      on both strings and arrays.
 */

import {fPureTakesOne, fPureTakes2, fPureTakesOneOrMore} from '../_utils';

export const

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @function module:jsPlatform_list_.concat
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have an `every` method.
     */
    concat = fPureTakesOneOrMore('concat'),

    /**
     * Same as Array.prototype.slice
     * @function module:jsPlatform_list_.slice
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = fPureTakes2('slice'),

    /**
     * `Array.prototype.includes` or shim.
     * @function module:jsPlatform_list_.includes
     * @param value {*}
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, xs) => xs.indexOf(value) > -1)(),

    /**
     * Searches list/list-like for given element `x`.
     * @function module:jsPlatform_list_.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = fPureTakesOne('indexOf'),

    /**
     * Last index of (`Array.prototype.lastIndexOf`).
     * @function module:jsPlatform_list_.lastIndexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    lastIndexOf = fPureTakesOne('lastIndexOf')

;
