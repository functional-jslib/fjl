import {$reduce, reduce} from "./utils";

export const

  $foldl = $reduce,

  /**
   * Left associative fold.  Reduces a container of elements down by the given operation (same as [].reduce).
   * @function module:list.foldl
   * @param fn {Function}
   * @param zero {*} - Aggregator.
   * @param functor {Array}
   * @returns {*} - Whatever type is lastly returned from `fn`.
   */
  foldl = reduce;
