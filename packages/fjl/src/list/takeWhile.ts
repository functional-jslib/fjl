import {TernaryPred} from "../types";
import {instanceOf} from "../_platform";

export const

  /**
   * Returns items upto point where predicate doesn't hold.
   * For string type returns a string.
   */
  takeWhile = <T>(pred: TernaryPred, xs: Iterable<T>): typeof xs | T[] => {
    let i = 0;
    const out = [];
    for (const x of xs) {
      if (!pred(x, i, xs)) break;
      out.push(x);
      i += 1;
    }
    return instanceOf(xs, String) ? out.join('') as typeof xs : out;
  },

  $takeWhile = <T>(pred: TernaryPred) =>
    (xs: Iterable<T>): typeof xs | T[] =>
      takeWhile(pred, xs);
