import {NumberIndexable} from "../../types";

export const

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     */
    lastIndex = <T, TS extends NumberIndexable<T>>(xs: TS): number => {
        const len = xs.length;
        return len ? len - 1 : 0;
    }
;
