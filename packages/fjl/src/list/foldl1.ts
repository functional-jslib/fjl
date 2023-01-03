import {uncons} from "./uncons";
import {reduce} from "./utils/reduce";
import {ReduceOp, Slice} from "../types";

export const

  /**
   * A variant of `foldl` except without requiring the starting point value.  The starting point/value gets referenced internally (slice's first value) by the method.
   */
  foldl1 = <T>(op: ReduceOp, xs: Slice<T>): ReturnType<typeof op> => {
    const parts = uncons(xs);
    if (!parts) return;
    const [_head, _tail] = parts;
    return reduce(op, _head, _tail);
  },

  $foldl1 = <T>(op: ReduceOp) =>
    (xs: Slice<T>): ReturnType<typeof op> => foldl1(op, xs)

;
