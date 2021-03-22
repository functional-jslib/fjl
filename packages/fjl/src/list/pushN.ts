import {curry2} from "../function";

export const

  /**
   * Pushes one or more items onto `xs`.  Returns `xs.
   */
  $pushN = <T>(xs: T[], ..._xs: T[]): T[] => {
    xs.push(..._xs);
    return xs;
  },

  /**
   * Same as `$pushN` but curried.
   * @curried
   */
  pushN = curry2($pushN);
