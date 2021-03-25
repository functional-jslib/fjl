import {curry, CurryOf2} from "../function/curry";
import {unconsr} from "./unconsr";
import {reduceRight} from "./utils/reduceRight";
import {ReduceOp} from "../platform";
import {Slice} from "../platform/slice";

export const

  /**
   * A variant of `foldr` except that this one doesn't require the starting point/value.  The starting point/value will be pulled
   * out from a copy of the container.
   */
  foldr1 = <T, T2>(op: ReduceOp<T, Slice<T>, T2>, xs: T[]): T2 => {
    const parts = unconsr(xs);
    return !parts ? [] : reduceRight(op, parts[1], parts[0]);
  },

  $foldr1 = curry(foldr1) as CurryOf2<ReduceOp<any, Slice<any>, any>, Slice<any>, any>

;
