import {append} from './append';
import {Slice} from "../types";

export const

  /**
   * Concatenates all the elements of a "container of lists".
   */
  concat = (xss: Slice | Slice[]) => append(...xss)
;
