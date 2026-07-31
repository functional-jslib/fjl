/**
 * Unfoldr operation - Takes a `b` to produce an `a` (`A`) from.
 *
 * @note Generics are ordered by role - element type (`A`) first, seed type (`B`)
 *  second - not by parameter position;  This matches `unfoldr<A, B>`'s own order,
 *  the op's *return* tuple (`[A, B]`), and the sibling `ScanlOp<A, B>`/
 *  `ScanrOp<A, B>` types (whose first generic is likewise not their first
 *  parameter).  They are therefore intentionally not flipped.
 */
export type UnfoldrOp<A, B> = (b: B | undefined, i?: number, as?: A[]) => [A, B] | undefined;

/**
 * Generator that yields each successive prefix of the list `unfoldr` builds;
 * i.e., the lazy sibling of `unfoldr` - it lets callers stop early, and so lets
 * `op`s that never return `undefined` be consumed safely.
 *
 * ```javascript
 * const countdown = (x) => x - 1 >= 0 ? [x, x - 1] : undefined;
 *
 * const gen = unfoldrIter(countdown, 10);
 * console.log(gen.next().value);  // [10]
 * console.log(gen.next().value);  // [10, 9]
 * // ...
 *
 * // Stop early on an operation that never terminates
 * for (const xs of unfoldrIter(x => [x, x + 1], 0)) {
 *   if (xs.length === 3) break;  // [0, 1, 2]
 * }
 * ```
 *
 * @note The last value yielded is (deep) equal to `unfoldr(op, b)`.
 * @note As with `iterate`, and `repeat`, the yielded list is the same, growing,
 *  list reference on every iteration - `slice` it when a snapshot is required;
 *  it is also the list handed to `op` as its third argument.
 */
export function* unfoldrIter<A, B>(op: UnfoldrOp<A, B>, b: B): Generator<A[], void> {
  const out = [] as A[];

  let ind = 0,
    resultTuple = op(b, ind, out);

  while (resultTuple) {
    out.push(resultTuple[0]);
    yield out;
    resultTuple = op(resultTuple[1], ++ind, out);
  }
}

/**
 * Curried version of `unfoldrIter`.
 */
export const $unfoldrIter = <A, B>(op: UnfoldrOp<A, B>) =>
  (b: B): Generator<A[], void> => unfoldrIter(op, b);

export const

  /**
   * Unfoldr takes an operation, and a starting value (`b`),
   * and produces a list made up of the collected `a`s returned in
   * the operation's return value `[a, b]`.  @note `b` in the return
   * value is passed back into the unfoldr operation func. until the `b`
   * returned is `undefined`.
   *
   * The operation is the 'dual' of `foldr`; `foldr` reduces a list to a
   * summary value; `unfoldr` produces a list from a starting value.
   *
   * @note Eager - `op` must eventually return `undefined`, else the call never
   *  returns;  For the lazy variant @see `unfoldrIter`.
   */
  unfoldr = <A, B>(op: UnfoldrOp<A, B>, b: B): A[] => {
    let out = [] as A[];

    for (const xs of unfoldrIter(op, b)) {
      out = xs;
    }

    return out;
  },

  /**
   * Curried version of `unfoldr`.
   */
  $unfoldr = <A, B>(op: UnfoldrOp<A, B>) =>
    (bs: B): A[] =>
      unfoldr(op, bs)
;
