import {uncons} from "./uncons";
import {reduce} from "./utils/reduce";
import {ReduceOp} from "../types";

export const

  /**
   * A variant of `foldl` except that this one doesn't require the starting point value.  The starting point/value will be pulled
   * out from a copy of the container.
   */
  foldl1 = <T>(op: ReduceOp<T, T[], T>, xs: T[]): T => {
    const parts = uncons(xs);
    if (!parts) return;
    const [_head, _tail]: [T, T[]] = parts;
    return reduce(op, _head, _tail);
  },

  $foldl1 = <T>(op: ReduceOp<T, T[], T>) =>
    (xs: T[]): T => foldl1(op, xs)

;
