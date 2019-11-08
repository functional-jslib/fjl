import {length} from '../jsPlatform/object';
import {append} from './append';
import {sliceCopy} from './utils';
import {SliceOf} from "../jsPlatform/slice";

export const
    /**
     * Concatenates all the elements of a container of lists.
     * @haskellType `concat :: Foldable t => t [a] -> [a]`
     * @function module:list.concat
     * @param xs {Array}
     * @returns {Array}
     */
    concat = (xs: SliceOf<any>[]): SliceOf<any> => {
        let item0;
        const defaultOut: SliceOf<any> = [];
        switch (length(xs)) {
            case undefined:
            case 0:
                return defaultOut;
            case 1:
                item0 = xs[0];
                return item0 && item0.slice ? sliceCopy(item0) : item0;
            case 2:
            default:
                return append(...xs) as SliceOf<any>;
        }
    }
;
