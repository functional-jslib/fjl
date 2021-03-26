/**
 * Trampolines function calls in order to avoid stack overflow errors
 * on recursive function calls; Tail recursion replacement.
 * ```
 * // Instead of ... (which is prone to stack-overflow in
 * //   non-tail-call optimized environments (es5-es3))
 * const factorial = n => n > 1 ? n * factorial(n - 1) : 1;
 *
 * // We do
 * const
 *
 *  factorialProcess = (n, agg = 1) => {
 *      n > 1 ? () => factorialProcess(n - 1, agg * n) : agg,
 *  },
 *
 *  factorial = trampoline(factorialProcess)
 *  // will not overflow as we are performing tail call elimination
 *  // by returning thunks from factorial process which run in `while` loop
 *  // within `trampoline`.
 *
 *  ;
 *  ```
 *
 * @note function returned by trampoline is not curried (for convenience)!
 * @param fn {Function} - Function to trampoline.
 * @param [fnName=undefined] {String} - Optionally restrict trampolining only to function with specific name.
 * @returns {*} - Finally returned value.
 */
import {Nary} from "../types";

export const trampoline = <T, RetT>(fn: Nary<T, RetT>, fnName?: string): Nary<T, RetT> => {
  return (...args: T[]): RetT => {
    let result = fn(...args);
    while (typeof result === 'function' &&
    (!fnName || (result.name === fnName))) {
      result = result();
    }
    return result;
  };
};

