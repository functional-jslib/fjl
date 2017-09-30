'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isset = exports.notEmptyAndOfType = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isPromise = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isType = exports.isFunction = undefined;

var _typeOf = require('./typeOf');

var _object_ = require('../jsPlatform/object_');

/**
 * Created by elyde on 12/18/2016.
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */

var _String = String.name,
    _Number = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _Function = Function.name,
    _Array = Array.name,
    _Symbol = 'Symbol',
    _Map = 'Map',
    _Set = 'Set',
    _WeakMap = 'WeakMap',
    _WeakSet = 'WeakSet',
    _Null = 'Null',
    _Undefined = 'Undefined';

var

/**
 * Returns whether a value is a functionOps or not.
 * @function module:is.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
isFunction = exports.isFunction = function isFunction(value) {
  return (0, _object_.instanceOf)(Function, value);
},


/**
 * Type checker.  Note** The `Type` passed in, if a constructor, should
 * be a named constructor/functionOps-instance;  E.g.,
 * ```
 *  functionOps SomeName () {} // or
 *  var SomeName = functionOps SomeName () {} // or
 *  class SomeName {}
 * ```
 * @function module:fjl.isType
 * @param type {Function|String} - Constructor or constructor name
 * @param obj {*}
 * @return {Boolean}
 */
isType = exports.isType = function isType(type, obj) {
  return (0, _typeOf.typeOf)(obj) === (isFunction(type) ? type.name : type);
},


/**
 * Checks if `value` is an es2015 `class`.
 * @function module:is.isClass
 * @param x {*}
 * @returns {boolean}
 */
isClass = exports.isClass = function isClass(x) {
  return x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10));
},


/**
 * Returns a booleanOps depicting whether a value is callable or not.
 * @function module:is.isCallable
 * @tentative
 * @param x {*}
 * @returns {Boolean}
 */
isCallable = exports.isCallable = function isCallable(x) {
  return isFunction(x) && !isClass(x);
},


/**
 * Checks if value is an arrayOps.
 * @function module:is.isArray
 * @param value {*}
 * @returns {boolean}
 */
isArray = exports.isArray = function isArray(value) {
  return isType(Array, value);
},


/**
 * Checks whether value is an object or not.
 * @function module:is.isObject
 * @param value
 * @returns {Boolean}
 */
isObject = exports.isObject = function isObject(value) {
  return isType(_Object, value);
},


/**
 * Checks if value is a booleanOps.
 * @function module:is.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */
isBoolean = exports.isBoolean = function isBoolean(value) {
  return isType(_Boolean, value);
},


/**
 * Checks if value is a valid numberOps (also checks if isNaN so that you don't have to).
 * @function module:is.isNumber
 * @param value {*}
 * @returns {Boolean}
 */
isNumber = exports.isNumber = function isNumber(value) {
  return isType(_Number, value);
},


/**
 * Checks whether value is a stringOps or not.
 * @function module:is.isString
 * @param value {*}
 * @returns {Boolean}
 */
isString = exports.isString = function isString(value) {
  return isType(_String, value);
},


/**
 * Checks whether value is of `Map` or not.
 * @function module:is.isMap
 * @param value {*}
 * @returns {Boolean}
 */
isMap = exports.isMap = function isMap(value) {
  return isType(_Map, value);
},


/**
 * Checks whether value is of `Set` or not.
 * @function module:is.isSet
 * @param value {*}
 * @returns {Boolean}
 */
isSet = exports.isSet = function isSet(value) {
  return isType(_Set, value);
},


/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:is.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */
isWeakMap = exports.isWeakMap = function isWeakMap(value) {
  return isType(_WeakMap, value);
},


/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:is.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */
isWeakSet = exports.isWeakSet = function isWeakSet(value) {
  return isType(_WeakSet, value);
},


/**
 * Checks if value is undefined.
 * @function module:is.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */
isUndefined = exports.isUndefined = function isUndefined(value) {
  return isType(_Undefined, value);
},


/**
 * Checks if value is null.
 * @function module:is.isNull
 * @param value {*}
 * @returns {Boolean}
 */
isNull = exports.isNull = function isNull(value) {
  return isType(_Null, value);
},


/**
 * Checks if value is a `Symbol`.
 * @function module:is.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */
isSymbol = exports.isSymbol = function isSymbol(value) {
  return isType(_Symbol, value);
},


/**
 * @tentative
 */
isPromise = exports.isPromise = function isPromise(value) {
  return isType('Promise', value);
},


/**
 * Checks if given `x` is one of the four
 * "usable" immutable JS primitives; I.e.,
 *  One of [String, Boolean, Number, Symbol]
 * @function module:is.isUsableImmutablePrimitive
 * @param x {*}
 * @returns {Boolean}
 */
isUsableImmutablePrimitive = exports.isUsableImmutablePrimitive = function isUsableImmutablePrimitive(x) {
  var typeOfX = (0, _typeOf.typeOf)(x);
  return [_String, _Number, _Boolean, _Symbol].some(function (Type) {
    return Type === typeOfX;
  });
},


/**
 * Checks if !length.
 * @param x {*}
 * @returns {Boolean}
 */
isEmptyList = exports.isEmptyList = function isEmptyList(x) {
  return (0, _object_.length)(x) === 0;
},


/**
 * Checks if object has own properties/enumerable-props or not.
 * @param obj {*}
 * @returns {Boolean}
 */
isEmptyObject = exports.isEmptyObject = function isEmptyObject(obj) {
  return isEmptyList((0, _object_.keys)(obj));
},


/**
 * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
 * @param x {*}
 * @returns {Boolean}
 */
isEmptyCollection = exports.isEmptyCollection = function isEmptyCollection(x) {
  return x.size === 0;
},


/**
 * Checks to see if passed in argument is empty.
 * @function module:is.empty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
isEmpty = exports.isEmpty = function isEmpty(value) {
  var typeOfValue = (0, _typeOf.typeOf)(value),
      retVal = void 0;

  if (!value) {
    // '', 0, `null`, `undefined` or `false` then is empty
    retVal = true;
  } else if (typeOfValue === _Array || typeOfValue === _Function) {
    retVal = isEmptyList(value);
  } else if (typeOfValue === _Number && value !== 0) {
    retVal = false;
  } else if (typeOfValue === _Object) {
    retVal = isEmptyObject(value);
  } else if ((0, _object_.hasOwnProperty)('size', value)) {
    retVal = isEmptyCollection(value);
  } else {
    retVal = !value;
  }
  return retVal;
},


/**
 * Returns true if an element is not empty and is of type.
 * @function module:is.notEmptyAndOfType
 * @param type {String|Function} - Type to check against (stringOps name or actual constructor).
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
notEmptyAndOfType = exports.notEmptyAndOfType = function notEmptyAndOfType(type, value) {
  return !isEmpty(value) && isType(type, value);
},


/**
 * Returns whether passed in values is defined and not null.
 * @param x {*}
 * @returns {Boolean}
 */
isset = exports.isset = function isset(x) {
  return !isNull(x) && !isUndefined(x);
};