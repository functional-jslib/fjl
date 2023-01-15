/**
 * @memberOf object
 */
export const

  /**
   * Looks up property and returns it's value; Else returns `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   */
  lookup = (key, obj): any => obj[key],

  $lookup = (key) => obj => lookup(key, obj);
