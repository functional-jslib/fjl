/**
 * Returns `init` and `last` of passed in list, or an empty list and the last item if list length is one, else
 * undefined if array is empty or not passed in.
 */
export const unconsr = <T>(xs: T[]): [T[], T] | undefined =>
  !xs || !xs.length ? undefined : [xs.slice(0, xs.length - 2), xs[xs.length - 1]];
