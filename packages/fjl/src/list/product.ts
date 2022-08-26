import {foldl} from "./foldl";
import {NumberIndexable, Slice} from "../types";

export const
  /**
   * Computes the product of the numbers of a structure.
   */
  product = (xs: NumberIndexable<number>): number =>
    foldl((agg: number, x: number) => agg * x, 1, xs as Slice<number>);
