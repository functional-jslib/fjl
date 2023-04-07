import {lengths} from "./lengths";
import {map} from "../map";
import {sliceTo} from "./sliceTo";
import {sliceCopy} from "./sliceCopy";
import {NumberIndexable} from "../../types";

export const

  /**
   * Trims all list lengths to shortest in `lists`.
   */
  toShortest = <T>(...lists: NumberIndexable<T>[]): NumberIndexable<T>[] => {
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
  $toShortest = <T>(list1: NumberIndexable<T>) =>
    (list2: NumberIndexable<T>, ...lists: NumberIndexable<T>[]): NumberIndexable<T>[] => toShortest(list1, list2, ...lists)

;
