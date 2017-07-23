/**
 * Created by elyde on 7/15/2017.
 */

import {curry2} from '../function/curry';
import {every, some} from '../list/listPrelude';
import {apply} from '../function/apply';

export const

    isTruthy = value => !!value,

    isFalsy = value => !value,

    and = curry2((...args) => every(isTruthy, args)),

    or = curry2((...args) => some(isTruthy, args)),

    not = curry2((...args) => apply(isFalsy, args)),

    equal = curry2((arg0, ...args) => every(x => arg0 === x, args));
