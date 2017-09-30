/**
 * List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 * on both strings and arrays.
 * @module jsPlatform_list
 */

import {curry} from   '../functionOps/curry';

import {
    concat as concat_,
    slice as slice_,
    includes as includes_,
    indexOf as indexOf_,
    lastIndexOf as lastIndexOf_ } from '../uncurried/jsPlatform/listUncurried';

export const

    concat = curry(concat_),

    slice = curry(slice_),

    includes = curry(includes_),

    indexOf = curry(indexOf_),

    lastIndexOf = curry(lastIndexOf_)

;
