/**
 * Returns the first `n` items from an iterable (e.g., string, array, generator, etc.).
 *
 * Pulls exactly `n` items, and none when `n` is `0` or less, so `xs` isn't read
 * further than needed - as with Haskell's `take`.
 *
 * @note Always returns an array, even for strings (Haskell's would return a string).
 */
export const take = <T>(n: number, xs: Iterable<T>): T[] => {
    const out = [] as T[];
    if (n <= 0) return out;
    for (const x of xs) {
      out.push(x);
      if (--n <= 0) break;
    }
    return out;
  },

  /**
   * Curried version of `take`.
   */
  $take = <T>(n: number) => (xs: Iterable<T>): T[] => take(n, xs);
