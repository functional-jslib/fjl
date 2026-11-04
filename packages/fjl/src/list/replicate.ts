export const

  /**
   * Returns a list containing `x` repeated `n` number of times.
   *
   * @note Eager;  For the lazy variant @see `replicateIter`.
   */
  replicate = <T>(n: number, x: T): T[] => n < 0 ? [] : Array(n).fill(x, 0, n),

  /**
   * Curried version of `replicate`.
   */
  $replicate = <T>(n: number) => (x: T): T[] => replicate(n, x)
;

/**
 * Generator that yields the items of `replicate(n, x)` - the bounded form of `repeat`;
 * Yields `x`, `n` times, then completes.
 *
 * ```javascript
 * [...replicateIter(3, 'a'); // ['a', 'a', 'a']
 * ```
 *
 * @note `n` of `Infinity` gives `repeat(x)`;  `n` of `0` (or less) yields nothing.
 */
export function* replicateIter<T>(n: number, x: T): Generator<T, void> {
  for (let i = 0; i < n; i += 1) {
    yield x;
  }
}

/**
 * Curried version of `replicateIter`.
 */
export const $replicateIter = <T>(n: number) =>
  (x: T): Generator<T, void> => replicateIter(n, x);
