import {negateF2} from "../function/negate";
import {includes} from "../_platform/slice";
import {NaryPred} from "../types";

/**
 * The opposite of `elem` - Returns a boolean indicating whether
 * an element exists in given list.
 */
export const notElem = negateF2(includes as NaryPred);
