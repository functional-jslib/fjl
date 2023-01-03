import {Slice} from "../types";

/**
 * Returns `init` and `last` of passed in list, or an empty list and the last item if list length is one, else
 * undefined if array is empty or not passed in.
 */
export const unconsr = <T>(xs: Slice<T>): [Slice<T>, T] | undefined =>
  !xs || !xs.length ? undefined : [xs.slice(0, xs.length - 1), xs.at(-1)];

