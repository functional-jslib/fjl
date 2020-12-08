import {curry, CurryOf2} from "../function/curry";
import {filter} from "./filter";
import {includes} from "../platform/slice";

export const
    /**
     * Performs an intersection on list 1 with  elements from list 2.
     */
    intersect = curry(<T>(arr1: T[], arr2: T[]) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(arr2, elm) as boolean, arr1) as T[]
    ) as CurryOf2<any[], any[], any[]>;
