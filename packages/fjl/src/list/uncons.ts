/**
 * Returns `head` and `tail` of passed in slice type (array/string like)
 * in a tuple, or `undefined` (if incoming value is empty).
 */
export const uncons = <TS extends string | any[]>(xs: TS): [TS[number], TS] | void =>
  !xs?.length ? undefined : [xs[0], xs.slice(1) as TS];
