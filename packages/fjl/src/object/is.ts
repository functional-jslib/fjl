/**
 * @module fjl/object/is
 */

import {typeOf} from './typeOf';
import {$instanceOf, instanceOf, keys} from '../platform/object';
import {Constructable, TypeConstructor, TypeRef} from "../types";

export * from './isset';

// Used for 'isConstructablePrimitive', checks, etc.
const _primitive_constructors = Object.freeze([
    String, Number, BigInt, Boolean, Symbol
  ]) as readonly Constructable[],
  _classPrefixRegex = /^\s{0,3}class\s{1,3}/,

  /**
   * Generator function constructor.
   * @ref https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
   */
  GeneratorFunction = () => function* () {}.constructor
;

export const

  /**
   * Returns a boolean indicating whether passed in value is nullish (`undefined`, or `null`) or not.
   */
  isNullish = (x: any): boolean => x === null || x === undefined,

  /**
   * Returns a boolean indicating whether passed in value is not nullish (`undefined`, or `null`) or vice-versa.
   */
  notNullish = (x: any): boolean => !isNullish(x),

  /**
   * Returns whether a value is a function or not.
   */
  isFunction = (x: any): boolean => instanceOf(x, Function),

  /**
   * Returns bool indicating whether a value is a generator function or not.
   */
  isGeneratorFunction = (x: any) => instanceOf(x, GeneratorFunction as unknown as TypeConstructor),

  /**
   * Special case of `instanceOf` where the method checks if given value contains a constructor equal
   * to one of the passed in ones, or if the value is an instance of one of the passed in ones.
   *
   * @note Use care when checking for `Object` types, since `Array` instances
   *  are considered instances of the `Object`, etc.
   *
   * ```typescript
   * // Can accept multiple types to check against, and correctly matches primitive
   * // literals (strings, numbers, bigints, etc.).
   * instanceOfSome('hello', Array, Number, String) === true // since string literal's constructor is `String`
   *
   * // Can check against primitive constructable types
   * instanceOfSome(new String('hello'), String) === true // is instance of `String`
   * instanceOfSome(99, Number) === true             // has matching constructor
   * instanceOfSome(new Number(99), Number) === true // is instance of `Number`
   * instanceOfSome(99n, BigInt, Number) === true    // has constructor matching `BigInt`
   * instanceOfSome([], Object) === true             // is instance of `Object`.
   * instanceOfSome([], Array) === true              // ...
   * instanceOfSome({}, Object) === true             // ...
   * ```
   */
  instanceOfSome = (x: any, ...types: Constructable[]): boolean =>
    types.some(t => instanceOf(x, t)),

  /**
   * Checks if `value` is an es2015 (user defined) `class`.
   */
  isClass = (x: any): boolean => x && _classPrefixRegex.test((x + '').substring(0, 11)),

  /**
   * Returns a boolean denoting whether a value is callable or not.
   */
  isCallable = (x: any): boolean => isFunction(x) && !isClass(x),

  /**
   * Checks if value is an array (proxy for `Array.isArray` method).
   */
  {isArray} = Array,

  /**
   * Checks whether value is 'strictly' an object (pojo) or not.
   */
  isObject = (x: any) => x?.constructor === Object,

  /**
   * Checks if value is a boolean.
   */
  isBoolean = (x: any) => x?.constructor === Boolean,

  /**
   * Checks if value is not `NaN`, and is a number, and/or a bigint.
   *
   * ```typescript
   * isNumber(99) === true;
   * isNumber(99n) === true; // BigInt check
   * isNumber(NaN) === false;
   *
   * // Also works for constructed numbers
   * isNumber(new Number(99)) === true;
   * isNumber(new BigInt(99)) === true;
   * ```
   */
  isNumber = (x: any) => notNullish(x) &&
    !Number.isNaN(x) && (
      x.constructor === Number ||
      x.constructor === BigInt
    ),

  /**
   * Checks whether given value is an `BigInt`, and, not `NaN`.
   */
  isBigInt = (x: any) => notNullish(x) && !Number.isNaN(x) && x.constructor === BigInt,

  /**
   * Checks whether value is a string or not.
   */
  isString = (x: any) => x?.constructor === String,

  /**
   * Checks if value is undefined.
   */
  isUndefined = (x: any) => x === undefined,

  /**
   * Checks if value is null.
   */
  isNull = (x: any) => x === null,

  /**
   * Checks if value is a `Symbol` instance.
   */
  isSymbol = (x: any) => x?.constructor === Symbol,

  /**
   * Returns `true` if given value is one of the seven native javascript
   * immutable primitives; e.g., if is one of `String`, `Boolean`, `Number`,
   * `BigInt`, `Symbol`, `null`, and/or, `undefined`.
   */
  isPrimitive = (x: any): boolean => {
    if (isNullish(x)) return true;
    const {constructor: xConstructor} = x;
    return _primitive_constructors
      .some(type => type.constructor === xConstructor || x instanceof type);
  },

  /**
   * Checks if given value is not `null`, not `undefined`, and is a constructable primitive (
   *  e.g., instance/literal of one of `String`, `Boolean`, `Number`, `BigInt`, and/or, `Symbol`);
   */
  isConstructablePrimitive = (x: any): boolean =>
    isNullish(x) ? false : instanceOfSome(x, ..._primitive_constructors),

  /**
   * Safe (doesn't error out on nullish value)  check for enumerable properties on given value.
   *
   * @todo write tests.
   */
  containsEnumerables = (x: any): boolean => notNullish(x) && keys(x).length > 0,

  /**
   * Checks if passed in value is falsy, an empty array,
   * an empty es6 collection object (Map, Set, etc.),
   * and/or, contains no enumerable properties/is an empty object (of
   * any type).
   */
  isEmpty = (x: any): boolean => {
    // if '', `0`/`0n`, `null`, `undefined`, `NaN`, or `false` then value is empty
    if (!x) return true;

    switch (x.constructor) {
      // If is a constructable primitive, it's not empty (at this point)
      case String:
      case Number:
      case BigInt:
      case Boolean:
      case Symbol:
        return false;
      default:
        if (instanceOfSome(x, Map, Set, WeakSet, WeakMap)) return !x.size;

        if (x.length) return false;

        // Else check if object doesn't contain enumerable properties
        return !keys(x).length;
    }
  },

  /**
   * Resolves/normalizes a type name from either a string or a constructor.
   *
   * @deprecated - Compare instance type (via `instanceOf`, etc.), or type names directly.
   *
   * @todo write tests for this function.
   */
  toTypeRef = (type: TypeRef): TypeRef => {
    const typeOfType = typeOf(type);

    if (typeOfType === String.name) {
      return type;
    } else if (isNullish(type) || !type.constructor || !(type instanceof Function)) {
      return typeOfType;
    }

    return type;
  },

  /**
   * @deprecated - Compare instance type (via `instanceOf`, etc.), or type names directly.
   *
   * Returns an array of type refs from possible type refs (converts null, undefined, NaN, and other values into
   * type refs (either constructor name or constructor name based on whether value(s) is a string, a constructor, or not).
   *
   * @todo Ensure tests are written for this function.
   */
  toTypeRefs = (...types: any[]): TypeRef[] => types.map(toTypeRef),

  /**
   * @deprecated - Compare instance type (via `instanceOf`, etc.), or type names directly.
   *
   * Returns possible Type's TypeRef name.
   *
   * @todo Ensure tests are written for this function.
   */
  toTypeRefName = (type: any): TypeRef => {
    const ref = toTypeRef(type);
    return ref instanceof Function ? ref.name : ref;
  },

  /**
   * @deprecated - Compare instance type (via `instanceOf`, etc.), or type names directly.
   *
   * Returns possible Types' TypeRef names.
   *
   * @todo Ensure tests are written for this function.
   */
  toTypeRefNames = (...types: any): string[] => types.map(toTypeRefName),

  /**
   * @deprecated Use `instanceOf` instead (performs equality check on value's constructor
   * and passed in type, and ultimately performs `instanceof` check, if value's  constructor doesn't match given one).
   *
   * Strict type checker.  Checks if given value is a direct instance of given type;  E.g.,
   * @example
   *   isType(String, 'abcdefg')  === true // true
   *   isType(String.name, 'abcdefg') === true
   *   isType(Number, NaN) === false
   *   isType(Number, 99) === true
   *   isType('Null', 99) === false // though, for `null` and `undefined` checks
   *                                // @see `isset`, in this module, instead
   *   isType('Undefined', undefined) === true // true
   *
   * @note Useful where absolute types, or some semblance thereof, are required.
   *
   */
  isType = (type: TypeRef | any, obj: any): boolean => typeOf(obj) === toTypeRefName(type),

  /**
   * @deprecated Use `instanceOf` instead.
   *
   * Loose type checker;  E.g., If `type` is not a constructor, but a constructor name, does a type check on
   * constructor names, else if first check fails and `type` is a constructor, performs an `instanceof` check
   * on value with constructor.
   * @note Use care when checking for `Array` since it is an `instanceof` Object.
   * @note For `null` and `undefined` their class cased names can be used for type checks
   * `isOfType('Null', null) === true (passes strict type check)` (or better yet @link `module:object.isset` can be used).
   * @throwsafe - Doesn't throw on `null` or `undefined` `obj` values.
   * @example
   * isOfType(Number, 99) === true        // true  (passes strict type check (numbers are not instances of `Number`
   *                                      //        constructor)
   * isOfType('Number', 99) === true      // true  (passes strict type check)
   * isOfType(Number, NaN) === true       // true. (passes instance of check)
   *                                      //        If you want "true" strict type checking use `isType`
   * isOfType(Object, []) === true        // true  (passes instance of check)
   * isOfType(Array, []) === true         // true  (passes instance of check)
   * isOfType(Object, {}) === true        // true  (passes instance of check)
   * isOfType(Object.name, {}) === true   // true  (Passes strict type check)
   * class Abc extends String {}
   * isOfType(String, new Abc('abcd')) // true (passes instanceof check)
   */
  isOfType = (type: TypeConstructor, x: any) => isType(type, x) || instanceOf(x, type)

;
