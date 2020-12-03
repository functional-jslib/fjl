import {map} from "../map";
import {length} from "../../platform/object";

export const

    /**
     * Returns length of all passed in lists in list.
     */
    lengths = (...lists: string[] | [any[]] | any): number[] => map(length, lists)

;
