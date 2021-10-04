import {Slice} from "../../types";
import {curry2, curry3, CurryOf2, CurryOf3} from "../../function";

export const

  concat = (...xss: Slice[]): Slice =>
    (!xss ? xss : xss.shift().concat(...xss)) as Slice,

  $concat = curry2(concat) as CurryOf2<Slice, Slice, Slice>,

  indexOf = (xs: Slice, x: any): number => !xs ? -1 : xs.indexOf(x),

  $indexOf = curry2(indexOf) as CurryOf2<Slice, any, number>,

  includes = (xs: Slice, x: any): boolean => xs && xs.includes(x),

  $includes = curry2(includes) as CurryOf2<Slice, any, boolean>,

  lastIndexOf = (xs: Slice, x: any): number => !xs ? -1 : xs.lastIndexOf(x),

  $lastIndexOf = curry2(lastIndexOf) as CurryOf2<Slice, any, number>,

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = <T, T2 extends Slice<T> = Slice<T>>(start: number, end: number, xs: T2): T2 => xs.slice(start, end) as T2,

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = curry3(slice) as CurryOf3<number, number, Slice, Slice>

;

