export const

  push = <T>(x: T, xs: T[]): T[] => {
    xs[xs.length] = x;
    return xs
  },

  /**
   * Pushes an item onto an array.
   */
  $push = <T>(x: T) => (xs: T[]): T[] => push(x, xs);
