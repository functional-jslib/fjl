import {lastIndex} from './utils';
import {NumberIndexable, Slice} from "../types";

export const

  /**
   * Returns everything except last item of list as new list.
   */
  init = <T, TS extends Slice<T>>(xs: TS): TS => xs.slice(0, lastIndex(xs as NumberIndexable<T>))

;
