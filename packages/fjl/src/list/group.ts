import {groupBy} from "./groupBy";
import {Slice} from "../types/data";
import {equal} from "../boolean";

export const
  /**
   * The group function takes a list and returns a list of lists such that
   *  the concatenation of the result is equal to the argument. Moreover, each
   *  sublist in the result contains only equal elements. For example,
   * `group "Mississippi" = ["M","i","ss","i","ss","i","pp","i"]`
   * It is a special case of groupBy, which allows the programmer to supply
   *  their own equality test.
   */
  group = <T, XS extends Slice<T>>(xs: XS): XS[] => groupBy(equal, xs);
