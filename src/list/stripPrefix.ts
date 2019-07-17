import {curry} from "../function/curry";
import {isPrefixOf} from "./isPrefixOf";
import {splitAt} from "./splitAt";
import {length} from "../jsPlatform/object";
import {sliceCopy} from "./utils";

export const
    /**
     * Strips prefix list from given list
     * @function module:list.stripPrefix
     * @param prefix {Array|String|*}
     * @param list {Array|string|*}
     * @returns {Array|*}
     */
    stripPrefix = curry((prefix, list) =>
        isPrefixOf(prefix, list) ?
            splitAt(length(prefix), list)[1] :
            sliceCopy(list));
