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
