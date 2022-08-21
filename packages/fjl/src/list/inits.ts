import {length} from "./length";
import {sliceTo} from "./utils/sliceTo";
import {Slice} from "../types";

export const
    /**
     * The inits function returns all initial segments of the argument (shortest first).  For example:
     *
     * ```
     * shallowEquals(inits('abc'), ['','a','ab','abc'])
     * ```
     */
    inits = <T, TS extends Slice<T>>(xs: TS): TS[] | T[] => {
        const limit = length(xs),
            agg: [any[]] | any[] = [];
        let ind = 0;
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(sliceTo(ind, xs));
        }
        return agg as unknown as TS[] | T[];
    };
