import {CurryOf2, CurryOf3} from "../../function";
import {Unary} from "../../types";

export type PredicateOf3<Tx, Ti, Txs> = (x?: Tx, i?: Ti, xs?: Txs) => boolean;

export type ForEach<T, FtrT> = CurryOf2<ForEachOp<T, FtrT>, FtrT, void | any>

export type ForEachOp<T, FtrT> = (x?: T, i?: number | string, xs?: FtrT) => void | any;

export type Every<T, FtrT> = CurryOf2<PredicateOf3<T, number | string, FtrT>, FtrT, boolean>

export type Filter<T, FtrT> = CurryOf2<PredicateOf3<T, number | string, FtrT>, FtrT, FtrT>;

export type Join<Separator, FtrT, RetT> = CurryOf2<Separator, FtrT, RetT>;

export type MapOp<T, FtrT, RetT> = (x?: T, i?: number | string, xs?: FtrT) => RetT;

export type MapType<T, FtrT, T2, FtrT2> = CurryOf2<MapOp<T, FtrT, T2>, FtrT, FtrT2>;

export type Reduce<T, FtrT, ZeroT> = CurryOf3<ReduceOp<T, FtrT, ZeroT>, ZeroT, FtrT, ZeroT>;

export type ReduceOp<T, FtrT, ZeroT> = (agg?: ZeroT, x?: T, i?: number | string, xs?: FtrT) => ZeroT;

export type Reverse<FtrT> = Unary<FtrT>;

export type Some<T, FtrT> = CurryOf2<PredicateOf3<T, number | string, FtrT>, FtrT, boolean>

export type Predicate<T, FtrT> = (x?: T, i?: number | string | T, xs?: FtrT) => boolean;

export type Push<T, FtrT> = CurryOf2<T, FtrT, number>;
