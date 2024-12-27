/**
 * Returns the first `n` items from an iterable (e.g., string, array, generator, etc.).
 */
export const take = <T>(n: number, xs: Iterable<any>): T[] => {
    const out = [] as T[];
    let count = Math.abs(n);
    for (const x of xs) {
      if (count-- === 0) break;
      out.push(x);
    }
    return out;
  },

  /**
   * Curried version of `take`.
   */
  $take = <T>(n: number) => (xs: Iterable<T>): T[] => take(n, xs);
