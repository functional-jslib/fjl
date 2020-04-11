import {SliceFunc, SliceOf} from "./types";
import {curry3, CurryOf3} from "../../function";

const

    /**
     * (Array|String).prototype.slice
     * @function module:list.slice
     * @returns {SliceOf<any>>}
     * @param start {number}
     * @param end {number}
     * @param xs {SliceOf<any>}
     * @genric
     */
    $slice = <T>(start: number, end: number, xs: SliceOf<T>): SliceOf<T> =>
        xs.slice(start, end) as SliceOf<T>,

    /**
     * (Array|String).prototype.slice
     * @function module:list.slice
     * @returns {SliceOf<any>>}
     * @param start {number}
     * @param end {number}
     * @param xs {SliceOf<any>}
     * @curried
     * @generic
     */
    slice = curry3($slice) as CurryOf3<number, number, SliceOf<any>, SliceOf<any>>

;

export {$slice};

export default slice;
