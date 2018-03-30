/**
 * Function operations: `
 * @module functionOps
 */

import {curry, curry2, curry3} from './uncurried/_functionOps/_curry';

import {
    apply as _apply,
    call as _call, reverse
} from './uncurried/_jsPlatform/_jsPlatform';

import {
    until as _until
} from './uncurried/_functionOps/_until';

import {
    flip as _flip,
    flipN as _flipN,
    flip3 as _flip3,
    flip4 as _flip4,
    flip5 as _flip5
} from './uncurried/_functionOps/_flip';

export * from './uncurried/_functionOps/_curry';
export * from './uncurried/_functionOps/__curry';
export * from './uncurried/_functionOps/_negate';
export * from './uncurried/_functionOps/_id';
export * from './uncurried/_functionOps/_compose';

export {_apply, _call, _until, _flip, _flip3, _flip4, _flip5,  _flipN};

export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:functionOps.apply
     * @param fn {Function}
     * @param [args] {Array<*>}
     * @returns {*}
     * @curried - Triggered at 2 or more args.
     */
    apply = curry(_apply),

    /**
     * Functional `call` function (takes no context).
     * @function module:functionOps.call
     * @param fn {Function}
     * @param [args] {...*}
     * @returns {*}
     * @curried
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
     * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
     * @function module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     * @curried - Triggered at 3 or more (args).
     */
    flipN = fn => curry3((...args) => apply(fn, reverse(args))),

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     * @curried
     */
    flip = fn => curry(_flip(fn)),

    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:functionOps.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     * @curried
     */
    flip3 = fn => curry(_flip3(fn)),

    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:functionOps.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     * @curried
     */
    flip4 = fn => curry(_flip4(fn)),

    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:functionOps.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     * @curried
     */
    flip5 = fn => curry(_flip5(fn));

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:functionOps.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     * @curried
     */

    /**
     * Curries a function up to a given arity.
     * @function module:functionOps.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:functionOps.curry2
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:functionOps.curry3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:functionOps.curry4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:functionOps.curry5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function module:functionOps.curry_
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to given arity also enforces arity via placeholder values (`__`).
     * @function module:functionOps.curryN_
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {Function} - Passed in function wrapped in a function for currying.
     */

    /**
     * Place holder object (frozen) used by curry.
     * @memberOf functionOps
     * @type {PlaceHolder}
     */

    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 2 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry2_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 3 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry3_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 4 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry4_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 5 or more args (not counting placeholder (`__`) value).
     * @function module:functionOps.curry5_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:functionOps.negateF
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:functionOps.negateF3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:functionOps.negateF4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:functionOps.negateF5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:functionOps.negateP
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:functionOps.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns passed in parameter.
     * @haskellType `id :: a -> a`
     * @function module:functionOps.id
     * @param x {*}
     * @returns {*}
     */

    /**
     * Composes all functions passed in from right to left passing each functions return value to
     * the function on the left of itself.
     * @function module:functionOps.compose
     * @param args {...Function}
     * @returns {Function}
     */
