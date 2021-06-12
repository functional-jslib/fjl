import {foldl} from "./foldl";
import {of} from "../object";

export const

  /**
   * Computes the sum of the numbers of a structure.
   */
  sum = <T extends number>(list: T[]): T => {
    const zero = !list || !list.length ? 0 : of(list[0]);
    return foldl((agg: T, x: T) => agg + x, zero, list) as T;
  }
