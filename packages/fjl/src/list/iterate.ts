import {Unary} from "../types";

export const

  /**
   * Generator that yields a list of `x` and the result of calling `f` on previous result appended to list; E.g.,
   *
   * ```javascript
   *   const addOne = (a) => a + 1;
   *   const startValue = 5;
   *   const generator = iterate(addOne, startValue);
   *
   *   // Loop through 5 iterations
   *   for (const x of generator) {
   *     if (x > 10) break;
   *     console.log(x); // 5,
   *     // ...          // 6,
   *     // ...          // ...
   *     // ...          // 10
   *   }
   * ```
   */
  iterate = function* iterate<T>(op: Unary<T>, x: T): Generator<T[], void> {
    let lastX = x;
    const out = [];
    while (true) {
      out.push(lastX);
      yield out;
      lastX = op(lastX);
    }
  }
;

