import {curry2} from "../function";

export const

  /**
   * Pushes one or more items onto `xs`.  Returns `xs.
   */
  pushN = <T>(xs: T[], ..._xs: T[]): T[] => {
    const len = xs.length;
    for (let i = 0; i < len; i += 1) {
      xs[len + i] = _xs[i];
    }
    return xs;
  },

  /**
   * Same as `$pushN` but curried.
   * @curried
   */
  $pushN = curry2(pushN);
