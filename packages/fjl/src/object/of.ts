import {isFunction, isUsableImmutablePrimitive} from './is';
import {isset} from './isset';
import {Constructable} from "../types";

/**
 * Creates a value `of` given type;  Checks for one of the following construction strategies (in order listed):
 * - If exists `(value).constructor.of` uses this.
 * - If value is a primitive [String, Boolean, Symbol, Number] calls it's
 *   constructor as a function (in cast form;  E.g., `constructor(...args)` )
 * - Else if constructor is a function, thus far, then calls constructor using
 *   the `new` keyword (with any passed in args).
 */
export const of = <T>(x: T, ...args: any[]): T => {
    if (!isset(x)) {
        return undefined;
    }
    const constructor = x.constructor as Constructable;
    if (constructor['of']) {
        return constructor['of'](...args) as T;
    } else if (isUsableImmutablePrimitive(x)) {
        return (constructor as unknown as (...args:any) => T)(...args) as T;
    } else if (isFunction(constructor)) {
        return new constructor(...args) as T;
    }
    return undefined;
};
