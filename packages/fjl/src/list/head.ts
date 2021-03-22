import {Slice} from "../types";

export const

  /**
   * Returns head of list (first item of list).
   * @haskellType `head :: [a] -> a`
   * @function module:list.head
   * @param x {Array|String}
   * @returns {*} - First item from list
   */
  head = <T>(x: Slice<T>): T => x[0] as T

;
