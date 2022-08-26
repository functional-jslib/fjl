import {removeBy} from "./removeBy";

export const

  remove = <T>(x: T, list: T[]): T[] =>
    removeBy((a, b) => a === b, x, list),

  /**
   * `remove(x, xs)` removes the first occurrence of `x` from `xs`.
   * For example, `remove('a', 'banana') === 'bnana';`
   */
  $remove = <T>(x: T) =>
    (list: T[]): T[] =>
      remove(x, list)
