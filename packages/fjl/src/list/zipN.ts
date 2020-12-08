import {curry2} from "../function/curry";
import {reduce} from "./utils/reduce";
import {toShortest} from "./utils/toShortest";
import {$push} from "./push";
import {map} from "./map";

export const
    /**
     * zipN takes one or more lists and returns a list containing lists of all indices
     * at a given index, index by index.
     * If one input list is short, excess elements of the longer list are discarded.
     * @function module:list.zipN
     * @param lists {Array|String} - One ore more lists of the same type.
     * @returns {Array}
     */
    zipN = curry2((...lists) => {
        const trimmedLists = toShortest(...lists);
        return reduce((agg, item, ind) =>
                $push(map(xs => xs[ind], trimmedLists), agg),
            [], trimmedLists[0]);
    });
