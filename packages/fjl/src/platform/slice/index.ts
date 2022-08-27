import {Slice} from "../../types";

export const

  concat = (...xss: (string | any)[]) =>
    xss.shift()?.concat(...xss),

  $concat = a => (...b) => concat(a, ...b),

  indexOf = (xs: Slice<any>, x: any): number => xs.indexOf(x),

  $indexOf = xs => x => indexOf(xs, x),

  includes = (xs: Slice<any>, x: any): boolean => xs.includes(x),

  $includes = xs => x => includes(xs, x),

  lastIndexOf = (xs: Slice<any>, x: any): number => xs.lastIndexOf(x),

  $lastIndexOf = xs => x => lastIndexOf(xs, x),

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = <T>(start: number, end: number, xs: Slice<T>): Slice<T> =>
    xs.slice(start, end),

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = start => end => xs => slice(start, end, xs)

;

