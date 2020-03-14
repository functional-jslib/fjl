import {CurryOf1, CurryOf2, CurryOf3} from "../../function";

export type IncludesFunc<T> = CurryOf2<T, SliceOf<T>, boolean>;

export type SliceFunc<T> = CurryOf3<number, number, SliceOf<T>, SliceOf<T>>;

export type IndexOfFunc<T> = CurryOf2<T, SliceOf<T>, number>;

export type LastIndexOfFunc<T> = CurryOf2<T, SliceOf<T>, number>;

export type ConcatFunc<T> = CurryOf1<SliceOf<T>, SliceOf<T>>;

export interface SliceOf<T> extends Object {
    [index: number]: T;

    readonly length: number;

    concat(...slices: ConcatArray<T>[]): SliceOf<T>;

    slice(startIndex: number, endIndex?: number): SliceOf<T>;

    includes(searchValue: T, fromIndex?: number): boolean;

    indexOf(searchValue: T, fromIndex?: number): number;

    lastIndexOf(searchValue: T, fromIndex?: number): number;

    [Symbol.iterator](): IterableIterator<T>;
}
