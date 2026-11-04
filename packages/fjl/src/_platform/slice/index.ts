/**
 * Methods that apply to "sliceables" - the `string | T[]` union (e.g., the
 * built-in types that support `slice`, `concat`, `at`, and numeric indexing).
 */

/**
 * The built-in "sliceable" union; `any` is the idiomatic array constraint, and is what lets
 * `TS extends Sliceable` keep the caller's element type.
 */
type Sliceable<T = any> = string | T[];

/**
 * `string` inputs give a `string`, arrays give an array of their element type, and a generic
 * "sliceable" gives back its own type.
 */
type Concat = {
  (...xss: string[]): string;
  <T>(...xss: ConcatArray<T>[]): T[];
  <TS extends Sliceable>(...xss: TS[]): TS;
};

/**
 * Curried form of `Concat`.
 */
type $Concat = {
  (a: string): (...b: string[]) => string;
  <T>(a: ConcatArray<T>): (...b: ConcatArray<T>[]) => T[];
  <TS extends Sliceable>(a: TS): (...b: TS[]) => TS;
};

export const

  /**
   * Concatenates a list of concat-able elements (string/array) down
   * to one instance.  Returns `undefined`  if no items are passed in.
   *
   * @note This method is not be confused with '../list/concat' - this latter
   * version of the method actually uses this one internally.  This
   * method, itself, is actually exported from the library as `append`
   * (same as '+' for strings, but for concatables) See '../list/append' module.
   */
  concat = ((...xss: any[]) => xss.shift()?.concat(...xss)) as Concat,

  /**
   * Curried version of `concat`.
   */
  $concat = (<TS extends Sliceable>(a: TS) => (...b: TS[]): TS => concat(a, ...b)) as $Concat,

  /**
   * Same as `(Array|String).prototype.indexOf`, but list last.
   */
  indexOf = <T>(x: T, xs: Sliceable<T>): number => (xs as T[]).indexOf(x),

  $indexOf = <T>(x: T) => (xs: Sliceable<T>): number => indexOf(x, xs),

  /**
   * Same as `(Array|String).prototype.includes`, but list last.
   */
  includes = <T>(x: T, xs: Sliceable<T>): boolean => (xs as T[]).includes(x),

  $includes = <T>(x: T) => (xs: Sliceable<T>): boolean => includes(x, xs),

  /**
   * Same as `(Array|String).prototype.lastIndexOf`, but list last.
   */
  lastIndexOf = <T>(x: T, xs: Sliceable<T>): number => (xs as T[]).lastIndexOf(x),

  $lastIndexOf = <T>(x: T) => (xs: Sliceable<T>): number => lastIndexOf(x, xs),

  /**
   * Same as `(Array|String).prototype.slice`, but in functional format.
   */
  slice = <TS extends Sliceable>(start: number, end: number, xs: TS): TS =>
    xs.slice(start, end) as TS,

  /**
   * Same as `slice` but curried.
   * @curried
   */
  $slice = (start: number) =>
    (end: number) =>
      <TS extends Sliceable>(xs: TS): TS =>
        slice(start, end, xs),

  /**
   * Gets item at index;  Same as` [].at()` (allows
   *  negative/right-to-left indexing (see mdn `(Array|String).at` method).
   */
  at = <T = any>(i: number, xs: string | T[]) => xs.at(i),

  /**
   * Curried version of `at`.
   */
  $at = <T = any>(i: number) => (xs: string | T[]) => xs.at(i)

;

