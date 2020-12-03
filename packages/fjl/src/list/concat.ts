import {length} from '../platform/object';
import {append} from './append';
import {sliceCopy} from './utils/sliceCopy';
import {SliceOf} from "../platform/slice";

export const
    /**
     * Concatenates all the elements of a container of lists.
     */
    concat = <T>(xs: SliceOf<T>[]): SliceOf<T> => {
        let item0;
        switch (xs.length) {
            case undefined:
            case 0:
                return [] as unknown as SliceOf<T>;
            case 1:
                item0 = xs[0];
                return item0 && item0.slice ? sliceCopy(item0) : item0;
            case 2:
            default:
                return append(...xs) as SliceOf<T>;
        }
    }
;
