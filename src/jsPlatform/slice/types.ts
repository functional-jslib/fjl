import {Lengthable} from "../../types";

import {CurryOf1, CurryOf2, CurryOf3} from "../../function";

export type IncludesFunc = CurryOf2<string, SliceOf<any>, boolean>;

export type SliceFunc = CurryOf3<number, number, SliceOf<any>, SliceOf<any>>;

export type IndexOfFunc = CurryOf2<any, SliceOf<any>, number>;

export type LastIndexOfFunc = CurryOf2<any, SliceOf<any>, number>;

export type ConcatFunc = CurryOf1<SliceOf<any>, SliceOf<any>>;

export interface SliceOf<T> extends Lengthable, Object {
    [index: number]: T;

    concat(...slices: ConcatArray<T>[]): SliceOf<T>;

    slice(startIndex: number, endIndex?: number): SliceOf<T>;

    includes(searchValue: T, fromIndex?: number): boolean;

    indexOf(searchValue: T, fromIndex?: number): number;

    lastIndexOf(searchValue: T, fromIndex?: number): number;

    [Symbol.iterator](): IterableIterator<T>;
}
