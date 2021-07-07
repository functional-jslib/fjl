import {Indexable} from "../../types";
import {length} from "../length";

export const

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     */
    lastIndex = (x: Indexable): number => {
        const len = length(x);
        return len ? len - 1 : 0;
    }
;
