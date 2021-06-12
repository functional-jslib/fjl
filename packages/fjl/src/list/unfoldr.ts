import {curry} from "../function/curry";

export type UnfoldrOp<A, B> = (b: B | undefined, i?: number, as?: A[]) => [A, B] | undefined;

export const

  /**
   * Unfoldr takes an operation, similar to a reduce operation, and a starting value.  The function returns the results
   * of applying the operation func. to all 'b' returned by the operation (the operation needs to return a tuple of
   * 'current return value' (inserted into returned array) and next 'b' arg for operation func..
   *
   * The operation is a 'dual' to 'foldr'; foldr reduces a list to a summary value; unfoldr produces a list
   * from a starting value.
   *
   * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]` - In our typescript type though `Maybe(a, b)` becomes `[A, B] | undefined | null`.
   */
  unfoldr = <A, B>(op: ((b: B | undefined, i?: number, as?: A[]) => [A, B] | undefined), bs: B): A[] => {
    let ind = 0,
      out = [] as A[],
      resultTuple = op(bs, ind, out);
    while (resultTuple) {
      out.push(resultTuple[0]);
      resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
  },

  $unfoldr = curry(unfoldr);
