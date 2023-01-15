import {groupBy} from "./groupBy";
import {equal} from "../boolean";

/**
 * The group function takes a list and returns a list of lists such that
 *  the concatenation of the result is equal to the argument. Moreover, each
 *  sublist in the result contains only equal elements. For example:
 *
 * ```javascript
 * group("Mississippi".slice(0)) === [["M"], ["i"], ["s", "s"], ["i"], ["s", "s"], ["i"], ["p", "p"],[ "i"]]
 * ```
 */
export const group = (xs: string | any[]): (string | any[])[] => groupBy(equal, xs);
