import {lastIndex} from './utils';
import {Slice} from "../types";

export const
    /**
     * Returns everything except last item of list as new list.
     * @haskellType `init :: [a] -> [a]`
     * @function module:list.init
     * @param xs {Array|String}
     * @returns {Array|String}
     */
    init = (xs: Slice): any => xs.slice(0, lastIndex(xs));
