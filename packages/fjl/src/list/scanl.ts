export type ScanlOp<A = any, B = any, Fnctr = any> = (b: B, a: A, i?: number, xs?: Fnctr) => B

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
    const limit = xs.length,
      out = [] as B[];
    let ind = 0,
      result = zero;
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

export type Scanl = typeof scanl;
