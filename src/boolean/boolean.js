/**
 * Created by elyde on 7/15/2017.
 */

import {curry2} from '../function/curry';

import {isFalsy} from './is';

// Reuse our algebra from the array package so the functionality
// is furtherly` validated throughout our library.
import {
    and as listAnd,
    or as listOr,
    all as listAll} from '../array/array';

export const

    and = curry2((...args) => listAnd(args)), // every

    or = curry2((...args) => listOr(args)), // some

    not = curry2((...args) => listAll(isFalsy, args)), // every

    equal = curry2((arg0, ...args) => listAll(x => arg0 === x, args)); // every
