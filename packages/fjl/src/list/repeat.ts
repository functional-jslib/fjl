import {curry2} from "../function/curry";
import {iterate} from "./iterate";
import {Slice} from "../platform";

export const

  $repeat = <T>(n: number, x: T): Slice<T> =>
    (n <= 0 ? [] : iterate(n, a => a, x)) as Slice<T>,

  /**
   * Repeats `x` `limit` number of times.
   */
  repeat = curry2($repeat);
