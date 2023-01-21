import {map} from "../map";
import {length} from "../length";
import {Lengthable} from "../../types";

export const

  /**
   * Returns length of all passed in lists in list.
   */
  lengths = (...lists: Lengthable[]): number[] => map(length, lists)

;
