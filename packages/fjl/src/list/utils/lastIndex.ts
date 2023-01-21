import {Lengthable} from "../../types";

export const

  /**
   * Gets last index of a list/list-like (Array|String|Function etc.).
   */
  lastIndex = (xs: Lengthable): number => (xs?.length ?? 0) - 1
;
