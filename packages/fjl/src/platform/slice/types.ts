import {CurryOf1, CurryOf2, CurryOf3} from "../../function";
import {TernaryPredOf} from "../../types";

export type IncludesFunc<T> = CurryOf2<T, SliceOf<T>, boolean>;

export type SliceFunc<T> = CurryOf3<number, number, SliceOf<T>, SliceOf<T>>;

export type IndexOfFunc<T> = CurryOf2<T, SliceOf<T>, number>;

export type LastIndexOfFunc<T> = CurryOf2<T, SliceOf<T>, number>;

export type ConcatFunc<T> = CurryOf1<SliceOf<T>, SliceOf<T>>;

export type SlicePred<T> = TernaryPredOf<T, number, SliceOf<T>>;

export type SliceOf<T> = T[] | string;

export type Slice<T = string> = T[] | string;
