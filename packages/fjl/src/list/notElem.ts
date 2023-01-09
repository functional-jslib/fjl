import {negateF2} from "../function/negate";
import {includes} from "../platform/slice";
import {NaryPred} from "../types";

export const
    /**
     * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
     */
    notElem = negateF2(includes as NaryPred);
