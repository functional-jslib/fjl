import {PredicateOf3} from "../platform/array";
import {SliceOf} from "../platform/slice";
import {Indexable} from "../types";

export type PredForIndexable<T> = PredicateOf3<T, number | string, Indexable<T>>;

export type PredForSliceOf<T> = PredicateOf3<T, number | string, SliceOf<T>>;
