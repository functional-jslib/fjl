import {Indexable, Lengthable, NumberIndexable} from "../../types";
import {length} from "../length";

export const

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     */
    lastIndex = <T, TS extends NumberIndexable<T>>(xs: TS): number => {
        const len = length(xs);
        return len ? len - 1 : 0;
    }
;
