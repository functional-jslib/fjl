import {lastIndex} from './utils';

export const

  /**
   * Returns everything except last item of slice as new slice.
   */
  init = <TS extends string | any[]>(xs: TS): TS => xs.slice(0, lastIndex(xs)) as TS

;
