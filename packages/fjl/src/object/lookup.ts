/**
 * @memberOf object
 */

export const

  /**
   * Looks up property and returns it's value; Else `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   */
  lookup = <X extends object>(key: string | number | symbol, obj: X): any =>
    !obj ? undefined : obj[key],

  $lookup = <X extends object>(key: string | number | symbol) =>
    (obj: X) => lookup(key, obj);
