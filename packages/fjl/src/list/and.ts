import {NumberIndexable} from "../types";

export const
  /**
   * Conjunction of container of booleans (or truthy and/or falsy values);  Returns
   * `true` if all in container are 'truthy' else returns `false`
   */
  and = <T>(xs: NumberIndexable<T>): boolean => {
    let limit = xs.length;
    if (!limit) return false;
    while ((--limit) >= 0) {
      if (!xs[limit]) return false;
    }
    return true;
  };
