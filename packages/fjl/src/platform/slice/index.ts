import {Slice, SlicePred} from "../../types/data";
import {curry2, curry3, CurryOf3} from "../../function";

export {Slice, SlicePred};

export const

  $concat = <T = any>(...xss): Slice<T> => !xss ? xss : xss.shift().concat(...xss),

  concat = curry2($concat),

  $indexOf = <T = any>(xs: Slice<T>, x: T): number => !xs ? -1 : xs.indexOf(x as any),

  indexOf = curry2($indexOf),

  $includes = <T>(xs: Slice<T>, x: T): boolean => xs && xs.includes(x as any),

  includes = curry2($includes),

  $lastIndexOf = <T>(xs: Slice<T>, x: T): number => !xs ? -1 : xs.lastIndexOf(x as any),

  lastIndexOf = curry2($lastIndexOf),

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = <T>(start: number, end: number, xs: Slice<T>): Slice<T> =>
    xs.slice(start, end) as Slice<T>,

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = curry3(slice) as CurryOf3<number, number, Slice, Slice>

;

