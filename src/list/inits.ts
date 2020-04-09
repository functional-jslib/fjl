import {length} from "../jsPlatform/object";
import {$sliceTo} from "./utils/sliceTo";

type Inits<T> = (xs: T[]) => [T[]] | T;

export const
    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(inits('abc'), ['','a','ab','abc'])
     * ```
     * @function module:list.inits
     * @haskellType `inits :: [a] -> [[a]]`
     * @param xs {Array}
     * @returns {Array}
     */
    inits: Inits<any> = <T>(xs: T[]): [T[]] | T[] => {
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
