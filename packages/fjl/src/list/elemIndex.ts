import {curry, CurryOf2} from "../function/curry";
import {indexOf, Slice} from "../platform/slice";

type ElemIndex<T> = CurryOf2<T, Slice<T>, number | undefined>;

export const

  elemIndex = <T>(xs: Slice<T>, x: T): number | undefined => {
    const foundInd = indexOf(xs, x) as number;
    return foundInd !== -1 ? foundInd : undefined;
  },

  $elemIndex = curry(elemIndex) as ElemIndex<any>;

