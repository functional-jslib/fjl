import {MapOp, ReduceOp} from "../platform/array";

export type MapFunc<T, Ind, M, RetT> = (x?: T, i?: Ind, xs?: M) => RetT;

export interface Mappable<T> {
    map<RetT>(fn: MapOp<T, Mappable<T>, RetT>): Mappable<RetT>;
}

export interface Foldable<T> extends Mappable<T> {
    reduce<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;

    reduceRight<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;
}

export interface Lengthable {
    readonly length: number;
}

export interface Nameable {
    readonly name: string;
}

export interface StringIndexable<T = any> {
    [index: string]: T;
}

export interface NumberIndexable<T = any> {
    [index: number]: T;
}

export type Indexable<T = any> = StringIndexable<T> | NumberIndexable<T>;

export type Slice<T = any> = T[] | string;
