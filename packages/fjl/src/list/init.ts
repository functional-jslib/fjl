import {lastIndex} from './utils';

export const

  /**
   * Returns everything except last item of slice as new slice.
   */
  init = xs => xs.slice(0, lastIndex(xs))

;
