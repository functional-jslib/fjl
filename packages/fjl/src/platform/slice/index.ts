import {ConcatFunc, IncludesFunc, IndexOfFunc, LastIndexOfFunc, SliceOf} from "./types";
import {toCurried2Method, toCurriedOneOrMoreMethod} from "../../utils";
import {curry3, CurryOf3} from "../../function";

export * from './types';

export const

    concat: ConcatFunc<unknown> =
        toCurriedOneOrMoreMethod('concat') as ConcatFunc<unknown>,
    indexOf: IndexOfFunc<any> =
        toCurried2Method('indexOf') as IndexOfFunc<any>,

    includes = toCurried2Method('includes') as IncludesFunc<any>,

    lastIndexOf: LastIndexOfFunc<unknown> =
        toCurried2Method('lastIndexOf') as LastIndexOfFunc<unknown>,

    /**
     * (Array|String).prototype.slice
     */
    $slice = <T>(start: number, end: number, xs: SliceOf<T>): SliceOf<T> =>
        xs.slice(start, end) as SliceOf<T>,

    /**
     * (Array|String).prototype.slice
     */
    slice = curry3($slice) as CurryOf3<number, number, SliceOf<any>, SliceOf<any>>

;

