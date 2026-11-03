export type ScanrOp<A = any, B = any> = (a: A, b: B, i?: number, xs?: A[]) => B;

export const

  /**
   * Same as `scanl` but from the right (similar to `foldr`'s relationship to 'foldl').
   * Note also `scanr`'s relationship ot `foldr`:
   * `head (scanr(fn, z, xs)) === foldr(fn, z, xs).
   */
  scanr = <A, B>(fn: ScanrOp<A, B>, zero: B, xs: A[]): B[] => {
    const limit = xs.length,
      out = new Array(limit + 1) as B[];
    let ind = limit - 1,
      result = zero;
    out[limit] = zero;
    while (ind > -1) {
      result = fn(xs[ind] as A, result, ind, xs);
      out[ind] = result;
      ind--;
    }
    return out;
  },

  $scanr = <A, B>(fn: ScanrOp<A, B>) =>
    (zero: B) =>
      (xs: A[]): B[] => scanr(fn, zero, xs);
