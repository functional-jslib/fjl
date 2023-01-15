import {Functor, Slice} from "./data";
import {TernaryPred} from "./arity";

// @todo Normalize these types - They should accept same type params instead mixed length params.

export type ForEachOp<T = any, FtrT = any> = (x: T, i?: number | keyof FtrT, xs?: FtrT) => void | any;

export type MapOp<T = any, FtrT = any, RetT = any> = (x: T, i?: number | keyof FtrT, xs?: FtrT) => RetT;

export type ReduceOp<T = any, FnctrT = any, ZeroT = any> = (agg: ZeroT, x?: T, i?: number | keyof FnctrT, xs?: FnctrT) => ZeroT;

export type FoldOp = ReduceOp;

export type MapAccumOp<A = any, B = any, C = any, Ind = number | string, Functor = Slice<B>> =
  (agg?: A, x?: B, i?: Ind, xs?: Functor) => [A, C];

export type PredForSlice<T = any, TS extends Slice<T> = Slice<T>> = TernaryPred<T, number, TS>;

export interface Foldable<T> extends Functor<T> {
  reduce<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;

  reduceRight<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;
}
