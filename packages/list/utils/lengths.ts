import {map} from "../map";
import length from "../../platform/object/length";

export const

    /**
     * Returns length of all passed lists in list.
     * @function module:listUtils.lengths
     * @param lists ...{SliceOf<any>}
     * @returns {SliceOf<any>}
     */
    lengths = (...lists: string[] | [any[]] | any): number[] => map(length, lists)

;
