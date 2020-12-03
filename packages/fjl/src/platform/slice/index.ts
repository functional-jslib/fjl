import {ConcatFunc, IncludesFunc, IndexOfFunc, LastIndexOfFunc, Slice, SliceOf} from "./types";
import {toCurried2Method, toCurriedOneOrMoreMethod} from "../../utils";
import {curry3, CurryOf3} from "../../function";

export * from './types';

export const

    concat = toCurriedOneOrMoreMethod('concat') as ConcatFunc<any>,

    indexOf = toCurried2Method('indexOf') as IndexOfFunc<any>,

    includes = toCurried2Method('includes') as IncludesFunc<any>,

    lastIndexOf = toCurried2Method('lastIndexOf') as LastIndexOfFunc<any>,

    /**
     * (Array|String).prototype.slice
     */
    $slice = <T>(start: number, end: number, xs: Slice<T>): Slice<T> =>
        xs.slice(start, end) as Slice<T>,

    /**
     * (Array|String).prototype.slice
     */
    slice = curry3($slice) as CurryOf3<number, number, Slice, Slice>

;

