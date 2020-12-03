import {length} from "../platform/object";
import {$sliceTo} from "./utils/sliceTo";
import {Slice, SliceOf} from "../platform/slice";

type Inits<T> = (xs: SliceOf<T>) => [SliceOf<T>] | SliceOf<T>;

export const
    /**
     * The inits function returns all initial segments of the argument, shortest first. For example,
     * ```
     * shallowEquals(inits('abc'), ['','a','ab','abc'])
     * ```
     */
    inits = <T>(xs: Slice<T>): Slice<T>[] | T[] => {
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
