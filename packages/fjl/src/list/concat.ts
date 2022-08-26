import {append} from './append';
import {sliceCopy} from "./utils";

export const

  /**
   * Concatenates all the elements of a container of lists.
   */
  concat = <T, TS extends T[]>(xs: TS[]): TS => append(...xs) as TS
;
