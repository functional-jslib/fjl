import {PredicateOf3} from "../jsPlatform/array";
import {SliceOf} from "../jsPlatform/slice";
import {Indexable} from "../types";

export interface List {
    concat(...fs: Array<Array<any> | string>): Array<any> | string;

    slice(startInd: number, endInd: number, list: Array<any> | string): Array<any> | string;

    includes(x: any, xs: (any[] | string | any)): boolean;

    indexOf(x: any, xs: (any[] | string | any)): number;

    lastIndexOf(x: any, xs: (any[] | string | any)): number;
}

export type PredForIndexableOf<T> = PredicateOf3<T, number, Indexable<T>>;

export type PredForSliceOf<T> = PredicateOf3<T, number, SliceOf<T>>;
