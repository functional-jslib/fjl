import {ArrayTernaryPred, Slice, Indexable} from "../types";

export type PredForIndexable<T = any> = ArrayTernaryPred<T, number | string, Indexable<T>>;

export type PredForSlice<T = any> = ArrayTernaryPred<T, number | string, Slice<T>>;
