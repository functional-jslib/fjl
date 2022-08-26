export const

  /**
   * Takes an element and a list and `intersperses' that element between the
   *  elements of the list.
   */
  intersperse = <T, TS extends T[]>(between: T, xs: TS): T[] => {
    if (!xs || !xs.length) {
      return [];
    }
    const limit = xs.length,
      lastInd = limit - 1;
    let i = 0;
    const out = [] as T[];
    for (; i < limit; i += 1) {
      if (i === lastInd) {
        out.push(xs[i] as T);
      } else {
        out.push(xs[i] as T, between);
      }
    }
    return out;
  },

  $intersperse = <T, TS extends T[]>(between: T) =>
    (xs: TS): T[] => intersperse(between, xs)

;
