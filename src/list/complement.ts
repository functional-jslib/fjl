import {curry2, CurryOf2} from "../function/curry";
import {reduce} from "./utils";
import {append} from "./append";
import {difference} from "./difference";
import {SliceOf} from "../jsPlatform/slice/types";

export type Complement<Functor> = CurryOf2<Functor, Functor, Functor>

export const

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:list.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = curry2((arr0: SliceOf<any>, ...arrays: SliceOf<any>[]): any =>
        reduce((agg, arr) => append(agg, difference(arr, arr0) as SliceOf<any>), [], arrays)
    ) as Complement<SliceOf<any>>;
