import {Slice, PredForSlice, Slice} from "../../types";
import {curry2, curry3, CurryOf2, CurryOf3} from "../../function";

export {Slice, PredForSlice};

export const

  concat = <T = any, T2 extends Slice<T>>(...xss): T2 => !xss ? xss : xss.shift().concat(...xss),

  $concat = curry2(concat) as CurryOf2<Slice, Slice, Slice>,

  indexOf = <T = any, T2 extends Slice<T>>(xs: T2, x: T): number => !xs ? -1 : xs.indexOf(x as any),

  $indexOf = curry2(indexOf) as CurryOf2<Slice, any, number>,

  includes = <T, T2 extends Slice<T>>(xs: T2, x: T): boolean => xs && xs.includes(x as any),

  $includes = curry2(includes) as CurryOf2<Slice, any, boolean>,

  lastIndexOf = <T, T2 extends Slice<T>>(xs: T2, x: T): number => !xs ? -1 : xs.lastIndexOf(x as any),

  $lastIndexOf = curry2(lastIndexOf) as CurryOf2<Slice, any, number>,

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = <T = any, T2 extends Slice<T>>(start: number, end: number, xs: T2): T2 => xs.slice(start, end) as T2,

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = curry3(slice) as CurryOf3<number, number, Slice, Slice>

;

