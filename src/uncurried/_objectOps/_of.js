import {isFunction, isset} from './_is';
import {hasOwnProperty} from '../_jsPlatform/_object';
import {apply} from '../_jsPlatform/_function';
import {typeOf} from "./_typeOf";

/**
 * Checks if given `x` is set and of one of
 *  [String, Boolean, Number, or Symbol] (null and undefined are immutable
 *   but are not "usable" or 'not what we usually want to operate on'.
 * @private
 * @param x {*}
 * @returns {Boolean}
 */
function isUsableImmutablePrimitive (x) {
    const typeOfX = typeOf(x);
    return isset(x) &&
        [String.name, Number.name, Boolean.name, Symbol.name]
            .some(Type => Type === typeOfX);
}

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * ```
 * // - If exists `(value).constructor.of` uses this.
 * // - If value is of one String, Boolean, Symbol, or Number types calls it's
 * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * // - Else if constructor is a function, thus far, then calls constructor using
 * //      the `new` keyword (with any passed in args).
 * ```
 * @function module:_objectOps.of
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
