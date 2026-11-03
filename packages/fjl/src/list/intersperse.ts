export const

  /**
   * Takes an element and a list and `intersperses' that element between the
   *  elements of the list.
   */
  intersperse = <T = any, B = T>(between: B, xs: T[]): (T | B)[] => {
    const limit = xs.length,
      out: (T | B)[] = [],
      lastInd = limit - 1;
    for (let i = 0; i < limit; i += 1) {
      if (i === lastInd) out.push(xs[i])
      else out.push(xs[i], between);
    }
    return out;
  },

  /**
   * Curried version of `intersperse`.
   */
  $intersperse = <T = any, B = T>(between: B) =>
    (xs: T[]): (T | B)[] => intersperse(between, xs)

;
