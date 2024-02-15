import {Unary} from "../types";

/**
 * Generator that yields a list of `x` and the result of calling `f` on previous result appended to list; E.g.,
 *
 * ```javascript
 * const addOne = (a) => a + 1;
 * const startValue = 5;
 *
 * // Inline
 * // ----
 * const gen = iterate(addOne, startValue);
 * console.log(gen.next().value); // [5]
 * console.log(gen.next().value); // [5, 6]
 * // ...
 *
 * // In loop
 * // ----
 * // Loop through 5 iterations
 * for (const x of iterate(addOne, startValue)) {
 *   if (x > 10) break;
 *   console.log(x); // [5],
 *   // ...          // [5, 6],
 *   // ...          // ...
 *   // ...          // [5, 6, ..., 10]
 * }
 * ```
 */
export function* iterate<T>(op: Unary<T>, x: T): Generator<T[], void> {
  let lastX = x;
  const out = [lastX];
  while (true) {
    yield out;
    lastX = op(lastX);
    out.push(lastX);
  }
}

