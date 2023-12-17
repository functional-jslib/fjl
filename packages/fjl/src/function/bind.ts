import {Nary, UnitNary} from "../types";

/**
 * Functional `bind` - ignores first `#Function.bind()` argument.
 */
export const bind = <F extends UnitNary>(fn: F, ...args: any[]): Nary<any, ReturnType<F>> =>
    fn.bind(null, ...args),

  /**
   * Curried version of `bind`.
   */
  $bind = <F extends UnitNary>(fn: F) => (...args: any[]): Nary<any, ReturnType<F>> =>
    fn.bind(null, ...args);
