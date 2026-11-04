/**
 * @memberOf object
 */
export const

  /**
   * Looks up property and returns it's value; Else returns `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   *
   * @note Differs from Haskell's `lookup`, on purpose: takes a key and an object, not an association list.
   */
  lookup = (key, obj): any => obj?.[key],

  $lookup = (key) => obj => lookup(key, obj);
