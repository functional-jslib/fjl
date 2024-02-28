import {Slice} from "../types";

/**
 * @deprecated Use `at` instead.
 *
 * Returns last item of a slice.
 */
export const last = <T = any, TS extends Slice<T> = Slice<T>>(xs: TS): T => xs.at(-1);
