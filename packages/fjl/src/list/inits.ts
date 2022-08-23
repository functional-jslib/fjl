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
        const limit = xs.length,
            agg: [any[]] | any[] = [];
        let ind = 0;
        if (!limit) {
            return [];
        }
        for (; ind <= limit; ind += 1) {
            agg.push(xs.slice(0, ind));
        }
        return agg as unknown as TS[] | T[];
    };
