/**
 * Unfoldr operation - Takes a `b` to produce an `a` (`A`) from.
 *
 * @todo Letters should be flipped in initial type;  E.g.,
 *  UnfoldrOp<B, A>;
 */
export type UnfoldrOp<A, B> = (b: B | undefined, i?: number, as?: A[]) => [A, B] | undefined;

/**
 * Unfoldr takes an operation, and a starting value (`b`),
 * and produces a list made up of the collected `a`s returned in
 * the operation's return value `[a, b]`.  @note `b` in the return
 * value is passed back into the unfoldr operation func. until the `b`
 * returned is `undefined`.
 *
 * The operation is the 'dual' of `foldr`; `foldr` reduces a list to a
 * summary value; `unfoldr` produces a list from a starting value.
 */
export const unfoldr = <A, B>(op: UnfoldrOp<A, B>, b: B): A[] => {
    const out = [] as A[];

    let ind = 0,
      resultTuple = op(b, ind, out);

    while (resultTuple) {
      out.push(resultTuple[0]);
      resultTuple = op(resultTuple[1], ++ind, out);
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
