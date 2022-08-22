import {Slice} from "../types";

export const

  /**
   * Splits `x` in two at given `index` (exclusive (includes element/character at
   * given index in second part of returned list)).
   */
  splitAt = <T, XS extends Slice<T>>(ind: number, list: XS): [XS, XS] =>
    [list.slice(0, ind), list.slice(ind)],

  $splitAt = <T, XS extends Slice<T>>(ind: number) =>
    (list: XS): [XS, XS] =>
      splitAt(ind, list);
