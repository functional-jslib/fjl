/**
 * Function operations: `
 * @module functionOps
 */

import {curry, curry2, curry3} from './uncurried/_functionOps/curry_';

import {
    apply as _apply,
    call as _call, reverse
} from './uncurried/_jsPlatform';

import {
    until as _until
} from './uncurried/_functionOps/until_';

import {
    flip as _flip,
    flipN as _flipN,
    flip3 as _flip3,
    flip4 as _flip4,
    flip5 as _flip5
} from './uncurried/_functionOps/flip_';

export * from './uncurried/_functionOps/curry_';
export * from './uncurried/_functionOps/curry__';
export * from './uncurried/_functionOps/negate_';
export * from './uncurried/_functionOps/id_';
export * from './uncurried/_functionOps/compose_';

export {_apply, _call, _until, _flip, _flip3, _flip4, _flip5,  _flipN};

export const

    /**
     * Functional `apply` _functionOps (takes no context).
     * @function module:_functionOps.apply
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
     * Flips a _functionOps's first and second arguments and and returns a new _functionOps requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => curry(_flip(fn)),

    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:functionOps.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     */
    flip3 = fn => curry(_flip3(fn)),

    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:functionOps.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     */
    flip4 = fn => curry(_flip4(fn)),

    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:functionOps.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     */
    flip5 = fn => curry(_flip5(fn));
