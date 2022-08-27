import {append} from './append';
import {sliceCopy} from "./utils";
import {Slice} from "../types";

export const

  /**
   * Concatenates all the elements of a container of lists.
   */
  concat = <T, TS extends Slice<T>>(xs: TS[]): TS => append(...xs) as TS
;
