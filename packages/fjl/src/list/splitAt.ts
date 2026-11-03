export const

  /**
   * Splits slice-able in two at given position (exclusive (includes element/character at
   * given index in second part of returned list)).
   *
   * @todo Slicing here should be inclusive (on the left).
   */
  splitAt = <TS extends string | any[]>(ind: number, sliceable: TS): [TS, TS] =>
    [sliceable.slice(0, ind) as TS, sliceable.slice(ind) as TS],

  $splitAt = (ind: number) =>
    <TS extends string | any[]>(sliceable: TS): [TS, TS] =>
      splitAt(ind, sliceable);
