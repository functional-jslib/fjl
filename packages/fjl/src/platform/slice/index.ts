import {Slice} from "../../types";

export const

  concat = (...xss: Slice[]): Slice =>
    (!xss ? xss : xss.shift().concat(...xss)) as Slice,

  $concat = a => (...b) => concat(a, ...b),

  indexOf = (xs: Slice, x: any): number => !xs ? -1 : xs.indexOf(x),

  $indexOf = xs => x => indexOf(xs, x),

  includes = (xs: Slice, x: any): boolean => xs && xs.includes(x),

  $includes = xs => x => includes(xs, x),

  lastIndexOf = (xs: Slice, x: any): number => !xs ? -1 : xs.lastIndexOf(x),

  $lastIndexOf = xs => x => lastIndexOf(xs, x),

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = (start: number, end: number, xs: Slice): Slice => xs.slice(start, end),

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = start => end => xs => xs.slice(start, end, xs)

;

