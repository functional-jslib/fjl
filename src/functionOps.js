/**
 * Function operations: `
 * @module functionOps
 */

import {curry, curry2, curry3} from './uncurried/functionOps/curry_';
import {
    apply as _apply,
    call as _call, reverse} from './uncurried/jsPlatform_';
import {until as _until} from './uncurried/functionOps/until_';

export * from './uncurried/functionOps/curry_';
export * from './uncurried/functionOps/curry__';
export * from './uncurried/functionOps/negate_';
export * from './uncurried/functionOps/id_';
export * from './uncurried/functionOps/compose_';

export const

    /**
     * Functional `apply` functionOps (takes no context).
     * @function module:functionOps.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = curry(_apply),

    /**
     * Functional `call` function (takes no context).
     * @function module:functionOps.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = curry2(_call),

    /**
     * Run `operation` `until` predicate returns `true`.
     * @function module:functionOps.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     * @curried
     */
    until = curry(_until),

    /**
     * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
     * @function module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = fn => curry3((...args) => apply(fn, reverse(args))),

    /**
     * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => curry((b, a) => call(fn, a, b));
