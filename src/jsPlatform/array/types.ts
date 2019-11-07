import {CurryOf2, CurryOf3} from "../../function";
import {Unary} from "../../types";

export type ForEach<T, Ftr> = CurryOf2<ForEachOp<T, Ftr>, Ftr, void | any>

export type ForEachOp<T, Ftr> = (x?: T, i?: number, xs?: Ftr) => void | any;

export type Every<T, Ftr> = CurryOf2<Predicate<T, Ftr>, Ftr, boolean>

export type Filter<T, Ftr> = CurryOf2<Predicate<T, Ftr>, Ftr, Ftr>;

export type Join<Separator, Ftr, RetT> = CurryOf2<Separator, Ftr, RetT>;

export type MapOp<T, Ftr, RetT> = (x?: T, i?: number, xs?: Ftr) => RetT;

export type MapType<T, Ftr, T2, Ftr2> = CurryOf2<MapOp<T, Ftr, T2>, Ftr, Ftr2>;

export type Reduce<T, Ftr, ZeroT> = CurryOf3<ReduceOp<T, Ftr, ZeroT>, ZeroT, Ftr, ZeroT>;

export type ReduceOp<T, Ftr, ZeroT> = (agg?: ZeroT, x?: T, i?: number, xs?: Ftr) => ZeroT;

export type Reverse<Ftr> = Unary<Ftr>;

export type Some<T, Ftr> = CurryOf2<Predicate<T, Ftr>, Ftr, boolean>

export type Predicate<T, Ftr> = (x?: T, i?: number | T, xs?: Ftr) => boolean;

export type Push<T, Ftr> = CurryOf2<T, Ftr, number>;
