/**
 * Created by elydelacruz on 7/22/2017.
 * @module utils
 * @private
 */

import {curry, curry2} from './uncurried/_functionOps/_curry';
export * from './uncurried/_objectOps/_utils';
export const

    fPureTakesOne_ = name => curry((arg, f) => f[name](arg)),

    fPureTakes2_ = name => curry((arg1, arg2, f) => f[name](arg1, arg2)),

    fPureTakesOneOrMore_ = name => curry2((f, ...args) => f[name](...args))
;
