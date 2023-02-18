import {Binary, Ternary} from "./arity";

export interface Nameable {
  readonly name: string;
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
    readonly [index: number]: any; // for `String`/`string`, type here
    // should actually be `string`, this is too strict, however, for
    // a Sum type so `any` is used instead (works fine)
    // interchangeably targeting `string`, and/or `Array` types.
  });

/**
 * `Union + Sum` Slice type - Represents, the intersection, of the string,
 * array, and custom structure, types that match the `Slice` "summed" interfaces -
 * Basically a type for representing string, and/or "array structure" like types.
 */
export type Slice<T = any> = string | T[];

/**
 * @deprecated - Use direct type constructors instead.
 */
export type SliceConstructor = StringConstructor | ArrayConstructor;

export type FunctorMapOp<T = any, RetT = any> =
  (a?: T, b?: keyof Functor<T>, c?: Functor<T>, ...rest: any[]) => RetT;

export interface FunctorConstructor<T> {
  new(x: T): ThisType<T>;

  readonly prototype: ThisType<T>;
}

export interface Functor<T = any> {
  valueOf(): T;

  map<RetT = any>(fn: Ternary<T, keyof this, this, RetT>): ThisType<T>;

  readonly length?: number;
}

export interface ApplyConstructor<T> extends FunctorConstructor<T> {
  new(x: T): ThisType<T>;

  readonly prototype: ThisType<T>;
}

export interface Apply<T = any> extends Functor<T> {
  ap<T, RetT>(f: Functor<T>): ThisType<RetT>;
}

export interface ApplicativeConstructor<T = any> extends ApplyConstructor<T> {
  new(x: T): ThisType<T>;

  readonly prototype: ThisType<T>;

  of<X>(value: X): ThisType<X>;

  liftA2<A extends T, B, RetT>(
    fn: Binary<A, B, RetT>,
    a: Applicative<A>,
    b: Applicative<B>
  ): Applicative<RetT>;

  apRight<A, B>(a: Applicative<A>, b: Applicative<B>): ThisType<B>;

  apLeft<A, B>(a: Applicative<A>, b: Applicative<B>): ThisType<A>;
}

export type Applicative<T = any> = Apply<T>;

export interface BifunctorConstructor<A = any, B = any> extends FunctorConstructor<A> {
  new(a: A, b: B): Bifunctor<A, B>;

  readonly prototype: Bifunctor<A, B>;
}

export interface Bifunctor<A = any, B = any> extends Functor<A> {
  value2Of(): B;

  first<RetT>(fn: FunctorMapOp<A, RetT>): Bifunctor<RetT, B>;

  second<RetT>(fn: FunctorMapOp<B, RetT>): Bifunctor<A, B>;

  bimap<RetA, RetB>(fn1: FunctorMapOp<A, RetA>, fn2: FunctorMapOp<B, RetB>): Bifunctor<RetA, RetB>;
}


/**
 * @deprecated Use `NumberIndexable` instead.
 */
export interface Lengthable {
  readonly length?: number;
}

/**
 * @deprecated Use types directly.
 */
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

/**
 * @deprecated Use types directly.
 */
export type ArrayType<T> = Array<T> | TypedArray;

/**
 *  @deprecated Use types directly.
 */
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
