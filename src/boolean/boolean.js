/**
 * Created by elyde on 7/15/2017.
 */

import {curry2} from '../function/curry';

import {isFalsy} from './is';

// Reuse our algebra from the array package so the functionality
// is furtherly` validated throughout our library.
import {all as listAll} from '../array/array';

export const

    and = curry2((a, b) => a && b),

    or = curry2((a, b) => a || b),

    not = curry2((a, b) => !a || !b),

    equal = curry2((arg0, ...args) => listAll(x => arg0 === x, args)); // every
