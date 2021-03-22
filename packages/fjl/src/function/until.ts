import {curry, CurryOf3} from './curry';
import {Unary, UnaryOf, UnaryPred} from "../types";

export const

  /**
   * Run `operation` until predicate returns `true` (like a functional
   *  version of a while loop).
   */
  until = <T, RetT>(
    predicate: UnaryPred<T | RetT>,
    operation: UnaryOf<T | RetT, T | RetT>,
    startValue: T | RetT
  ): RetT => {
    let result: T | RetT = startValue;
    while (!predicate(result)) {
      result = operation(result);
    }
    return result as RetT;
  },

  $until = curry(until) as CurryOf3<UnaryPred<any>, Unary<any>, any, any>;
