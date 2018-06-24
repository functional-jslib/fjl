import {isFunction, isset, isUsableImmutablePrimitive} from './is';
import {hasOwnProperty} from '../jsPlatform/object';
import {apply} from '../jsPlatform/function';

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * ```
 * // - If exists `(value).constructor.of` uses this.
 * // - If value is of one String, Boolean, Symbol, or Number types calls it's
 * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * // - Else if constructor is a function, thus far, then calls constructor using
 * //      the `new` keyword (with any passed in args).
 * ```
 * @function module:object.of
 * @param x {*} - Value to derive returned value's type from.
 * @param [args] {...*} - Any args to pass in to matched construction strategy.
 * @returns {*|undefined} - New value of given value's type else `undefined`.
 */
export const of = (x, ...args) => {
    if (!isset(x)) { return undefined; }
    const constructor = x.constructor;
    if (hasOwnProperty('of', constructor)) {
        return apply(constructor.of, args);
    }
    else if (isUsableImmutablePrimitive(x)) {
        return apply(constructor, args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};
