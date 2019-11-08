/**
 * @memberOf object
 */

import {curry, CurryOf2} from '../function/curry';

export type Lookup<T> = CurryOf2<string | number | symbol, any, any>;

/**
 * Looks up property and returns it's value; Else `undefined`.
 * Method is null safe (will not throw on `null` or `undefined`).
 * @function module:object.lookup
 * @param key {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
export const lookup: Lookup<any> = curry(
    <T, K extends keyof T>(key: K, obj: T): any =>
        !obj ? undefined : obj[key]
) as Lookup<any>;
