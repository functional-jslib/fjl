/**
 * @memberOf functionOps
 * @author elydelacruz
 * @created 12/6/2016.
 * @description Curry implementation with place holder concept (`__`).
 * @todo Make code here more minimal (reuse small parts here).
 */

import {apply, concat, map, filter, length} from '../jsPlatform_';

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
const PlaceHolder = function PlaceHolder() {},

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
 * Replaces `placeholder` values in `listOps`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
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
 * @function module:functionOps_.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
export function curry_ (fn, ...argsToCurry) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(argsToCurry, args),
            placeHolders = filter(isPlaceHolder, concatedArgs),
            canBeCalled = length(placeHolders) === 0 &&
                length(concatedArgs) >= length(fn);
        return canBeCalled ? apply(fn, concatedArgs) :
            apply(curry_, concat([fn], concatedArgs));
    };
}

/**
 * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:functionOps_.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
export function curryN_ (executeArity, fn, ...curriedArgs) {
    return (...args) => {
        let concatedArgs = replacePlaceHolders(curriedArgs, args),
            placeHolders = filter(isPlaceHolder, concatedArgs),
            canBeCalled = (length(concatedArgs) - length(placeHolders) >= executeArity) || !executeArity;
        return !canBeCalled ?
            apply(curryN_, concat([executeArity, fn], concatedArgs)) :
            apply(fn, concatedArgs);
    };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf functionOps_
 * @type {PlaceHolder}
 */
export let __ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,

    /**
     * Curries a functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 2 or more args).
     * @function module:functionOps_.curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = fn => curryN_(2, fn),

    /**
     * Curries a functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 3 or more args).
     * @function module:functionOps_.curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = fn => curryN_(3, fn),

    /**
     * Curries a functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 4 or more args).
     * @function module:functionOps_.curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = fn => curryN_(4, fn),

    /**
     * Curries a functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 5 or more args).
     * @function module:functionOps_.curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = fn => curryN_(5, fn)

;
