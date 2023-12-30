import {append} from './append';
import {Slice} from "../types";

export const

  /**
   * Concatenates container of concat-ables into one.
   */
  concat = <TS extends Slice>(xss: TS[]): typeof xss[0] => append(...xss)
;
