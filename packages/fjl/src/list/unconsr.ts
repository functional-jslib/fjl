
/**
 * Returns `init` and `last` of passed in list, or an empty list and the last item if list length is one, else
 * undefined if array is empty or not passed in.
 */
export const unconsr = <T = any>(xs: string | T[]): [typeof xs, T | string] | undefined =>
  !xs?.length ? undefined :
    [xs.slice(0, xs.length - 1), xs.at(-1)];

