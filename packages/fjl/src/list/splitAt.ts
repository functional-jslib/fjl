export const

  /**
   * Splits slice-able in two at given position (exclusive (includes element/character at
   * given index in second part of returned list)).
   *
   * @todo Slicing here should be inclusive (on the left).
   */
  splitAt = (ind: number, sliceable): [typeof sliceable, typeof sliceable] =>
    [sliceable.slice(0, ind), sliceable.slice(ind)],

  $splitAt = (ind: number) =>
    (sliceable): [typeof sliceable, typeof sliceable] =>
      splitAt(ind, sliceable);
