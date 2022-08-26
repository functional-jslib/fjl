import {Slice} from "../../types";

export const

  concat = <T, TS extends Slice<T>>(...xss: TS[]): TS =>
    xss.shift().concat(...xss),

  $concat = a => (...b) => concat(a, ...b),

  indexOf = (xs: Slice, x: any): number => xs.indexOf(x),

  $indexOf = xs => x => indexOf(xs, x),

  includes = (xs: Slice, x: any): boolean => xs.includes(x),

  $includes = xs => x => includes(xs, x),

  lastIndexOf = (xs: Slice, x: any): number => xs.lastIndexOf(x),

  $lastIndexOf = xs => x => lastIndexOf(xs, x),

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = <T, XS extends Slice<T>>(start: number, end: number, xs: XS): XS =>
    xs.slice(start, end) as typeof xs,

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = start => end => xs => xs.slice(start, end, xs)

;

