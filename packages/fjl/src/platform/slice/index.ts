export const

  concat = (...xss) =>
    xss.shift()?.concat(...xss),

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

