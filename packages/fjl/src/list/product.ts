import {foldl} from "./foldl";

export const
  /**
   * Computes the product of the numbers of a structure.
   */
  product = (xs: number[]): number =>
    foldl((agg: number, x: number) => agg * x, 1, xs);
