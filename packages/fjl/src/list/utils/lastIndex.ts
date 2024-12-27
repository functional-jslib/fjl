import {NumberIndexable} from "../../types";

export const

  /**
   * Gets last index of a list/list-like (Array|String|Function etc.), or `-1`
   */
  lastIndex = (xs: NumberIndexable): number => (xs?.length ?? 0) - 1
;
