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
   * Curried version of `$pushN`.
   */
  $pushN = <T>(xs: T[]) =>
    (xs2: T, ..._xs: T[]): T[] =>
      pushN(xs, xs2, ..._xs)
