import {MapOp, ReduceOp} from "../platform";

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

export interface Stringable {
  toString(): string;
}

export interface Nameable {
  readonly name: string;
}

/**
 * Indexable object type;  E.g., Used where strings, arrays and/or objects can be used.
 */
export interface StringIndexable<T = any> extends Lengthable {
  [index: string]: T | any;
}

export interface NumberIndexable<T = any> extends Lengthable {
  [index: number]: T | any;
}

export type Indexable<T = any> = StringIndexable<T> | NumberIndexable<T>;

export type Slice<T = any> = T[] | string;
