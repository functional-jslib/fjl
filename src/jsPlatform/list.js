/**
 * List operations that overlap (apart from globally overlapping props and functions like `length`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

import {curry} from '../uncurried/_functionOps/_curry';

import {
    concat as concat_,
    slice as slice_,
    includes as includes_,
    indexOf as indexOf_,
    lastIndexOf as lastIndexOf_ } from '../uncurried/_jsPlatform/list_';

export const

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @function module:jsPlatform_array.concat
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have an `every` method.
     */
    concat = curry(concat_),

    /**
     * Same as Array.prototype.slice
     * @function module:jsPlatform_array.slice
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = curry(slice_),

    includes = curry(includes_),

    indexOf = curry(indexOf_),

    lastIndexOf = curry(lastIndexOf_)

;
