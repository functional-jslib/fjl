import {toShortest} from "./utils";
import {map} from "./map";
import {Nary} from "../types";

export const
  /**
   * Zips all given lists using tupling function.
   */
  zipWithN = <T = any>(op: Nary<T, T[]>, ...lists: T[][]): T[][] => {
    const trimmedLists = toShortest(...lists) as T[][],
      lenOfTrimmed = trimmedLists.length;
    if (!lenOfTrimmed) {
      return [];
    } else if (lenOfTrimmed === 1) {
      return [trimmedLists[0]];
    }
    return map((_item, ind) =>
        op(...map(xs => xs[ind], trimmedLists)),
      trimmedLists[0]
    );
  },

  $zipWithN = <T = any>(op: Nary<T, T[]>) =>
    (...lists: T[][]): T[][] =>
      zipWithN(op, ...lists);

