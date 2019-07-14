import {curry} from "../function";
import {findIndices} from "./findIndices";

export const
    /**
     * @function module:list.elemIndices
     * @param value {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    elemIndices = curry((value, xs) => findIndices(x => x === value, xs));
