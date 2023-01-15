/**
 * Returns `head` and `tail` of passed in slice type (array/string like) in a tuple,
 * or `undefined` if incoming type is empty.
 */
export const uncons = (xs: string | any[]): [string | any, typeof xs] | void =>
  !xs?.length ? undefined : [xs[0], xs.slice(1)];
