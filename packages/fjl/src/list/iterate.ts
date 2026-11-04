import {Unary} from "../types";

/**
 * Generator that infinitely yields `x`, `op(x)`, `op(op(x))`, etc.;  Same items as
 * Haskell's `iterate`.
 *
 * ```javascript
 * const addOne = (a) => a + 1;
 *
 * take(3, iterate(addOne, 5)); // [5, 6, 7]
 *
 * for (const x of iterate(addOne, 5)) {
 *   if (x > 10) break;
 *   console.log(x); // 5, 6, ..., 10
 * }
 * ```
 *
 * @note `op` runs when the next item is pulled, so this is closer to Haskell's
 *  `iterate'` than its `iterate`, which defers each call until the value is needed.
 * @note Differs from Haskell in that the result is a single-use generator, not a
 *  list:  Only iterable-consuming methods (`take`, `takeWhile`, `for...of`, etc.)
 *  accept it, and it can only be consumed once.
 */
export function* iterate<T>(op: Unary<T>, x: T): Generator<T, void> {
  let current = x;
  while (true) {
    yield current;
    current = op(current);
  }
}

/**
 * Curried version of `iterate`.
 */
export const $iterate = <T>(op: Unary<T>) => (x: T) => iterate(op, x);
