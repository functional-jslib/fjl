/**
 * @module function
 * @description Function operations/combinators.
 */

import {curry, curry2, curry3} from './function/curry';

import {
    apply as _apply,
    call as _call, reverse
} from './jsPlatform/jsPlatform';

import {
    until as _until
} from './function/until';

import {
    flip as _flip,
    flipN as _flipN,
    flip3 as _flip3,
    flip4 as _flip4,
    flip5 as _flip5
} from './function/flip';

export * from './function/curry';
export * from './function/_curry';
export * from './function/negate';
export * from './function/id';
export * from './function/compose';

export {_apply, _call, _until, _flip, _flip3, _flip4, _flip5,  _flipN};

export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:function.apply
     * @param fn {Function}
     * @param [args] {Array<*>}
     * @returns {*}
     * @curried - Triggered at 2 or more args.
     */
    apply = curry(_apply),

    /**
     * Functional `call` function (takes no context).
     * @function module:function.call
     * @param fn {Function}
     * @param [args] {...*}
     * @returns {*}
     * @curried
     */
    call = curry2(_call),

    /**
     * Run `operation` `until` predicate returns `true`.
     * @function module:function.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     * @curried
     */
    until = curry(_until),

    /**
     * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
     * @function module:function.flipN
     * @param fn {Function}
     * @returns {Function}
     * @curried - Triggered at 3 or more (args).
     */
    flipN = fn => curry3((...args) => apply(fn, reverse(args))),

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:function.flip
     * @param fn {Function}
     * @returns {Function}
     * @curried
     */
    flip = fn => curry(_flip(fn)),

    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:function.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     * @curried
     */
    flip3 = fn => curry(_flip3(fn)),

    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:function.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     * @curried
     */
    flip4 = fn => curry(_flip4(fn)),

    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:function.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     * @curried
     */
    flip5 = fn => curry(_flip5(fn));

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     * @curried
     */

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function module:function.curry_
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to given arity also enforces arity via placeholder values (`__`).
     * @function module:function.curryN_
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {Function} - Passed in function wrapped in a function for currying.
     */

    /**
     * Place holder object (frozen) used by curry.
     * @memberOf function
     * @type {PlaceHolder}
     */

    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 2 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry2_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 3 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry3_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 4 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry4_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 5 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry5_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:function.negateF
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:function.negateF3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:function.negateF4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:function.negateF5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:function.negateP
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:function.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Composes all functions passed in from right to left passing each functions return value to
     * the function on the left of itself.
     * @function module:function.compose
     * @param args {...Function}
     * @returns {Function}
     */
