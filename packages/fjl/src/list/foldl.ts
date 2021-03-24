import {$reduce, reduce} from "./utils";

export const

  $foldl = $reduce,

  /**
   * Left associative fold.  Reduces a container of elements down by the given operation (same as [].reduce).
   */
  foldl = reduce;
