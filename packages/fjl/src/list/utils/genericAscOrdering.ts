import {curry, CurryOf2} from "../../function/curry";

export type OrderingFunc<T> = (a: T, b: T) => number;

export const

  /**
   * Generic ascending ordering func.
   */
  genericAscOrdering = <T>(a: T, b: T): number => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  },

  /**
   * Generic 'ascending order' ordering function (same type as function used in `[].sort` etc.).
   */
  $genericAscOrdering = curry(genericAscOrdering) as CurryOf2<any, any, number>

;
