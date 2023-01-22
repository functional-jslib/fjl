import {NumberIndexable} from "../../types";

export const

  /**
   * Gets last index of a list/list-like (Array|String|Function etc.).
   */
  lastIndex = (xs: NumberIndexable): number => (xs?.length ?? 0) - 1
;
