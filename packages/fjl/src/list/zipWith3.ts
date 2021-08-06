import {curry} from "../function/curry";
import {zipWithN} from "./zipWithN";
import {Slice} from "../types";

export type ZipWith3Op<T = any> = (a: T, b: T, c: T) => [T, T, T];

export const
  /**
   * Zips 3 lists with tupling function.
   * @haskellType `zipWith3 :: (a -> b -> c -> d) -> [a] -> [b] -> [c] -> [d]`
   * @function module:list.zipWith3
   * @param op {Function} - Takes expected number of parts for tuple and returns a tuple
   *  of said parts:
   *  E.g., ` op :: a -> b -> c -> (a, b, c)`
   * @param xs1 {Array}
   * @param xs2 {Array}
   * @param xs3 {Array}
   * @returns {Array<Array<*,*>>}
   */
  zipWith3 = <T = any>(op: ZipWith3Op<T>, xs1: T[], xs2: T[], xs3: T[]): Slice<T>[] => zipWithN(op, xs1, xs2, xs3),

  $zipWith3 = curry(zipWith3);
