import {foldl} from "./foldl";
import {BinaryPred} from "../types";

export const

  /**
   * Returns the union on elements matching boolean check passed in.
   */
  unionBy = <T = any>(pred: BinaryPred<T[], T>, xs1: T[], xs2: T[]): T[] =>
    foldl((agg, x) => {
      if (pred(agg, x)) agg.push(x);
      return agg;
    }, xs1.slice(0), xs2),

  /**
   * Curried version of `unionBy`.
   */
  $unionBy = <T = any>(pred: BinaryPred<T[], T>) =>
    xs1 =>
      xs2 => unionBy(pred, xs1, xs2);

/**
 * `unionBy` method type.
 */
export type UnionBy = typeof unionBy;

/**
 * `$unionBy` method type
 */
export type $UnionBy = typeof $unionBy;
