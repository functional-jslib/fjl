import {findIndexWhere} from "./utils";
import {TernaryPred} from "../types";

export const

  /**
   * Returns a list without elements that match predicate.
   */
  dropWhile = <T>(p: TernaryPred, xs: string | T[]): typeof xs => {
    const limit = xs.length,
      splitPoint: number = findIndexWhere(
        (x, i, xs) => !p(x, i, xs),
        xs
      );
    return splitPoint === -1 ? xs.slice(limit) :
      xs.slice(splitPoint, limit);
  },

  $dropWhile = <T>(p: TernaryPred) =>
    (xs: string | T[]): typeof xs =>
      dropWhile(p, xs)

;
