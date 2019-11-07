/**
 * Reverses a list.
 * @function module:jsPlatform/array.reverse
 * @param xs {any[]}
 * @return {any[]}
 */
import {Reverse} from "./types";

const reverse: Reverse<any[]> = (
    (): Reverse<any[]> =>
        Array.prototype.reverse ?
            (xs: any[]): any[] => xs.reverse() :
            (xs: any[]): any[] => xs.reduceRight((agg, item) => {
                agg.push(item);
                return agg;
            }, [])
)();

export default reverse;
