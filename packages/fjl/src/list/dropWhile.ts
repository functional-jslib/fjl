import {findIndexWhere} from "./utils";
import {PredForArray} from "../types";

export const

  /**
   * Returns a list without elements that match predicate.
   */
  dropWhile = <T>(p: PredForArray<T>, xs: T[]): T[] => {
    const limit = xs.length,
      splitPoint: number =
        findIndexWhere(
          (x, i, xs) => !p(x, i, xs),
          xs
        );
    return splitPoint === -1 ? xs.slice(limit) :
      xs.slice(splitPoint, limit);
  },

  $dropWhile = <T>(p: PredForArray<T>) =>
    (xs: T[]): T[] => dropWhile(p, xs)

;
