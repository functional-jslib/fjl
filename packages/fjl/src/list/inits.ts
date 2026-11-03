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
      agg: TS[] = [];
    if (limit === undefined) return agg;
    for (let ind = 0; ind <= limit; ind += 1) {
      agg.push(xs.slice(0, ind) as TS);
    }
    return agg;
  };
