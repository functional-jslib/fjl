export const

  /**
   * Returns a list containing `x` repeated `n` number of times.
   */
  replicate = <T>(n: number, x: T): T[] => Array(n).fill(x, 0, n),

  /**
   * Curried version of `replicate`.
   */
  $replicate = <T>(n: number) => (x: T): T[] => replicate(n, x)
;
