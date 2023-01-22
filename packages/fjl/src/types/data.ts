import {Binary} from "./arity";

/**
 * @deprecated Use `NumberIndexable` instead.
 */
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

export type  NumberIndexable<T = any> = ({
  length: number;
  [index: number]: T;
} |
  /**
   * Support for `string` type
   */
  {
    readonly length: number;
    readonly [index: number]: any;
  });

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
  concat(...args: ConcatArray<any>[]): any;
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

/**
 * `Union + Sum` Slice type - Represents, the intersection, of the string,
 * array, and custom structure, types that match the `Slice` "summed" interfaces -
 * Basically a type for representing string, and/or "array structure" like types.
 *
 * @deprecated Used direct types (as required) instead.
 */
export type Slice<T = any> = string | T[];

/**
 * @deprecated - Use direct type constructors instead.
 */
export type SliceConstructor = StringConstructor | ArrayConstructor;

export type FunctorMapOp<T, RetT> = (a?: T, b?: any, c?: Functor<T>, ...rest: any[]) => RetT;

export interface FunctorConstructor<T> {
  new(x: T): Functor<T>;

  readonly prototype: Functor<T>;
}

export interface Functor<T> {
  valueOf(): T;

  map<RetT>(fn: FunctorMapOp<T, RetT>): Functor<RetT>;

  readonly length?: number;
}

export interface ApplyConstructor<T> extends FunctorConstructor<T> {
  new(x: T): Apply<T>;

  readonly prototype: Apply<T>;
}

export interface Apply<T> extends Functor<T> {
  ap<T, RetT>(f: Functor<T>): Apply<RetT>;
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

  first<RetT>(fn: FunctorMapOp<A, RetT>): Bifunctor<RetT, B>;

  second<RetT>(fn: FunctorMapOp<B, RetT>): Bifunctor<A, B>;

  bimap<RetA, RetB>(fn1: FunctorMapOp<A, RetA>, fn2: FunctorMapOp<B, RetB>): Bifunctor<RetA, RetB>;
}
