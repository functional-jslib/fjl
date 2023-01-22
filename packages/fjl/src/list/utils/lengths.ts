import {map} from "../map";
import {length} from "../length";
import {NumberIndexable} from "../../types";

export const

  /**
   * Returns length of all passed in lists in list.
   */
  lengths = (...lists: NumberIndexable[]): number[] => map(length, lists)

;
