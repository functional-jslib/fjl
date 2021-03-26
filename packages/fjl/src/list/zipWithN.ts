import {curry3} from "../function/curry";
import {length} from "./length";
import {toShortest} from "./utils";
import {map} from "./map";
import {$sliceTo} from "./utils/sliceTo";

export const
  /**
   * Zips all given lists with tupling function. Note: Haskell types do not have
   *  a way (that I know of) to show one or more for params in a function so `@haskellType` below
   *  is left there for general purpose not for exactness as is told by aforementioned.
   * @haskellType `zipWithN :: (a -> b -> c) -> [a] -> [b] -> [c]` - Where `N` is the number
   *  of lists to zip.
   */
  zipWithN = (op, ...lists) => {
    const trimmedLists = toShortest(...lists),
      lenOfTrimmed = length(trimmedLists);
    if (!lenOfTrimmed) {
      return [];
    } else if (lenOfTrimmed === 1) {
      return $sliceTo(length(trimmedLists[0]), trimmedLists[0]);
    }
    return map((item, ind) =>
        op(...map(xs => xs[ind], trimmedLists)),
      trimmedLists[0]
    );
  },

  $zipWithN = curry3(zipWithN);

