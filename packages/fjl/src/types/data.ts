/**
 * General data types used in the library.
 */

/**
 * Any type that contains a "readonly" `name` (functions, et al.) property.
 */
export interface Nameable {
  readonly name: string;
}

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
   * Else support `string`.
   */
  {
    readonly length: number;
    readonly [index: number]: any; // Even though string variant type here
    // should actually be `string`, this is too strict for
    // a Sum type so `any` is used instead - this allows
    // `string`, and/or `Array` types, to be used where `NumberIndexable` type is required,
    // interchangeably.
  });

/**
 * `Union + Sum` Slice type - Represents, the intersection, of the string,
 * array, and custom structure, types that match the `Slice` "summed" interfaces -
 * Basically a type for representing string, and/or "array structure" types.
 */
export type Slice<T = any> = string | T[];

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
