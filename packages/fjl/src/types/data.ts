/**
 * General data types used in the library.
 */

/**
 * Represents strings, arrays, and/or, any structures that contain a `length`, and number indices.
 *
 * @todo Consider using `Iterable<T>` type, instead of this type, where it makes sense.
 */
export type  NumberIndexable<T = unknown> = ({
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
 * The Slice type represents the intersection of string, array, and/or array-like, types.
 */
export interface Slice<T = any> extends Iterable<T> {
  readonly length: number;

  [index: number]: any;

  at(i: number): any;  // @note Method not supported by older versions of typescript versions.
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
 * @deprecated Use types directly.
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
