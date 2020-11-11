import {length} from "../platform/object";
import {$sliceTo} from "./utils/sliceTo";
import {SliceOf} from "../platform/slice";

type Inits<T> = (xs: SliceOf<T>) => [SliceOf<T>] | SliceOf<T>;

export const
    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(inits('abc'), ['','a','ab','abc'])
     * ```
     * @function module:list.inits
     * @haskellType `inits :: [a] -> [[a]]`
     * @param xs {SliceOf<any>}
     * @returns {SliceOf<any>|SliceOf<any>[]}
     */
    inits: Inits<any> = <T>(xs: SliceOf<T>): SliceOf<T>[] | T[] => {
        const limit = length(xs),
            agg: [any[]] | any[] = [];
        let ind = 0;
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push($sliceTo(ind, xs));
        }
        return agg;
    };
