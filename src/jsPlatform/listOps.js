/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

import {curry} from '../functionOps/curry';

import {
    concat as concat_,
    slice as slice_,
    includes as includes_,
    indexOf as indexOf_,
    lastIndexOf as lastIndexOf_ } from '../uncurried/jsPlatform/listOpsUncurried';

export const

    concat = concat_,

    /**
     * Calls `slice` method on passed in instance.
     * @function module:jsPlatform.listOps
     * @param separator {String|RegExp}
     * @param list {Array|String|*}
     * @returns {Array|String|*}
     */
    slice = curry(slice_),

    includes = includes_,

    indexOf = indexOf_,

    lastIndexOf = lastIndexOf_

;
