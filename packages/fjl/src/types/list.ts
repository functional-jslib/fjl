import {ArrayType, Functor, Indexable, NumberIndexable, Slice} from "./data";
import {TernaryPred} from "./arity";

export type ArrayTernaryPred<T, Ind = number | string, FtrT extends Slice<T> = Slice<T>> = (x: T, i?: Ind, xs?: FtrT) => boolean;
export type IndexableTernaryPred<T, Ind = number | string, FtrT extends Indexable<T> = Indexable<T>> = (x: T, i?: Ind, xs?: FtrT) => boolean;

export type ForEachOp<T, FtrT> = (x: T, i?: number | string, xs?: FtrT) => void | any;

export type MapOp<T, Ind, FtrT, RetT> = (x: T, i?: Ind, xs?: FtrT) => RetT;

export type ReduceOp<T, FtrT, ZeroT> = (agg: ZeroT, x: T, i?: number | keyof FtrT, xs?: FtrT) => ZeroT;

export type MapAccumOp<A = any, B = any, C = any, Ind = number | string, Functor = Slice<B>> =
  (agg?: A, x?: B, i?: Ind, xs?: Functor) => [A, C];

export type PredForIndexable<T = any> = IndexableTernaryPred<T, number | string, Indexable<T>>;
export type PredForNumIndexable<T = any> = TernaryPred<T, number, NumberIndexable<T>>;

export type PredForArray<T = any> = TernaryPred<T, number, T[]>;
export type PredForArrayType<T, TS extends ArrayType<T>> = TernaryPred<T, number, TS>;

export type PredForSlice<T = any, T2 extends Slice<T> = Slice<T>> =
  ArrayTernaryPred<T, number | string, T2>;

export interface Foldable<T> extends Functor<T> {
  reduce<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;

  reduceRight<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;
}
