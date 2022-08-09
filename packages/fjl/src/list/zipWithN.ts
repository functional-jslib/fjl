import {toShortest} from "./utils";
import {map} from "./map";
import {Slice} from "../types";

export const
  /**
   * Zips all given lists with tupling function. Note: Haskell types do not have
   *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
   *  is left there for general purpose not for exactness as is told by aforementioned.
   * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
   *  of lists to zip.
   */
  zipWithN = <T = any>(op, ...lists: T[][]): Slice<T>[] => {
    const trimmedLists = toShortest(...lists) as Slice<T>[],
      lenOfTrimmed = trimmedLists.length;
    if (!lenOfTrimmed) {
      return [];
    } else if (lenOfTrimmed === 1) {
      return [trimmedLists[0]];
    }
    return map((item, ind) =>
        op(...map(xs => xs[ind], trimmedLists)),
      trimmedLists[0]
    );
  },

  $zipWithN = <T = any>(op) =>
    (...lists: T[][]): Slice<T>[] =>
      zipWithN(op, ...lists);

