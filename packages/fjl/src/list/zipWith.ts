import {length} from "./length";
import {reduce, toShortest} from "./utils";
import {push} from "./push";
import {Binary} from "../types";

export type TuplizeOp<T1, T2> = Binary<T1, T2, [T1, T2]>;

export const
  /**
   * zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
   * zipWith generalises zip by zipping with the function given as the
   * first argument, instead of a function tupling function (function that returns a tuple). For example,
   * zipWith (+) is applied to two lists to produce the list of corresponding sums.
   * @note `_|_` means bottom or perpetual (@see
   *  - https://wiki.haskell.org/Bottom
   *  - https://stackoverflow.com/questions/19794681/what-does-this-syntax-mean-in-haskell-or
   *  )
   * @example
   * ```
   * zipWith f [] _|_ = []
   * ```
   * @haskellType `zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]`
   * @function module:list.zipWith
   * @param op {Function} - Takes two parts of a tuple and returns a tuple.
   *  E.g., ` op :: a -> b -> (a, b)`
   * @param xs1 {Array}
   * @param xs2 {Array}
   * @returns {Array<Array<*,*>>}
   */
  zipWith = <T, T2>(op: Binary<T, T2, [T, T2]>, xs1: T[], xs2: T2[]): [T, T2][] => {
    if (!length(xs1) || !length(xs2)) {
      return [];
    }
    const [a1, a2] = toShortest(xs1 as T[], xs2 as unknown as T[]) as any[][];
    return reduce((agg, item: T, ind) =>
        push(op(item, a2[ind]), agg),
      [], a1);
  },

  $zipWith = <T, T2>(op: Binary<T, T2, [T, T2]>) =>
    (xs1: T[]) =>
      (xs2: T2[]): [T, T2][] =>
        zipWith(op, xs1, xs2);
