import {PredicateOf3} from "../jsPlatform/array";
import {SliceOf} from "../jsPlatform/slice";
import {Indexable} from "../types";

export type PredForIndexable<T> = PredicateOf3<T, number | string, Indexable<T>>;

export type PredForSliceOf<T> = PredicateOf3<T, number | string, SliceOf<T>>;
