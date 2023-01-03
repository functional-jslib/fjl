/**
 * @memberOf object
 */
import {isset} from "./isset";

export const

  /**
   * Looks up property and returns it's value; Else returns `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   */
  lookup = (key, obj): any =>
    !isset(obj) ? undefined : obj[key],

  $lookup = (key) => obj => lookup(key, obj);
