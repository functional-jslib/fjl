import {curry} from "../function/curry";
import {foldl} from "./foldl";
import {any} from "./any";
import {sliceCopy} from "./utils/sliceCopy";
import {BinaryPred, Slice} from "../types";

const getFoldOpForArray = <T>(pred: BinaryPred<T, T>) => (agg: Slice<T>, b: T): Slice<T> => {
    const alreadyAdded = any((a: T) => pred(a, b), agg);
    if (!alreadyAdded) (agg as T[]).push(b);
    return agg;
  },

  getFoldOpForString = <T>(pred: BinaryPred<T, T>) => (agg: Slice<T>, b: T): Slice<T> => {
    const alreadyAdded = any((a: T) => pred(a, b), agg);
    return !alreadyAdded ? (agg as unknown as string) + b : agg; // unknown here is ok (since func. is used internally only).
  };

export const

  /**
   * Returns the union on elements matching boolean check passed in.
   */
  unionBy = <T>(pred: BinaryPred<T, T>, xs1: Slice<T>, xs2: Slice<T>): Slice<T> => {
    const foldOp = typeof xs1 === 'string' ? getFoldOpForString(pred) : getFoldOpForArray(pred);
    return foldl(foldOp, sliceCopy(xs1) as Slice<T>, xs2) as Slice<T>;
  },

  $unionBy = curry(unionBy);
