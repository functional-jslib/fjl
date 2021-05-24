import {PredicateOf3} from "../platform";
import {Slice} from "../types/data";
import {Indexable} from "../types";

export type PredForIndexable<T = any> = PredicateOf3<T, number | string, Indexable<T>>;

export type PredForSlice<T = any> = PredicateOf3<T, number | string, Slice<T>>;
