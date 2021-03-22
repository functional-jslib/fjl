import {curry, CurryOf2} from "../function/curry";
import {uncons} from "./uncons";
import {reduce} from "./utils/reduce";
import {ReduceOp} from "../platform/array/types";
import {Slice} from "../platform/slice/types";

export const

  $fold1 = <T, RetT>(op: ReduceOp<T, Slice<T>, RetT>, xs: Slice<T>): RetT => {
    const parts = uncons(xs);
    if (!parts) return;
    const [head, tail]: [T, Slice<T>] = parts;
    return reduce(op, head as unknown as RetT, tail) as RetT;
  },

  /**
   * A variant of `foldl` except that this one doesn't require the starting point.  The starting point/value will be pulled
   * out from a copy of the container.
   */
  foldl1 = curry($fold1) as CurryOf2<ReduceOp<any, Slice<any>, any>, Slice<any>, any>

;
