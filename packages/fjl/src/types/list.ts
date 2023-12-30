import {NumberIndexable, Slice} from "./data";
import {TernaryPred} from "./arity";

// @todo Normalize these types - They should accept same type params instead of mixed length params.

export type ForEachOp<T = any, FtrT = any> = (x: T, i?: number | keyof FtrT, xs?: FtrT) => void | any;

export type MapOp<T = any, FtrT = any> = (x: T, i?: number | keyof FtrT, xs?: FtrT) => FtrT;

export type ReduceOp<T = any, FnctrT = any, ZeroT = any> = (agg: ZeroT, x?: T, i?: number | keyof FnctrT, xs?: FnctrT) => ZeroT;

export type MapAccumOp<A = any, B = any, C = any, Ind = number | string, Functor = Slice<B>> =
  (agg?: A, b?: B, i?: Ind, bs?: Functor) => [A, C];

/**
 * @todo Should this be `PredForNumIndexable`, instead?
 */
export type PredForSlice<T = any, TS extends NumberIndexable<T> = NumberIndexable<T>> = TernaryPred<T, number, TS>;
