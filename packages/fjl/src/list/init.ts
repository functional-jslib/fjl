import {lastIndex} from './utils';

export const

  /**
   * Returns everything except last item of list as new list.
   */
  init = <T>(xs: T[]): T[] => xs.slice(0, lastIndex(xs))

;
