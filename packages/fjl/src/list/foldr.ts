import {$reduceRight, reduceRight} from "./utils";

export const

  $foldr = $reduceRight,

  /**
   * Right associative fold.  Reduces a container of elements down by the given operation (same as [].reduceRight).
   * @function module:list.foldr
   * @param fn {Function}
   * @param zero {*} - Aggregator.
   * @param functor {Array}
   * @returns {*} - Whatever type is lastly returned from `fn`.
   */
  foldr = reduceRight

;
