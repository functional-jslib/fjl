import {reverse} from '../listOps/listOpsPlatformPrelude';
import {curry, curry3} from './curry';
import {apply} from './apply';
import {call} from './call';

export const

    /**
     * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
     * @functionOps module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = fn => curry3((...args) => apply(fn, reverse(args))),

    /**
     * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
     * @functionOps module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => curry((b, a) => call(fn, a, b));
