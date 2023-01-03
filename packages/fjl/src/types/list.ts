import {Functor, Slice} from "./data";
import {TernaryPred} from "./arity";

export type ForEachOp<T = any, FtrT = any> = (x: T, i?: number | string, xs?: FtrT) => void | any;

export type MapOp<T, Ind, FtrT, RetT> = (x: T, i?: Ind, xs?: FtrT) => RetT;

export type ReduceOp<T = any, Fnctr = any, ZeroT = any> = (agg: ZeroT, x: T, i?: number | keyof Fnctr, xs?: Fnctr) => ZeroT;

export type FoldOp = ReduceOp;

export type MapAccumOp<A = any, B = any, C = any, Ind = number | string, Functor = Slice<B>> =
  (agg?: A, x?: B, i?: Ind, xs?: Functor) => [A, C];

export type PredForSlice<T = any, TS extends Slice<T> = Slice<T>> = TernaryPred<T, number, TS>;

export interface Foldable<T> extends Functor<T> {
  reduce<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;

  reduceRight<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;
}
