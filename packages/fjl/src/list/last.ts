import {Slice} from "../types";

/**
 * Returns last item of list.
 */
export const last = <T>(xs: Slice<T>): T | undefined => xs.at(-1);
