import {curry} from "../function/curry";
import {$removeBy} from "./removeBy";
import {Slice} from "../types";

export const

  $remove = <T>(x: T, list: Slice<T>): Slice<T> =>
    $removeBy((a, b) => a === b, x, list),

  /**
   * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
   * For example, `remove('a', 'banana') === 'bnana';`
   */
  remove = curry($remove);
