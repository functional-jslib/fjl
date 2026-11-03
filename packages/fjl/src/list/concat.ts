import {append} from './append';

export const

  /**
   * Concatenates container of concat-ables into one.
   */
  concat = <TS extends string | any[]>(xss: TS[]): typeof xss[0] => append(...xss)
;
