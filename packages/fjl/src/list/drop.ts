import {instanceOfSome} from "../object";

export const

  /**
   * Drops `n` items from start of iterable and returns a corresponding list (
   *  string (if iterable is a string), or array).
   */
  drop = <T = any>(n: number, xs: Iterable<T>): typeof xs | T[] => {
    if (instanceOfSome(xs, String, Array))
      return (xs as (string | T[])).slice(n) as typeof xs;

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
    (xs: Iterable<T>): typeof xs | T[] => drop(n, xs)

;
