import {curry, CurryOf3} from './curry';
import {Unary, UnaryPred} from "../types";

export const

  /**
   * Run `operation` until predicate returns `true` (like a functional
   *  version of a while loop).
   */
  until = <T>(
    predicate: UnaryPred<T>,
    operation: Unary<T>,
    startValue: T
  ): T => {
    let result = startValue;
    while (!predicate(result)) {
      result = operation(result);
    }
    return result;
  },

  $until = curry(until) as CurryOf3<UnaryPred, Unary>;
