import {reduce} from "./utils";

export const

  /**
   * Returns the difference of between two arrays.
   *
   * @reference https://mathworld.wolfram.com/SetDifference.html
   */
  difference = (xs1: any[], xs2: any[]): any[] => {
    if (!xs1 || !xs2) return (xs1 ?? xs2)?.slice(0);
    return reduce((agg, elm) =>
        !xs2.includes(elm) ? (agg.push(elm), agg) : agg
      , [], xs1);
  },

  /**
   * Curried version of `$difference`.
   */
  $difference = (xs1: any[]) =>
    (xs2: any[]): any[] =>
      difference(xs1, xs2);
