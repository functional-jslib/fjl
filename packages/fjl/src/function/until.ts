import {Unary, UnaryPred} from "../types";

export const

  /**
   * Run `operation` on `startValue`, or last returned `value`, until predicate returns `true` (functional while loop).
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

  $until = <T>(predicate: UnaryPred<T>) =>
    (operation: Unary<T>) =>
      (startValue: T): T => until(
        predicate,
        operation,
        startValue
      );
