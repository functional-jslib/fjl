import {isConstructablePrimitive, isNullish} from './is';
import {Constructable} from "../types";

/**
 * Creates a value `of` given type;  Checks for one of
 * the following construction strategies (in order listed):
 *
 *   - If exists `(value).constructor.of` uses this.
 *   - If value is a constructable primitive [String,
 *      Boolean, Symbol, Number, BigInt] calls value's
 *     constructor in cast form (E.g., `constructor(...args)` )
 *   - Else if constructor is an instance of `Function`,
 *     calls constructor, using the `new` keyword (with any
 *     passed in args).
 *   - Else returns void.
 */
export const of = <T>(x: T, ...args: any[]): T => {
    if (isNullish(x))
      return undefined;

    const constructor = x.constructor as Constructable;

    if (constructor['of']) {
        return constructor['of'](...args) as T;
    } else if (isConstructablePrimitive(x)) { // If constructable
      // primitive, means it can also be called in cast mode:
        return (constructor as unknown as (...args:any) => T)(...args) as T;
    } else if (x instanceof Function) {
        return new constructor(...args) as T;
    }

    return undefined;
};
