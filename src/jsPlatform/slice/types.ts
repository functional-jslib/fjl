import {Lengthable} from "../../types";
import {CurryOf1, CurryOf2, CurryOf3} from "../../function";

export type IncludesFunc = CurryOf2<string, Slice, boolean>;

export type SliceFunc = CurryOf3<number, number, Slice, Slice>;

export type IndexOfFunc = CurryOf2<any, Slice, number>;

export type LastIndexOfFunc = CurryOf2<any, Slice, number>;

export type ConcatFunc = CurryOf1<Slice, Slice>;

export interface Slice extends Lengthable {
    [index: number]: any;

    concat(...slices: Slice[]): Slice;

    slice(startIndex: number, endIndex?: number): Slice;

    includes(searchValue: any, fromIndex?: number): boolean;

    indexOf(searchValue: any, fromIndex?: number): number;

    lastIndexOf(searchValue: any, fromIndex?: number): number;
}
