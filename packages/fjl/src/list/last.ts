/**
 * @deprecated Use `at` instead.
 *
 * Returns last item of a slice.
 */
export const last = <T = any, TS extends string | T[] = T[]>(xs: TS): T => xs.at(-1) as T;
