
/**
 * Returns `init` and `last` of passed in list, or an empty list and the last item if list length is one, else
 * undefined if array is empty or not passed in.
 */
export const unconsr = <TS extends string | any[]>(xs: TS): [TS, TS[number]] | undefined =>
  !xs?.length ? undefined :
    [xs.slice(0, xs.length - 1) as TS, xs.at(-1)];

