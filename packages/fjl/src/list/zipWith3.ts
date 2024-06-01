import {zipWithN} from "./zipWithN";

export type ZipWith3Op<T = any> = (a: T, b: T, c: T) => [T, T, T];

export const
  /**
   * Zips 3 lists using tupling function.
   */
  zipWith3 = <T=any>(op: ZipWith3Op<T>, xs1: T[], xs2: T[], xs3: T[]): T[][] => zipWithN(op, xs1, xs2, xs3),

  $zipWith3 = <T=any>(op: ZipWith3Op<T>) =>
    (xs1: T[]) =>
      (xs2: T[]) =>
        (xs3: T[]): T[][] => zipWith3(op, xs1, xs2, xs3);
