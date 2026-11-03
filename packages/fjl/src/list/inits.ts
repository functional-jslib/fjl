export const
  /**
   * The inits function returns all initial segments of the argument (shortest first).  For example:
   *
   * ```
   * shallowEquals(inits('abc'), ['','a','ab','abc'])
   * ```
   */
  inits = <TS extends string | any[]>(xs: TS): TS[] => {
    const limit = xs?.length,
      agg = [];
    if (!limit) return agg;
    for (let ind = 0; ind <= limit; ind += 1) {
      agg.push(xs.slice(0, ind));
    }
    return agg;
  };
