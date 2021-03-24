import {curry} from "../function/curry";
import {map} from "./map";
import {sortBy} from "./sortBy";
import {genericAscOrdering} from "./utils";
import {UnaryOf} from "../types";

export const

  /**
   * Sort a list by comparing the results of a key function applied to each
   * element. sortOn f is equivalent to sortBy (comparing f), but has the
   * performance advantage of only evaluating f once for each element in the
   * input list. This is called the decorate-sort-undecorate paradigm, or
   * Schwartzian transform.
   *
   * Elements are arranged from from lowest to highest, keeping duplicates
   * in the order they appeared in the input.
   *
   * Ex:
   * ```
   * shallowEquals(
   *  sortOn (head, [[2, "world"], [4, "!"], [1, "Hello"]]),
   *  [[1,"Hello"],[2,"world"],[4,"!"]]
   * ) // true
   * ```
   */
  sortOn = <T>(valueFn: UnaryOf<T, any>, xs: T[]) =>

    // Un-decorate
    map(decorated => decorated[1],

      // Decorate and sort
      sortBy(
        // Ordering
        ([a0], [b0]) => genericAscOrdering(a0, b0),

        // Decorate
        map((item: T) => [valueFn(item), item], xs)
      )
    ),

  $sortOn = curry(sortOn);
