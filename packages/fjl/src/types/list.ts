import {NumberIndexable, Slice} from "./data";
import {TernaryPred} from "./arity";

/**
 * @deprecated Use `Ternary` type instead.
 *
 * Foreach operation function type.
 */
export type ForEachOp<T, IterT extends Iterable<T>> = (x: T, i?: number | keyof IterT, xs?: IterT) => void | any;

/**
 * @deprecated Use `Ternary` instead.
 *
 * Map operation function type.
 */
export type MapOp<T = any, FtrT = any, FtrT2 extends FtrT = any> = (x: T, i?: number | keyof FtrT, xs?: FtrT) => FtrT2;

/**
 * @deprecated Use `Quaternary` instead.
 *
 * Reduce operation function type.
 */
export type ReduceOp<T=any, FtrT=any, ZeroT=any> =
  (agg: ZeroT, x?: T, i?: number | keyof FtrT, xs?: FtrT) => ZeroT;

/**
 * "Map + Accumulate", A.K.A. Map-Reduce, function type.
 */
export type MapAccumOp<AccumVal=any, B=any, MapOfB=any, Index=number|string, SliceOfBs extends Slice<B>=Slice<B>> =
  (agg?: AccumVal, b?: B, i?: Index, bs?: SliceOfBs) => [AccumVal, MapOfB];

/**
 * @deprecated Use `TernaryPred` instead.
 *
 * Predicate for Slice operation func type.
 * @todo Should this be `PredForNumIndexable`, instead?
 */
export type PredForSlice<T = any, TS extends NumberIndexable<T> = NumberIndexable<T>> = TernaryPred<T, number, TS>;
