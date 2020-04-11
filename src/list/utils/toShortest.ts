import {curry2, CurryOf2} from "../../function";
import {lengths} from "./lengths";
import {map} from "../map";
import {$sliceTo} from "./sliceTo";
import {sliceCopy} from "./sliceCopy";

export const

    /**
     * Trims all lists to shortest in `lists`.
     * @function module:listUtils.$toShortest
     * @param lists {...any[]}
     * @return {any[][]}
     */
    $toShortest = <T>(...lists: T[][]): T[][] => {
        const listLengths = lengths(...lists),
            smallLen = Math.min(...listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            $sliceTo(smallLen, list) : sliceCopy(list), lists);
    },

    /**
     * Returns a list of lists trimmed to the shortest length in given list of lists.   @background This method is used by the `zip*` functions to achieve their
     *  'slice to smallest' functionality.
     * @function module:listUtils.toShortest
     * @param lists {...(SliceOf<any>)}
     * @returns {SliceOf<any>}
     * @curried At two or more.
     */
    toShortest = curry2($toShortest) as CurryOf2<any, any, [any[]]>

;
