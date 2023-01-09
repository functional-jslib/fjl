export type OrderingFunc<T> = (a: T, b: T) => number;

export const

  /**
   * Generic ascending ordering func.
   */
  genericAscOrdering = <T>(a: T, b: T): number => {
    if (a > b) return 1;
    return a < b ? -1 : 0;
  },

  /**
   * Generic 'ascending order' ordering function (same type as function used in `[].sort` etc.).
   */
  $genericAscOrdering = <T>(a: T) =>
    (b: T): number => genericAscOrdering(a, b)

;
