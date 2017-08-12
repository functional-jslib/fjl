/**
 * Created by elyde on 7/15/2017.
 */

import {curry2} from '../functionOps/curry';

// Reuse our algebra from the arrayOps package so the functionality
// is validated/supported further.
import {all} from '../listOps/listOps';

export const

    and = curry2((a, b) => a && b),

    or = curry2((a, b) => a || b),

    not = curry2((a, b) => !a || !b),

    otherwise = () => true,

    equal = curry2((arg0, ...args) => all(x => arg0 === x, args)); // every
