import {reduce} from "./utils";


/**
 * Returns the difference of between two arrays.
 *
 * @reference https://mathworld.wolfram.com/SetDifference.html
 */
export const difference = <T>(
    xs1: T[],
    xs2: T[]
  ): T[] => reduce((agg, elm) =>
      !xs2.includes(elm) ? (agg.push(elm), agg) : agg
    , xs1.slice(0, 0), xs1),

  /**
   * Curried version of `$difference`.
   */
  $difference = <T>(xs1: T[]) => (xs2: T[]): T[] =>
      difference(xs1, xs2);
