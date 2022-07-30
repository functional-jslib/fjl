import {reduce} from "./utils/reduce";
import {append} from "./append";
import {difference} from "./difference";
import {Slice} from '../types';

export const

  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   */
  complement = <T>(...arrays: Slice<T>[]): Slice<T> => {
    if (!arrays.length) return [];
    const [arr0] = arrays;
    return reduce((agg: Slice<T>, arr: Slice<T>) =>
      append(agg, difference(arr, arr0) as Slice<T>), [], arrays)
  },

  /**
   * Returns the complement of list 0 and the reset of the passed in arrays.
   */
  $complement = <T>(xs1: Slice<T>) =>
    (xs2: Slice<T>, ...arrays: Slice<T>[]): Slice<T> => complement(xs1, xs2, ...arrays)

;
