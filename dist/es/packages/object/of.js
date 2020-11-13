import { isFunction, isUsableImmutablePrimitive } from './is';
import { isset } from './isset';
/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * @example
 * // - If exists `(value).constructor.of` uses this.
 * // - If value is of one String, Boolean, Symbol, or Number types calls it's
 * //      constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * // - Else if constructor is a function, thus far, then calls constructor using
 * //      the `new` keyword (with any passed in args).
 */
export const of = (x, ...args) => {
    if (!isset(x)) {
        return undefined;
    }
    const constructor = x.constructor;
    if (constructor['of']) {
        return constructor['of'](...args);
    }
    else if (isUsableImmutablePrimitive(x)) {
        return constructor(args);
    }
    else if (isFunction(constructor)) {
        return new constructor(...args);
    }
    return undefined;
};
//# sourceMappingURL=of.js.map