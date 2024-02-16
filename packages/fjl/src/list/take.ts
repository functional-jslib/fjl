import {Slice} from "../types";
import {instanceOfSome} from "../object";

/**
 * Returns the first `n` items from an iterable (e.g., string, array, generator, etc.).
 * **Note:** string type is returned for strings, array type otherwise.
 */
export const take = <T=any>(n: number, xs: Slice<T> | Iterable<T>): typeof xs | T[] => {
    if (instanceOfSome(xs, String, Array))
      return (xs as (string | T[])).slice(0, n);

    const out = [] as T[];
    for (const x of xs) {
      if (n-- === 0) break;
      out.push(x as T);
    }
    return out;
  },

  /**
   * Curried version of `take`.
   */
  $take = <T>(n: number) =>
    (xs: Slice<T> | Iterable<T>): typeof xs | T[] => take(n, xs);
