/**
 * @memberOf _functionOps
 * @author elydelacruz
 * @created 12/6/2016.
 * @description Curry implementation with place holder concept (`__`).
 * @todo Make code here more minimal (reuse small parts here).
 */

import {apply, concat, map, filter, length} from '../_jsPlatform/_jsPlatform';
import {fnOrError} from '../_object/_utils';

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
 * Replaces `placeholder` values in `_list`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `_list` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders (array, args) {
    let out = map(element => {
            if (!isPlaceHolder(element)) { return element; }
            else if (length(args)) { return args.shift(); }
            return element;
        }, array);
    return length(args) ? concat(out, args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:_functionOps.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
export function curry_ (fn, ...argsToCurry) {
    return curryN_(fnOrError(notFnErrPrefix, fn).length, fn, ...argsToCurry);
}

/**
 * Curries a _functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:_functionOps.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in _functionOps wrapped in a _functionOps for currying.
 */
export function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = filter(isPlaceHolder, concatedArgs),
            canBeCalled = (length(concatedArgs) - length(placeHolders) >= executeArity) || !executeArity;
        return !canBeCalled ?
            apply(curryN_, concat([executeArity, fnOrError(notFnErrPrefix, fn)], concatedArgs)) :
            apply(fnOrError(notFnErrPrefix, fn), concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf _functionOps
 * @type {PlaceHolder}
 */
export let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,

    /**
     * Curries a _functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call _functionOps until 2 or more args).
     * @function module:_functionOps.curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = fn => curryN_(2, fn),

    /**
     * Curries a _functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call _functionOps until 3 or more args).
     * @function module:_functionOps.curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = fn => curryN_(3, fn),

    /**
     * Curries a _functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call _functionOps until 4 or more args).
     * @function module:_functionOps.curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = fn => curryN_(4, fn),

    /**
     * Curries a _functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call _functionOps until 5 or more args).
     * @function module:_functionOps.curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = fn => curryN_(5, fn)

;
