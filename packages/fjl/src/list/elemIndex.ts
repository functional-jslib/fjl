import {indexOf} from "../platform/slice";
import {Slice} from "../types";

export const

  elemIndex = <T, TS extends Slice<T>>(xs: TS, x: T): number | undefined => {
    const foundInd = indexOf(xs, x);
    return foundInd !== -1 ? foundInd : undefined;
  },

  $elemIndex = <T, TS extends Slice<T>>(xs: TS) =>
    (x: T): number | undefined => elemIndex(xs, x)
;

