import {Binary} from "./arity";

export interface Lengthable {
  readonly length?: number;
}

export interface Nameable {
  readonly name: string;
}

export interface ToString {
  toString(): string;
}

export interface ToJSON<T = object> {
  toJSON(): T;
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

export interface SliceBase<T = any> {
  readonly length: number;

  slice(from: number, to?: number): Slice<T>;

  concat(...xs: ConcatArray<T>[] | string[] | Slice<T>[]): Slice<T>;

  indexOf(x: T, position?: number): number;

  includes(x: T, position?: number): boolean;

  lastIndexOf(x: T, position?: number): number;

  [Symbol.iterator](): Iterator<T>;
}

export type  Slice<T = any> = {
  [index in number | string]: T;
} & SliceBase<T> | {
  readonly [index: number]: T;
} & SliceBase<T>

export type FunctorMapFn<RetT> = ((a?: any, b?: any, c?: any, ...args: any[]) => RetT) |
  ((a?: any, b?: any, ...args: any[]) => RetT) | ((a?: any, ...args: any[]) => RetT);

export interface FunctorConstructor<T = any> {
  new(x: T): Functor<T>;

  readonly prototype: Functor<T>;
}

export interface Functor<T = any> {
  valueOf(): T;

  map<MapRetT>(fn: FunctorMapFn<MapRetT>): Functor<MapRetT> | Functor;

  readonly length?: number;
}

export interface ApplyConstructor<T> extends FunctorConstructor<T> {
  new(x: T): Apply<T>;

  readonly prototype: Apply<T>;
}

export interface Apply<T> extends Functor<T> {
  ap<X, RetT>(f: Functor<X>): Apply<RetT>;
}

export interface ApplicativeConstructor<T> extends ApplyConstructor<T> {
  new(x: T): Applicative<T>;

  readonly prototype: Applicative<T>;

  of<X>(value: X): Applicative<X>;

  liftA2<A extends T, B, RetT>(
    fn: Binary<A, B, RetT>,
    a: Applicative<A>,
    b: Applicative<B>
  ): Applicative<RetT>;

  apRight<A, B>(a: Applicative<A>, b: Applicative<B>): Applicative<B>;

  apLeft<A, B>(a: Applicative<A>, b: Applicative<B>): Applicative<A>;
}

export type Applicative<T> = Apply<T>;

export interface BifunctorConstructor<A, B> extends FunctorConstructor<A> {
  new(a: A, b: B): Bifunctor<A, B>;

  readonly prototype: Bifunctor<A, B>;
}

export interface Bifunctor<A, B> extends Functor<A> {
  value2Of(): B;

  first(fn: FunctorMapFn<A>): Bifunctor<A, B>;

  second(fn: FunctorMapFn<B>): Bifunctor<A, B>;

  bimap(fn1: FunctorMapFn<A>, fn2: FunctorMapFn<B>): Bifunctor<A, B>;
}
