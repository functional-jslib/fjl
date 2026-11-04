import {isPrefixOf} from "./isPrefixOf";
import {splitAt} from "./splitAt";
import {length} from "./length";
import {sliceCopy} from "./utils";

export const

  /**
   * Strips prefix list from given list.
   *
   * @note Differs from Haskell's `stripPrefix`, on purpose: a list that doesn't start with the
   * prefix comes back unchanged (as a copy), rather than as `Nothing`/`undefined`.
   */
  stripPrefix = <T, TS extends string | T[]>(prefix: TS, list: TS): typeof list =>
    isPrefixOf(prefix, list) ?
      splitAt(length(prefix), list)[1] :
      sliceCopy(list),

  $stripPrefix = <T, TS extends string | T[]>(prefix: TS) =>
    (list: TS): typeof list =>
      stripPrefix(prefix, list)
