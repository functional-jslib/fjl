import {Slice} from "../types";

/**
 * Returns `head` and `tail` of passed in slice type (array/string like) in a tuple, or `undefined` if slice is empty.
 * @param {Array|string} xs
 * @returns {Array|string|undefined}
 */
export const uncons = <T>(xs: Slice<T>): [T, Slice<T>] | void =>
  !xs || !xs.length ? undefined : [xs[0], xs.slice(1)];
