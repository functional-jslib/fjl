export const

  /**
   * Splits `x` in two at given `index` (exclusive (includes element/character at
   * given index in second part of returned list)).
   */
  splitAt = (ind: number, sliceable): [any, any] =>
    [sliceable.slice(0, ind), sliceable.slice(ind)],

  $splitAt = (ind: number) =>
    (sliceable): [any, any] =>
      splitAt(ind, sliceable);
