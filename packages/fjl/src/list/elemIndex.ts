import {indexOf} from "../platform/slice";
import {Slice} from "../types";

export const

  elemIndex = <T>(xs: Slice<T>, x: T): number | undefined => {
    const foundInd = indexOf(xs, x) as number;
    return foundInd !== -1 ? foundInd : undefined;
  },

  $elemIndex = <T>(xs: Slice<T>) =>
    (x: T): number | undefined => elemIndex(xs, x)
;

