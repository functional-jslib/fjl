import {Slice} from "../types";
import {instanceOfSome} from "../object";

export const

  /**
   * Drops `n` items from start of list.
   *
   * **Note:** Returns `string` type for strings, and `Array` type otherwise.
   */
  drop = <T = any>(n: number, xs: Slice<T> | Iterable<T>): typeof xs | T[] => {
    if (instanceOfSome(xs, String, Array))
      return (xs as (string | T[])).slice(n);

    const out = [] as T[];
    for (const x of xs) {
      if (n-- > 0) continue;
      out.push(x as T);
    }
    return out;
  },

  /**
   * Curried version of `drop`.
   *
   * @curried
   */
  $drop = <T = any>(n: number) =>
    (xs: Slice<T> | Iterable<T>): typeof xs | T[] => drop(n, xs)

;
