export const
  /**
   * The inits function returns all initial segments of the argument (shortest first).  For example:
   *
   * ```
   * shallowEquals(inits('abc'), ['','a','ab','abc'])
   * ```
   */
  inits = (xs: any): any[] => {
    const limit = xs.length,
      agg = [];
    let ind = 0;
    if (!limit) {
      return [];
    }
    for (; ind <= limit; ind += 1) {
      agg.push(xs.slice(0, ind));
    }
    return agg;
  };
