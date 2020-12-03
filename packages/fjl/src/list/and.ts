import {Indexable} from "../types";
import {isEmpty} from "../object";

export const
  /**
   * Conjuction of container of booleans (or truthy and/or falsy values);  Returns
   * `true` if all in container are 'truthy' else returns `false`
   */
  and = <T>(xs: Indexable<T>): boolean => {
    if (isEmpty(xs)) {
      return false;
    }
    const ks = Object.keys(xs);
    let ksLimit = ks.length;
    while ((--ksLimit) >= 0) {
      if (!xs[ks[ksLimit]]) {
        return false;
      }
    }
    return true;
  };
