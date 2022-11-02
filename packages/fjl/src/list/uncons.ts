/**
 * Returns `head` and `tail` of passed in list/string in a tuple.
 * @param {Array} xs
 * @returns {Array|undefined}
 */
export const uncons = <T>(xs: T[]): [T, T[]] | void =>
  !xs || !xs.length ? undefined : [xs[0], xs.slice(1)];
