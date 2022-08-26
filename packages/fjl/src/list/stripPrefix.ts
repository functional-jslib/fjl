import {isPrefixOf} from "./isPrefixOf";
import {splitAt} from "./splitAt";
import {length} from "./length";
import {sliceCopy} from "./utils/sliceCopy";

export const

  /**
   * Strips prefix list from given list
   */
  stripPrefix = <T>(prefix: T[], list: T[]): T[] =>
    isPrefixOf(prefix, list) ?
      splitAt(length(prefix), list)[1] :
      sliceCopy(list),

  $stripPrefix = <T>(prefix: T[]) =>
    (list: T[]): T[] =>
      stripPrefix(prefix, list)
