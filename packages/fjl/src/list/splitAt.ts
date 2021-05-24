import {sliceFrom} from "./utils/sliceFrom";
import {sliceTo} from "./utils/sliceTo";
import {Slice} from "../types/data";
import {curry} from "../function";

export const

  /**
   * Splits `x` in two at given `index` (exclusive (includes element/character at
   * given index in second part of returned list)).
   */
  splitAt = <T>(ind: number, list: Slice<T>): [Slice<T>, Slice<T>] =>
    [sliceTo(ind, list), sliceFrom(ind, list)],

  $splitAt = curry(splitAt);
