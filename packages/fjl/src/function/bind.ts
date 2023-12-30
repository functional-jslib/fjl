import {Nary, UnitNary} from "../types";

/**
 * Functional `bind` - ignores the native implementation's (`#Function.bind`) first arg.
 */
export const bind = <F extends UnitNary>(fn: F, ...args: any[]): Nary<any, ReturnType<F>> =>
    fn.bind(null, ...args),

  /**
   * Curried version of `bind`.
   */
  $bind = <F extends UnitNary>(fn: F) => (...args: any[]): Nary<any, ReturnType<F>> =>
    fn.bind(null, ...args);
