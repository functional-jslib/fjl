import {curry2} from "../function/curry";

export const

  $push = <T>(x: T, xs: T[]): T[] => (xs.push(x), xs),

  /**
   * Pushes an item onto an array.
   * @curried - Curried upto `2` items.
   */
  push = curry2($push),

  /**
   * Pushes one or more items onto `xs`.  Returns `xs.
   */
  $pushN =  <T>(xs: T[], ..._xs: T[]): T[] => (xs.push(..._xs), xs),

  /**
   * Same as `$pushN` but curried.
   * @curried
   */
  pushN = curry2($pushN);
