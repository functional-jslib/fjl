import {length} from "./length";
import {unfoldr} from "./unfoldr";
import {foldl} from "./foldl";

export const
  /**
   * unzip transforms a list of pairs into a list of first components and a list of second components.
   * @sudoHaskellType `unzipN :: [(a, b, ...x)] -> ([a], [b], ...[x])`
   * @function module:list.unzipN
   * @param list {Array|*} - ListLike of tuples (lists).
   * @returns {Array|*}
   */
  unzipN = <T>(list: T[][]): T[][] => {
    if (!list) {
      throw new Error(`\`unzipN\` expects a value.  Received ${JSON.stringify(list)}`);
    }
    if (!length(list)) {
      return [];
    }
    const lenItem0 = length(list[0]),
      zero = (lenItem0 ?
        unfoldr(numLists => numLists-- ? [[], numLists] : undefined, lenItem0) :
        []) as T[][]
    ;
    return foldl((agg, item) => {
      agg.forEach((outList, ind) => outList.push(item[ind]));
      return agg;
    }, zero, list);
  };
