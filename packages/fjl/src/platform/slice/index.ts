export const

  /**
   * Concatenates a list of lists down to a list.  Returns `undefined` if no lists are passed in).
   * @note This method is not be confused with 'list/concat' - 'list' version of the method actually uses this one internally.  This method is actually exported from the library as `append` - See 'list/append' module.
   * @param {ConcatArray<any>[] | string[]} xss
   */
  concat = (...xss) =>
    xss.shift()?.concat(...xss),

  /**
   * Curried version of `concat`.
   */
  $concat = a => (...b) => concat(a, ...b),

  indexOf = (xs, x): number => xs.indexOf(x),

  $indexOf = xs => x => indexOf(xs, x),

  includes = (xs, x): boolean => xs.includes(x),

  $includes = xs => x => includes(xs, x),

  lastIndexOf = (xs, x): number => xs.lastIndexOf(x),

  $lastIndexOf = xs => x => lastIndexOf(xs, x),

  /**
   * Same as `(Array|String).prototype.slice`.
   */
  slice = (start: number, end: number, xs) =>
    xs.slice(start, end),

  /**
   * Same as `(Array|String).prototype.slice`.
   * @curried
   */
  $slice = start => end => xs => slice(start, end, xs)

;

