/**
 * @memberOf index.ts
 * @description Curry implementation with place holder concept (`__`).
 */

import {fnOrError} from '../../function/fnOrError';

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder = function PlaceHolder() {},

    notFnErrPrefix = '`fn` in `curry_(fn, ...args)`',

    /**
     * Placeholder instance.
     * @type {PlaceHolder}
     * @private
     */
    placeHolderInstance = new PlaceHolder();

/**
 * Checks to see if value is a `PlaceHolder`.
 * @param instance {*}
 * @returns {boolean}
 * @private
 */
function isPlaceHolder (instance) {
    return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `list`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `list` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders (array, args) {
    let out = array.map(element => {
            if (!isPlaceHolder(element)) { return element; }
            else if (args.length) { return args.shift(); }
            return element;
        });
    return args.length ? out.concat(args) : out;
}

/**
 * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @note Usage of the `curry_` variation functions are discouraged as they are less performant
 * @function module:function.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
export function curry_ (fn, ...argsToCurry) {
    return curryN_(fnOrError(notFnErrPrefix, fn).length, fn, ...argsToCurry);
}

/**
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function module:function.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in function wrapped in a function for currying.
 */
export function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = concatedArgs.filter(isPlaceHolder),
            canBeCalled = (concatedArgs.length - placeHolders.length >= executeArity) || !executeArity;
        return !canBeCalled ?
            curryN_.apply(null, [executeArity, fnOrError(notFnErrPrefix, fn)].concat(concatedArgs)) :
            fnOrError(notFnErrPrefix, fn).apply(null, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf index.ts
 * @type {PlaceHolder}
 */
export let __ = Object.freeze(placeHolderInstance),

    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call function until 2 or more args).
     * @function module:function.curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = fn => curryN_(2, fn),

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call function until 3 or more args).
     * @function module:function.curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = fn => curryN_(3, fn),

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call function until 4 or more args).
     * @function module:function.curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = fn => curryN_(4, fn),

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call function until 5 or more args).
     * @function module:function.curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = fn => curryN_(5, fn)

;
