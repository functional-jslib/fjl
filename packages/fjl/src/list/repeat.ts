/**
 * Generator that infinitely yields `x`;  Same items as Haskell's `repeat`.
 *
 * ```javascript
 * take(3, repeat(0)); // [0, 0, 0]
 * ```
 *
 * @note Differs from Haskell in that the result is a single-use generator, not a
 *  list:  Only iterable-consuming methods (`take`, `takeWhile`, `for...of`, etc.)
 *  accept it, and it can only be consumed once.
 */
export function* repeat<T>(x: T): Generator<T, void> {
  while (true) {
    yield x;
  }
}
