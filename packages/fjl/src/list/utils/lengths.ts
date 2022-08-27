import {map} from "../map";
import {length} from "../length";
import {Slice} from "../../types";

export const

  /**
   * Returns length of all passed in lists in list.
   */
  lengths = <T>(...lists: Slice<T>[]): number[] => map(length, lists)

;
