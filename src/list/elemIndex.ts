import {curry} from "../function/curry";
import {indexOf} from "../jsPlatform/slice";

export const
    /**
     * @function module:list.elemIndex
     * @param x {*} - Element to search for.
     * @param xs {Array} - list or list like.
     * @returns {*}
     */
    elemIndex = curry((x, xs) => {
        const foundInd = indexOf(x, xs);
        return foundInd !== -1 ? foundInd : undefined;
    });

