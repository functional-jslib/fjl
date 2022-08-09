/**
 * @memberOf object
 */

import {Indexable} from "../types";

export const

  /**
   * Looks up property and returns it's value; Else `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   */
  lookup = (key: string | number | symbol, obj: Indexable): any =>
    !obj ? undefined : obj[key],

  $lookup = (key: string | number | symbol) =>
    (obj: Indexable) => lookup(key, obj);
