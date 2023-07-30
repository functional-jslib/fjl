import {reduce} from "./utils/reduce";
import {toShortest} from "./utils/toShortest";
import {push} from "./push";
import {map} from "./map";

/**
 * zipN takes one or more lists and returns a list containing lists of all indices
 * at a given index, index by index.
 * If one input list is short, excess elements of the longer list are discarded.
 */
export const zipN = <T = any>(...lists: T[][]): T[][] => {
    const trimmedLists = toShortest(...lists);
    return reduce((agg, _item, ind) =>
        push(map(xs => xs[ind], trimmedLists), agg),
      [], trimmedLists[0]);
  },

  $zipN = <T = any>(arr1: T[]) =>
    (...lists: T[][]): T[][] =>
      zipN(arr1, ...lists)

;
