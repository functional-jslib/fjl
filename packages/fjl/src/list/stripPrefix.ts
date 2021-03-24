import {curry} from "../function/curry";
import {isPrefixOf} from "./isPrefixOf";
import {splitAt} from "./splitAt";
import {length} from "../platform/object";
import {sliceCopy} from "./utils/sliceCopy";
import {Slice} from "../types";

export const

  /**
   * Strips prefix list from given list
   */
  stripPrefix = <T>(prefix: Slice<T>, list: Slice<T>): Slice<T> =>
    isPrefixOf(prefix, list) ?
      splitAt(length(prefix), list)[1] :
      sliceCopy(list),

  $stripPrefix = curry(stripPrefix);
