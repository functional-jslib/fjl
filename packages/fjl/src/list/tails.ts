export const

  /**
   * Returns all tail segments of the argument, including the argument;  E.g.,
   * ```
   * shallowEquals(tails('abc'), ['abc', 'bc', 'c',''])
   * ```
   */
  tails = (xs: string | any[]): any[] => {
    const limit = xs.length;
    if (!limit) {
      return [xs.slice(0, 0)];
    }
    const agg = [];
    for (let ind = 0; ind <= limit; ind += 1) {
      agg.push(xs.slice(ind, limit));
    }
    return agg;
  };
