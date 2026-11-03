import {concat} from "./concat";
import {map} from "./map";
import type {Ternary} from "../types";

export const

  /**
   * Maps a function over a list, and flattens the results by one level.  `fn` should return a
   * list (array or string).
   *
   * ```javascript
   * concatMap(x => [x, x], [1, 2]); // [1, 1, 2, 2]
   * concatMap(x => x + x, ['a', 'b']); // 'aabb'
   * concatMap(x => [x], []); // []
   * ```
   */
  concatMap = <T = any, RetT extends string | any[] = any[]>(
    fn: Ternary<T, number, T[], RetT>,
    xs: T[]
  ): RetT => {
    const mapped = map(fn, xs) as RetT[];
    return mapped.length ? concat(mapped) : [] as unknown as RetT;
  },

  /**
   * Curried version of `concatMap`.
   */
  $concatMap = <T = any, RetT extends string | any[] = any[]>(
    fn: Ternary<T, number, T[], RetT>
  ) =>
    (xs: T[]): RetT =>
      concatMap(fn, xs)

;
