import {Slice} from "../types";

/**
 * Generator that appends given list onto a copy of said list, infinitely;  E.g., Identity on infinite lists.
 *
 * ```javascript
 * const nums = [1, 2, 3];
 *
 * for (const xs of cycle(nums)) {
 *   console.log(xs);
 * }
 *
 * // Output:
 * // ----
 * // [1, 2, 3]
 * // [1, 2, 3, 1, 2, 3]
 * // [1, 2, 3, 1, 2, 3, 1, 2, 3]
 * // ...
 */
export function* cycle<T = any, TS extends Slice<T> = Slice<T>>(xs: TS): Generator<TS, void> {
  let out = xs.slice(0) as TS;
  while (true) {
    yield out;
    // @ts-ignore - Assume `#.concat` returns same type as `xs` (e.g, `string`/`any[]` types etc.).
    out = out.concat(xs);
  }
}

