import {append} from './append';

export const

  /**
   * Concatenates container of concat-ables
   * into one..
   */
  concat = (xss: string[] | any[][]): typeof xss[0] => append(...xss)
;
