import {length} from "../jsPlatform/object";
import {lengths} from "./utils";
import {filter} from "../list/filter";
import {maximum} from "../list/maximum";

/**
 * Transposes rows and columns into lists by index;  E.g.,
 * Haskell example:
 * ```
 *  transpose [[1,2,3],[4,5,6]] == [[1,4],[2,5],[3,6]]
 *
 *  -- Notice the shorter arrays are ignored after their last index is copied over:
 *  transpose [[10,11],[20],[],[30,31,32]] == [[10,20,30],[11,31],[32]]
 * ```
 * @note from columns to rows.
 * @note Empty lists are ignored.
 * @haskellType `transpose :: [[a]] -> [[a]]`
 * @function module:list.transpose
 * @param xss {Array}
 * @returns {Array}
 */
export const transpose = (xss: Array<any[]> | []): Array<any[]> | [] => {
    let numLists = length(xss),
        ind = 0, ind2;
    if (!numLists) {
        return [];
    }
    const listLengths = lengths(...xss),
        longestListLen = maximum(listLengths),
        outLists: [any[]] | any[] = [];
    for (; ind < longestListLen; ind += 1) {
        const outList: any[] = [];
        for (ind2 = 0; ind2 < numLists; ind2 += 1) {
            if (listLengths[ind2] < ind + 1) {
                continue;
            }
            outList.push(xss[ind2][ind]);
        }
        outLists.push(outList);
    }
    return filter(x => length(x) > 0, outLists);
};
