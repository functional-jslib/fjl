import {Lengthable} from "../../types";
import {CurryOf1, CurryOf2, CurryOf3} from "../../function";

export type IncludesFunc = CurryOf2<string, SliceOf<any>, boolean>;

export type SliceFunc = CurryOf3<number, number, SliceOf<any>, SliceOf<any>>;

export type IndexOfFunc = CurryOf2<any, SliceOf<any>, number>;

export type LastIndexOfFunc = CurryOf2<any, SliceOf<any>, number>;

export type ConcatFunc = CurryOf1<SliceOf<any>, SliceOf<any>>;

export interface Slice extends Lengthable, Object {
    [index: number]: any;

    concat(...slices: ConcatArray<any>[]): SliceOf<any>;

    slice(startIndex: number, endIndex?: number): SliceOf<any>;

    includes(searchValue: any, fromIndex?: number): boolean;

    indexOf(searchValue: any, fromIndex?: number): number;

    lastIndexOf(searchValue: any, fromIndex?: number): number;
}

export interface SliceOf<T> extends Slice {
    [index: number]: T;
    [Symbol.iterator](): T;
}

export type SliceOfAny = SliceOf<any>;