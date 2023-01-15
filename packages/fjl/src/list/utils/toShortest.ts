import {lengths} from "./lengths";
import {map} from "../map";
import {sliceTo} from "./sliceTo";
import {sliceCopy} from "./sliceCopy";

export const

  /**
   * Trims all list lengths to shortest in `lists`.
   */
  toShortest = <XS extends string | any[]>(...lists: XS[]): XS[] => {
    const listLengths = lengths(...lists),
      smallLen = Math.min(...listLengths);
    return map((list: any[], ind) => listLengths[ind] > smallLen ?
      sliceTo(smallLen, list) : sliceCopy(list), lists);
  },

  /**
   * Returns a list of lists trimmed to the shortest length in given list of lists.
   * @background This method is used by the `zip*` functions to achieve their
   *  'slice to smallest' functionality.
   * @curried Up-to two params.
   */
  $toShortest = <XS extends string | any[]>(list1: XS) =>
    (list2: XS, ...lists: XS[]): XS[] => toShortest(list1, list2, ...lists)

;
