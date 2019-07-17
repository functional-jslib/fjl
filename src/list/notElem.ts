import {negateF2} from "../function/negate";
import {includes} from "../jsPlatform/list";

export const
    /**
     * The opposite of `elem` - Returns a boolean indicating whether an element exists in given list.
     * @function module:list.notElem
     * @param element {*}
     * @param xs {Array}
     * @returns {Boolean}
     */
    notElem = negateF2(includes);
