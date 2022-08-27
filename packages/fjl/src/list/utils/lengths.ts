import {map} from "../map";
import {length} from "../length";

export const

  /**
   * Returns length of all passed in lists in list.
   */
  lengths = (...lists): number[] => map(length, lists)

;
