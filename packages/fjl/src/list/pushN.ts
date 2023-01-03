export const

  /**
   * Pushes one or more items onto `xs`.  Returns `xs.
   */
  pushN = <T>(xs: T[], ..._xs: T[]): T[] => {
    xs.push(..._xs);
    return xs;
  },

  /**
   * Curried version of `$pushN`.
   */
  $pushN = <T>(xs: T[]) =>
    (xs2: T, ..._xs: T[]): T[] =>
      pushN(xs, xs2, ..._xs)
