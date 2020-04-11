import {groupBy} from "../list/groupBy";
import {SliceOf} from "../jsPlatform/slice";

export const
    /**
     * The group function takes a list and returns a list of lists such that
     *  the concatenation of the result is equal to the argument. Moreover, each
     *  sublist in the result contains only equal elements. For example,
     * `group "Mississippi" = ["M","i","ss","i","ss","i","pp","i"]`
     * It is a special case of groupBy, which allows the programmer to supply
     *  their own equality test.
     * @haskellType `group :: Eq a => [a] -> [[a]]`
     * @function module:list.group
     * @param xs {Array|String}
     * @returns {Array<Array|String|*>|*}
     */
    group = <T>(xs: SliceOf<T>): SliceOf<T>[] => groupBy((a, b) => a === b, xs) as SliceOf<T>[];
