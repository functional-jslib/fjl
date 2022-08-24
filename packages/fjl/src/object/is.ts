/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
 */

import {typeOf} from './typeOf';
import {instanceOf, $instanceOf, keys} from '../platform/object';
import {length} from "../list/length";
import {isset} from './isset';
import {TypeRef, Unary} from "../types";

export {isset};

const
  _String = String.name,
  _Number = Number.name,
  _Object = Object.name,
  _Boolean = Boolean.name,
  _Symbol = 'Symbol',
  _Map = 'Map',
  _Set = 'Set',
  _WeakMap = 'WeakMap',
  _WeakSet = 'WeakSet',
  _Null = 'Null',
  _Undefined = 'Undefined',
  _immutable_type_names = [_String, _Number, _Boolean, _Symbol];
;



export const

  /**
   * Resolves/normalizes a type name from either a string or a constructor.
   * @function module:object.toTypeRef
   * @param type {Function|String} - String or function representing a type.
   * @returns {String}
   * @todo write tests for this function.
   */
  toTypeRef = (type: TypeRef): TypeRef => {
    if (!isset(type) || !type.constructor || (type.constructor !== String && !(type instanceof Function))) {
      return typeOf(type);
    }
    return type;
  },

  /**
   * Returns an array of type refs from possible type refs (converts null, undefined, NaN, and other values into
   * type refs (either constructor name or constructor name based on whether value(s) is a string, a constructor, or not).
   * @function module:object.toTypeRefs
   * @param types {...(TypeRef|*)}
   * @returns {Array<TypeRef>}
   * @todo Ensure tests are written for this function.
   */
  toTypeRefs = (...types: any[]): TypeRef[] => types.map(toTypeRef),

  /**
   * Returns possible Type's TypeRef name.
   * @function module:object.toTypeRefName
   * @param type {(TypeRef|*)}
   * @returns {String}
   * @todo Ensure tests are written for this function.
   */
  toTypeRefName = (type: any): TypeRef => {
    const ref = toTypeRef(type);
    return ref instanceof Function ? ref.name : ref;
  },

  /**
   * Returns possible Types' TypeRef names.
   * @function module:object.toTypeRefNames
   * @param types {...(TypeRef|*)}
   * @returns {String[]}
   * @todo Ensure tests are written for this function.
   */
  toTypeRefNames = (...types: any): string[] => types.map(toTypeRefName),

  /**
   * Returns whether a value is a function or not.
   * @function module:object.isFunction
   * @param x {*}
   * @returns {Boolean}
   */
  isFunction = <T>(x: T): boolean => isset(x) && x instanceof Function,

  /**
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
   * @function module:object.isType
   * @param type {Function|ObjectConstructor|String} - Constructor or constructor name
   * @param obj {*}
   * @return {Boolean}
   */
  isType = <T>(type: TypeRef | any, obj: T): boolean => typeOf(obj) === toTypeRefName(type),

  $isType = <T>(type: TypeRef | any) =>
    (obj: T): boolean => isType(type, obj),

  /**
   * Synonym for `isType` (or just a more accurate name for `isType`).
   * @function module:object.isStrictly
   * @param type {Function|ObjectConstructor|String} - Constructor or constructor name
   * @param obj {*}
   * @return {Boolean}
   */
  isStrictly = isType,

  /**
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
   *
   * @function module:object.isOfType
   * @param type {Function|String} - Type reference (constructor or `constructor.name`).
   * @param x {*} - Value to check.
   * @returns {Boolean}
   */
  isOfType = (type, x) => isType(type, x) || instanceOf(type, x),

  /**
   * Synonym for `isOfType` (or just a more accurate name).
   * @function module:object.isLoosely
   * @param type {Function|String} - Type reference (constructor or `constructor.name`).
   * @param x {*} - Value to check.
   * @returns {Boolean}
   */
  isLoosely = isOfType,

  /**
   * Checks if `value` is an es2015 `class`.
   * @function module:object.isClass
   * @param x {*}
   * @returns {boolean}
   */
  isClass = (x: any): boolean => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10)),

  /**
   * Returns a boolean depicting whether a value is callable or not.
   * @function module:object.isCallable
   * @tentative
   * @param x {*}
   * @returns {Boolean}
   */
  isCallable = (x: any): boolean => isFunction(x) && !isClass(x),

  /**
   * Checks if value is an array (same as `Array.isArray`).
   * @function module:object.isArray
   * @param value {*}
   * @returns {boolean}
   */
  {isArray} = Array,

  /**
   * Checks whether value is an object or not.
   * @function module:object.isObject
   * @param value
   * @returns {Boolean}
   */
  isObject = $isType(_Object) as Unary<any, boolean>,

  /**
   * Checks if value is a boolean.
   * @function module:object.isBoolean
   * @param value {*}
   * @returns {Boolean}
   */
  isBoolean = $isType(_Boolean) as Unary<any, boolean>,

  /**
   * Checks if value is a valid number (also checks if isNaN so that you don't have to).
   * @function module:object.isNumber
   * @param value {*}
   * @returns {Boolean}
   */
  isNumber = $isType(_Number) as Unary<any, boolean>,

  /**
   * Checks whether value is a string or not.
   * @function module:object.isString
   * @param value {*}
   * @returns {Boolean}
   */
  isString = $isType(_String) as Unary<any, boolean>,

  /**
   * Checks whether value is of `Map` or not.
   * @function module:object.isMap
   * @param value {*}
   * @returns {Boolean}
   */
  isMap = $isType(_Map) as Unary<any, boolean>,

  /**
   * Checks whether value is of `Set` or not.
   * @function module:object.isSet
   * @param value {*}
   * @returns {Boolean}
   */
  isSet = $isType(_Set) as Unary<any, boolean>,

  /**
   * Checks whether value is of `WeakMap` or not.
   * @function module:object.isWeakMap
   * @param value {*}
   * @returns {Boolean}
   */
  isWeakMap = $isType(_WeakMap) as Unary<any, boolean>,

  /**
   * Checks whether value is of `WeakSet` or not.
   * @function module:object.isWeakSet
   * @param value {*}
   * @returns {Boolean}
   */
  isWeakSet = $isType(_WeakSet) as Unary<any, boolean>,

  /**
   * Checks if value is undefined.
   * @function module:object.isUndefined
   * @param value {*}
   * @returns {Boolean}
   */
  isUndefined = $isType(_Undefined) as Unary<any, boolean>,

  /**
   * Checks if value is null.
   * @function module:object.isNull
   * @param value {*}
   * @returns {Boolean}
   */
  isNull = $isType(_Null) as Unary<any, boolean>,

  /**
   * Checks if value is a `Symbol`.
   * @function module:object.isSymbol
   * @param value {*}
   * @returns {Boolean}
   */
  isSymbol = $isType(_Symbol) as Unary<any, boolean>,

  /**
   * Checks if given `x` is set and of one of
   *  [String, Boolean, Number, Symbol] (null and undefined are immutable
   *  but are not "usable" (usually not what we want to operate on).
   * @function module:object.isUsableImmutablePrimitive
   * @param x {*}
   * @returns {Boolean}
   */
  isUsableImmutablePrimitive = (x: any): boolean => {
    const typeOfX = typeOf(x);
    return isset(x) && _immutable_type_names
        .some(type => type === typeOfX);
  },

  /**
   * Checks if !length.
   * @function module:object.isEmptyList
   * @param x {*}
   * @returns {Boolean}
   */
  isEmptyList = (x: any): boolean => !length(x),

  /**
   * Checks if object has own properties/enumerable-props or not.
   * @function module:object.isEmptyObject
   * @param obj {*}
   * @returns {Boolean}
   */
  isEmptyObject = (obj: any): boolean=> isEmptyList(keys(obj)),

  /**
   * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
   * @function module:object.isEmptyCollection
   * @param x {*}
   * @returns {Boolean}
   */
  isEmptyCollection = (x: any): boolean => x.size === 0,

  /**
   * Checks to see if passed in value is empty;  I.e.,
   *  check for one of '', 0, `null`, `undefined`, `NaN`, `false`, empty array, empty object, ~~empty function (zero arity)~~,
   *  or empty collection (es6 collection: Map, Set, WeakMap, or WeakSet etc.) (`!value.size`).
   * @function module:object.isEmpty
   * @param x {*} - Value to check.
   * @returns {Boolean}
   */
  isEmpty = (x: any): boolean => {
    if (!x) { // if '', 0, `null`, `undefined`, `NaN`, or `false` then is empty
      return true;
    }
    if (isNumber(x) || isFunction(x)) {
      return false;
    }
    if (isArray(x)) { // takes care of 'instances of Array'
      return !x.length;
    }
    if (x.size !== undefined && !instanceOf(Function, x.size)) {
      return !x.size;
    }
    if (isObject(x)) {
      return !keys(x).length;
    }
    return false;
  },

  /**
   * Checks to see if `x` is of one of the given type refs;  Strict type check (not-instanceof check).
   * @function object.isOneOf
   * @param x {*}
   * @param types {...(TypeRef|*)}
   * @returns {boolean}
   * @deprecated - Instead use @link module:isStrictlyOneOf
   * @todo write tests for this function.
   */
  isOneOf = (x: any, ...types: any): boolean => {
    const typeName = typeOf(x);
    return toTypeRefNames(types).some(name => typeName === name);
  },

  /**
   * Checks if given value is strictly one of given types.
   * @function module:object.isStrictlyOneOf
   * @param x {*}
   * @param types {...TypeRef}
   * @returns {boolean}
   */
  isStrictlyOneOf = isOneOf,

  /**
   * Checks if given value is either strictly one of given types or is
   * an `instanceof` one of given types.
   * @function module:object.isLooselyOneOf
   * @param x {*}
   * @param types {...TypeRef}
   * @returns {boolean}
   */
  isLooselyOneOf = (x: any, ...types: any): boolean =>
    types.some(type => isType(type, x) || instanceOf(x, type)),

  /**
   * Checks if given value is instance of one of the types given.
   * @function module:object.instanceOfOne
   * @param x {*}
   * @param types {...TypeRef}
   * @returns {boolean}
   */
  instanceOfOne = (x: any, ...types): boolean => types.some($instanceOf(x)),

  /**
   * Checks if value qualifies (has `map` method) as a functor.
   * @function module:object.isFunctor
   * @param x {*}
   * @returns {boolean}
   */
  isFunctor = (x: any): boolean => x && x.map && (instanceOf(Function, x.map))

;
