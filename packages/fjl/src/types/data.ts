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
  [index: string]: T;
}

export type StringAndOrNumberIndexable<T = any> = Lengthable & {
  [index in number | string]: T;
}

/**
 * For immutable lists (strings).
 */
export interface ReadonlyNumberIndexable<T = any> extends Lengthable {
  readonly [index: number]: T;
}

export type NumberIndexable<T = any> = Lengthable & ({
  [index: number]: T;
} | ReadonlyNumberIndexable<T> | {
  [index in number | string]: T;
}) & {
  new(...args: any[]): NumberIndexable<T>
};

export type Indexable<T = any> = StringIndexable<T> | NumberIndexable<T>;

export type TypedArray =
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
  ;

export type ArrayType<T = any> = Array<T> | TypedArray & {
  concat(...xs: ConcatArray<T>[]): typeof this;
  concat(...items: (T | ConcatArray<T>)[]): typeof this;
};

export type ArrayTypeConstructor =
  ArrayConstructor |
  Int8ArrayConstructor |
  Uint8ArrayConstructor |
  Int16ArrayConstructor |
  Uint16ArrayConstructor |
  Int32ArrayConstructor |
  Uint32ArrayConstructor |
  Float32ArrayConstructor |
  Float64ArrayConstructor |
  BigInt64ArrayConstructor |
  BigUint64ArrayConstructor
  ;

export interface SliceBase<T = any> {
  readonly length: number;

  slice(from: number, to?: number): typeof this;

  // @note Concat methods left out here since they're the only ones with differing types between
  // 'slice like' variants (string, TypedArray, etc.).

  indexOf(x: T, position?: number): number;

  includes(x: T, position?: number): boolean;

  lastIndexOf(x: T, position?: number): number;

  [Symbol.iterator](): IterableIterator<T>;
}

export type  Slice<T = any> = ArrayType<T> | string;

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
