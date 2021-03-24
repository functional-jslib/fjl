import {curry, CurryOf2} from "../function/curry";
import {$includes} from "../platform/slice";
import {filter} from "./filter";

export const

  /**
   * Performs an intersection on list 1 with  elements from list 2.
   */
  intersect = <T>(arr1: T[], arr2: T[]): T[] =>
    !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
      filter(elm => $includes(arr2, elm) as boolean, arr1) as T[],

  $intersect = curry(intersect) as CurryOf2<any[], any[], any[]>;
