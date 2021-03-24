import {lastIndex} from './utils';
import {Slice} from "../types";

export const
    /**
     * Returns everything except last item of list as new list.
     */
    init = <T>(xs: Slice<T>): Slice<T> => xs.slice(0, lastIndex(xs));
