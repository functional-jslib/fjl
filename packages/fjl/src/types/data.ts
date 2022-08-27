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
export interface StringIndexable<T> extends Lengthable {
  [index: string]: T | any;
}

/**
 * For immutable lists (strings).
 */
export interface ReadonlyNumberIndexable<T> extends Lengthable {
  readonly [index: number]: T;
}

export type NumberIndexable<T> = Lengthable & ({
  [index: number]: T;
} | ReadonlyNumberIndexable<T>);

export type Indexable<T> = StringIndexable<T> | ReadonlyNumberIndexable<T> | NumberIndexable<T>;

export type TypedArray = (
  Int8Array |
  Uint8Array |
  Int16Array |
  Uint16Array |
  Int32Array |
  Uint32Array |
  Float32Array |
  Float64Array |
  BigInt64Array |
  BigUint64Array
  ) & {
  concat(...args: (typeof this)[]): typeof this;
};

export type ArrayType<T> = Array<T> | TypedArray;

export type ArrayTypeConstructor = ArrayConstructor |
  Int8ArrayConstructor |
  Uint8ArrayConstructor |
  Int16ArrayConstructor |
  Uint16ArrayConstructor |
  Int32ArrayConstructor |
  Uint32ArrayConstructor |
  Float32ArrayConstructor |
  Float64ArrayConstructor |
  BigInt64ArrayConstructor |
  BigUint64ArrayConstructor;

export type  Slice<T> = Array<T> | string;

export type SliceConstructor = StringConstructor | ArrayTypeConstructor;

export type FunctorMapFn<T, RetT> = (a?: T, b?, c?, ...args: any[]) => RetT;

export interface FunctorConstructor<T> {
  new(x: T): Functor<T>;

  readonly prototype: Functor<T>;
}

export interface Functor<T> {
  valueOf(): T;

  map<MapRetT>(fn: FunctorMapFn<T, MapRetT>): Functor<MapRetT>;

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

  first<RetT>(fn: FunctorMapFn<A, RetT>): Bifunctor<RetT, B>;

  second<RetT>(fn: FunctorMapFn<B, RetT>): Bifunctor<A, B>;

  bimap<RetA, RetB>(fn1: FunctorMapFn<A, RetA>, fn2: FunctorMapFn<B, RetB>): Bifunctor<RetA, RetB>;
}
