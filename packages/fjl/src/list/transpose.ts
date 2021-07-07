import {length} from "./length";
import {lengths} from "./utils";
import {filter} from "./filter";
import {maximum} from "./maximum";
import {Slice} from "../types";

export const

  /**
   * Transposes rows and columns into lists by index;  E.g.,
   * Haskell example:
   * ```
   *  transpose [[1,2,3],[4,5,6]] == [[1,4],[2,5],[3,6]]
   *
   *  -- Notice the shorter arrays are ignored after their last index is copied over:
   *  transpose [[10,11],[20],[],[30,31,32]] == [[10,20,30],[11,31],[32]]
   * ```
   * @note from columns to rows.
   * @note Empty lists are ignored.
   */
  transpose = <T>(xss: T[][]): T[][] => {
    const numLists = length(xss);
    let ind = 0, ind2;
    if (!numLists) {
      return [];
    }
    const listLengths = lengths(...xss),
      longestListLen = maximum(listLengths),
      outLists: T[][] = [];
    for (; ind < longestListLen; ind += 1) {
      const outList = [];
      for (ind2 = 0; ind2 < numLists; ind2 += 1) {
        if (listLengths[ind2] < ind + 1) {
          continue;
        }
        outList.push(xss[ind2][ind]);
      }
      outLists.push(outList);
    }
    return filter(x => length(x) > 0, outLists as Slice<T[]>) as unknown as T[][];
  };
