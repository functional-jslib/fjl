import {Functor, Indexable, Slice} from "./data";

export type ArrayTernaryPred<T, Ind = number | string, FtrT = any> = (x: T, i?: Ind, xs?: FtrT) => boolean;

export type ForEachOp<T, FtrT> = (x: T, i?: number | string, xs?: FtrT) => void | any;

export type MapOp<T, Ind, FtrT, RetT> = (x: T, i?: Ind, xs?: FtrT) => RetT;

export type ReduceOp<T, FtrT, ZeroT> = (agg: ZeroT, x: T, i?: number | string, xs?: FtrT) => ZeroT;

export type MapAccumOp<T, ZeroT, Ind = any, Functor = Slice<T>> =
  (agg?: ZeroT, x?: T, i?: Ind, xs?: Functor) => [ZeroT, ZeroT];

export type PredForIndexable<T = any> = ArrayTernaryPred<T, number | string, Indexable<T>>;

export type PredForSlice<T = any> = ArrayTernaryPred<T, number | string, Slice<T>>;

export interface Foldable<T> extends Functor<T> {
  reduce<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;

  reduceRight<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;
}
