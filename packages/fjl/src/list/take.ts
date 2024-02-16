/**
 * Returns the first `n` items from an iterable (e.g., string, array, generator, etc.).
 * **Note:** string type is returned for strings, array type otherwise.
 */
export const take = <T>(n: number, xs: Iterable<T>): Iterable<T> => {
    if (typeof xs === 'string' || Array.isArray(xs))
      return xs.slice(0, n);

    const out = [] as T[];
    for (const x of xs) {
      if (n-- === 0) break;
      out.push(x);
    }
    return out;
  },

  /**
   * Curried version of `take`.
   */
  $take = <T>(n: number) =>
    (xs: Iterable<T> | Generator<T>): Iterable<T> => take(n, xs);
