import {$findIndexWhere, findIndexWhere} from "./utils";

export const

  /**
   * Finds index in slice that matches given predicate or -1.
   */
  $findIndex = $findIndexWhere,

  /**
   * Finds index slice that matches given predicate or -1.
   * Curried version of `$findIndex`.
   */
  findIndex = findIndexWhere

;
