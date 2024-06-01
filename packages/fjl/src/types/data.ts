/**
 * General data types used in the library.
 */

/**
 * Represents types that have a `length` property, and that are "number" indexable.
 */
export type NumberIndexable<T=any> = ({
  length: number;
  [index: number]: T;
} |
  /**
   * Else support `string`, and other array types.
   */
  {
    readonly length: number;
    readonly [index: number]: any;
  });

/**
 * The Slice type represents the intersection of string, array, and/or (compatible*) array-like, types.
 *
 * *Typed array types are not compatible with this type, as they don't definitions for most of the slice methods.
 */
export interface Slice<T = any> extends Iterable<T> {
  readonly length: number;

  [index: number]: any;

  at(i: number): any;  // @note Method not supported by older versions of typescript.
  concat(...items: (Slice<T> | ConcatArray<any>)[]): this;
  includes(x: any): boolean;
  indexOf(x: any): number;
  lastIndexOf(x: any): number;
  slice(start: number, end?: number): this;
}

/**
 * @deprecated Use your own type and/or existing native/otherwise types.
 *
 * Any type that contains a "readonly" `name` (functions, et al.) property.
 */
export interface Nameable {
  readonly name: string;
}

/**
 * @deprecated - Use direct type constructors instead.
 */
export type SliceConstructor = StringConstructor | ArrayConstructor;

/**
 * @deprecated Use `NumberIndexable` instead.
 */
export interface Lengthable {
  readonly length?: number;
}

/**
 * Represents "built-in" typed arrays.
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
 * @deprecated Use constructor array types directly.
 *
 * Represents built-in Array types (Typed arrays, and `Array`).
 */
export type ArrayType<T> = {
  constructor: ArrayTypeConstructor,
} & NumberIndexable<T>

/**
 * Represents built-in Array type constructors.
 */
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
  BigUint64ArrayConstructor;
