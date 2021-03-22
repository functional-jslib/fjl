import {Slice} from "../types";

export const

  /**
   * Returns head of list (first item of list).
   */
  head = <T>(x: Slice<T>): T => x[0] as T

;
