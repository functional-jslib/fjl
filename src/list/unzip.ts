import {foldl} from "./foldl";

export const
    /**
     * unzip transforms a list of pairs into a list of first components and a list of second components.
     * @haskellType `unzip :: [(a, b)] -> ([a], [b])`
     * @function module:list.unzip
     * @param arr {Array|*}
     * @returns {Array|*}
     */
    unzip = arr => {
        if (!arr) {
            throw new Error(`\`unzip\` expects a value.  Received ${JSON.stringify(arr)}`);
        }
        return foldl((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr);
    }
;
