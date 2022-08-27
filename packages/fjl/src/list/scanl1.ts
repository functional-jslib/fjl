import {scanl, ScanlOp} from "./scanl";

export const

  scanl1 = <T>(fn: ScanlOp<T, T>, xs: T[]): T[] =>
    scanl(fn, xs[0], xs.slice(1)),

  /**
   * `scanl1` is a variant of `scanl` that has no starting value argument:
   * `shallowCompare(scanl1(fn, [x1, x2, ...]), [x1, fn(x1, x2), ...]) // true`
   */
  $scanl1 = <T>(fn: ScanlOp<T, T>) =>
    (xs: T[]): T[] => scanl1(fn, xs);
