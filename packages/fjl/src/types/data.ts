import {MapOp, ReduceOp} from "../platform/array";
import {SliceOf} from "../platform/slice";

export type MapFunc<T, Ind, M, RetT> = (x?: T, i?: Ind, xs?: M) => RetT;

export interface Mappable<T> {
    map<RetT>(fn: MapOp<T, Mappable<T>, RetT>): Mappable<RetT>;
}

export interface Foldable<T> extends Mappable<T>, SliceOf<T> {
    reduce<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;

    reduceRight<RetT>(fn: ReduceOp<T, Foldable<T>, RetT>): RetT;
}

export interface Lengthable {
    readonly length: number;
}

export interface Sizeable {
    readonly size: number;
}

export interface Nameable {
    readonly name: string;
}

export interface StringIndexable<T> {
    [index: string]: T;
}

export interface NumberIndexable<T> {
    [index: number]: T;
}

export type Indexable<T> = StringIndexable<T> | NumberIndexable<T>;

export type Num = number;
