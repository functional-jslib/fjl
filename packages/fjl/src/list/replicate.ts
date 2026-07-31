export const

  /**
   * Returns a list containing `x` repeated `n` number of times.
   *
   * @note Eager;  For the lazy variant @see `replicateIter`.
   */
  replicate = <T>(n: number, x: T): T[] => Array(n).fill(x, 0, n),

  /**
   * Curried version of `replicate`.
   */
  $replicate = <T>(n: number) => (x: T): T[] => replicate(n, x)
;

/**
 * Generator that yields each successive prefix of `replicate(n, x)` - the bounded
 * form of `repeat`;  Yields `n` times, then completes (`replicateIter(n, x)` is to
 * `repeat(x)` what `take(n, xs)` is to `xs`).
 *
 * ```javascript
 * const gen = replicateIter(3, 'a');
 * console.log(gen.next().value);  // ['a']
 * console.log(gen.next().value);  // ['a', 'a']
 * console.log(gen.next().value);  // ['a', 'a', 'a']
 * console.log(gen.next().done);   // true
 * ```
 *
 * @note The last value yielded is (deep) equal to `replicate(n, x)`.
 * @note As with `iterate`, and `repeat`, the yielded list is the same, growing,
 *  list reference on every iteration - `slice` it when a snapshot is required.
 * @note `n` of `Infinity` gives `repeat(x)`;  `n` of `0` (or less) yields nothing.
 */
export function* replicateIter<T>(n: number, x: T): Generator<T[], void> {
  const out = [] as T[];

  for (let i = 0; i < n; i += 1) {
    out.push(x);
    yield out;
  }
}

/**
 * Curried version of `replicateIter`.
 */
export const $replicateIter = <T>(n: number) =>
  (x: T): Generator<T[], void> => replicateIter(n, x);
