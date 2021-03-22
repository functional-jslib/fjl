import {$findWhere, findWhere} from "./utils";

export const

  $find = $findWhere,

  /**
   * Find an item in structure of elements based on given predicate (`pred`).
   * @function module:list.find
   * @param pred {Function}
   * @param xs {Array} - list or list like.
   * @returns {*} - Found item.
   */
  find = findWhere;
