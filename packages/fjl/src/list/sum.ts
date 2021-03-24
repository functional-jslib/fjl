import {foldl} from "./foldl";

export const

  /**
   * Computes the sum of the numbers of a structure.
   */
  sum = (list: number[]) => foldl((agg: number, x: number) => agg + x, 0, list);
