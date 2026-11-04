/**
 * Generator that infinitely yields the items of `xs`, in order;  Same items as
 * Haskell's `cycle`.  Strings are walked by code point.
 *
 * ```javascript
 * take(5, cycle([1, 2])); // [1, 2, 1, 2, 1]
 * take(3, cycle('ab'));   // ['a', 'b', 'a']
 * take(1, cycle([]));     // throws
 * take(0, cycle([]));     // []
 * ```
 *
 * @note Arrays are copied on first pull, so later changes to them aren't seen.
 *  Other iterables are buffered as they're read, so an infinite one is yielded as
 *  is (and the buffer keeps growing).
 * @note Differs from Haskell in that the result is a single-use generator, not a
 *  list:  Only iterable-consuming methods (`take`, `takeWhile`, `for...of`, etc.)
 *  accept it, and it can only be consumed once.
 * @throws {Error} - On first pull, if `xs` is empty - as Haskell's raises when forced.
 */
export function* cycle<T = any>(xs: Iterable<T>): Generator<T, void> {
  const source = Array.isArray(xs) ? xs.slice(0) : xs,
    seen = [] as T[];

  for (const x of source) {
    seen.push(x);
    yield x;
  }

  if (!seen.length) {
    throw new Error('`cycle` expected a non-empty list.  Received an empty one.');
  }

  while (true) {
    for (const x of seen) {
      yield x;
    }
  }
}
