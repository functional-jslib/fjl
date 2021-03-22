/**
 * @memberOf object
 */

import {curry, CurryOf2} from '../function/curry';

export type Lookup<T> = CurryOf2<string | number | symbol, any, any>;

export const

  $lookup =
    <T, K extends keyof T>(key: K, obj: T): any =>
      !obj ? undefined : obj[key],

  /**
   * Looks up property and returns it's value; Else `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   * @function module:object.lookup
   * @param key {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  lookup: Lookup<any> = curry($lookup) as Lookup<any>;
