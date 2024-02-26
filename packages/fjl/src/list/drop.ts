export const

  /**
   * Drops `n` items from start of iterable and returns an array containing the non-dropped items.
   */
  drop = <T = any>(n: number, xs: Iterable<T>): T[] => {
    const out = [] as T[];
    for (const x of xs) {
      if (n-- > 0) continue;
      out.push(x as T);
    }
    return out;
  },

  /**
   * Curried version of `drop`.
   *
   * @curried
   */
  $drop = <T = any>(n: number) =>
    (xs: Iterable<T>): T[] => drop(n, xs)

;
