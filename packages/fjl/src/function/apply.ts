import {UnitNary} from "../types";

/**
 * Functional version of `fn.apply`, and/or the "spread operator" - Method ignores the `fn.apply` 'context' parameter (first parameter),
 *
 * ```javascript
 * import {apply} from 'fjl';
 *
 * const add = (...nums) => nums.reduce((a, b) => a + b, 0);
 * const ctrl = [1, 2, 3, 4, 5];
 *
 * console.assert(apply(add, ctrl) === add(...ctrl));
 * ```
 */
export const apply = <F extends UnitNary>(fn: F, args: Parameters<F>): ReturnType<F> =>
    fn.apply(null, args),

  /**
   * Curried version of `apply` method.
   */
  $apply = <F extends UnitNary>(fn: F) => (args: Parameters<F>): ReturnType<F> => apply(fn, args)

;
