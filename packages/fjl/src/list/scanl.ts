import {length} from "./length";

export type ScanlOp<A, B> = (b: B, a: A, i?: number, xs?: A[]) => B

export const

  /**
   * scanl is similar to foldl, but returns a list of successive reduced values from the left:
   * ```
   * scanl f z [x1, x2, ...] == [z, z `f` x1, (z `f` x1) `f` x2, ...]
   * ```
   * Also note that:
   * ```
   * last (scanl f z xs) == foldl f z xs.
   * ```
   */
  scanl = <A, B>(fn: ScanlOp<A, B>, zero: B, xs: A[]): B[] => {
    if (!xs || !length(xs)) {
      return [];
    }
    const limit = length(xs);
    let ind = 0,
      result = zero;
    const out = [] as B[];
    while (ind < limit) {
      result = fn(result, xs[ind] as A, ind, xs);
      out.push(result);
      ind++;
    }
    return out;
  },

  $scanl = <A, B>(fn: ScanlOp<A, B>) =>
    (zero: B) =>
      (xs: A[]): B[] => scanl(fn, zero, xs);
