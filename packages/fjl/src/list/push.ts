import {curry2} from "../function/curry";

export const

  $push = <T>(x: T, xs: T[]): T[] => {
    xs.push(x);
    return xs
  },

  /**
   * Pushes an item onto an array.
   * @curried - Curried upto `2` items.
   */
  push = curry2($push);
