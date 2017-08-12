/**
 * Created by elydelacruz on 7/22/2017.
 */

import {curry, curry2} from '../functionOps/curry';

export const

    fPureTakesOne = name => curry((arg, f) => f[name](arg)),

    fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2)),

    fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args));
