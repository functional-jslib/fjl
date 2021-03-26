export type PredicateOf3<Tx, Ti, Txs> = (x: Tx, i?: Ti, xs?: Txs) => boolean;

export type ForEachOp<T, FtrT> = (x: T, i?: number | string, xs?: FtrT) => void | any;

export type MapOp<T, FtrT, RetT> = (x: T, i?: number | string, xs?: FtrT) => RetT;

export type ReduceOp<T, FtrT, ZeroT> = (agg: ZeroT, x: T, i?: number | string, xs?: FtrT) => ZeroT;

export type Predicate<T, FtrT> = (x: T, i?: number | string | T, xs?: FtrT) => boolean;
