import {lengths} from "./lengths";
import {map} from "../map";
import {sliceTo} from "./sliceTo";
import {sliceCopy} from "./sliceCopy";
import {Slice} from "../../types";

export const

  /**
   * Trims all lists to shortest in `lists`.
   */
  toShortest = <T>(...lists: Slice<T>[]): Slice<T>[] => {
    const listLengths = lengths(...lists),
      smallLen = Math.min(...listLengths);
    return map((list: any[], ind) => listLengths[ind] > smallLen ?
      sliceTo(smallLen, list) : sliceCopy(list), lists);
  },

  /**
   * Returns a list of lists trimmed to the shortest length in given list of lists.
   * @background This method is used by the `zip*` functions to achieve their
   *  'slice to smallest' functionality.
   * @curried Upto two.
   */
  $toShortest = <T>(list1: Slice<T>) =>
    (list2: Slice<T>, ...lists: Slice<T>[]): Slice<T>[] => toShortest(list1, list2, ...lists)

;
