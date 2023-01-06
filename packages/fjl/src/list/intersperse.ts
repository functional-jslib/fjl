export const

  /**
   * Takes an element and a list and `intersperses' that element between the
   *  elements of the list.
   */
  intersperse = <T = any, TS extends any[] = any[]>(between: T, xs: TS): any[] => {
    const limit = xs.length,
      out = [];
    if (!limit) return out;
    const lastInd = limit - 1;
    for (let i = 0; i < limit; i += 1) {
      if (i === lastInd) out.push(xs[i])
      else out.push(xs[i], between);
    }
    return out;
  },

  $intersperse = <T = any, TS extends any[] = any[]>(between: T) =>
    (xs: TS): any[] => intersperse(between, xs)

;
