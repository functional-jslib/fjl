import {append} from './append';

export const

  /**
   * Concatenates container of concat-ables into one.  An empty container gives `[]`.
   */
  concat = <TS extends string | any[]>(xss: TS[]): typeof xss[0] =>
    xss.length ? append(...xss) : [] as unknown as TS
;
