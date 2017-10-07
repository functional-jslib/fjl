define(['exports', './typeOf_', '../jsPlatform/object_'], function (exports, _typeOf_, _object_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isset = exports.notEmptyAndOfType = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isPromise = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isType = exports.isFunction = undefined;
  /**
   * Created by elyde on 12/18/2016.
   * @memberOf objectOps_
   */

  let _String = String.name,
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

  const

  /**
   * Returns whether a value is a functionOps or not.
   * @function module:objectOps_.isFunction
   * @param value {*}
   * @returns {Boolean}
   */
  isFunction = exports.isFunction = value => (0, _object_.instanceOf)(Function, value),


  /**
   * Type checker.  Note** The `Type` passed in, if a constructor, should
   * be a named constructor/functionOps-instance;  E.g.,
   * ```
   *  functionOps SomeName () {} // or
   *  var SomeName = functionOps SomeName () {} // or
   *  class SomeName {}
   * ```
   * @function module:objectOps_.isType
   * @param type {Function|String} - Constructor or constructor name
   * @param obj {*}
   * @return {Boolean}
   */
  isType = exports.isType = (type, obj) => (0, _typeOf_.typeOf)(obj) === (isFunction(type) ? type.name : type),


  /**
   * Checks if `value` is an es2015 `class`.
   * @function module:objectOps_.isClass
   * @param x {*}
   * @returns {boolean}
   */
  isClass = exports.isClass = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10)),


  /**
   * Returns a booleanOps depicting whether a value is callable or not.
   * @function module:objectOps_.isCallable
   * @tentative
   * @private
   * @param x {*}
   * @returns {Boolean}
   */
  isCallable = exports.isCallable = x => isFunction(x) && !isClass(x),


  /**
   * Checks if value is an arrayOps.
   * @function module:objectOps_.isArray
   * @param value {*}
   * @returns {boolean}
   */
  isArray = exports.isArray = value => isType(Array, value),


  /**
   * Checks whether value is an object or not.
   * @function module:objectOps_.isObject
   * @param value
   * @returns {Boolean}
   */
  isObject = exports.isObject = value => isType(_Object, value),


  /**
   * Checks if value is a booleanOps.
   * @function module:objectOps_.isBoolean
   * @param value {*}
   * @returns {Boolean}
   */
  isBoolean = exports.isBoolean = value => isType(_Boolean, value),


  /**
   * Checks if value is a valid number (also checks if isNaN so that you don't have to).
   * @function module:objectOps_.isNumber
   * @param value {*}
   * @returns {Boolean}
   */
  isNumber = exports.isNumber = value => isType(_Number, value),


  /**
   * Checks whether value is a stringOps or not.
   * @function module:objectOps_.isString
   * @param value {*}
   * @returns {Boolean}
   */
  isString = exports.isString = value => isType(_String, value),


  /**
   * Checks whether value is of `Map` or not.
   * @function module:objectOps_.isMap
   * @param value {*}
   * @returns {Boolean}
   */
  isMap = exports.isMap = value => isType(_Map, value),


  /**
   * Checks whether value is of `Set` or not.
   * @function module:objectOps_.isSet
   * @param value {*}
   * @returns {Boolean}
   */
  isSet = exports.isSet = value => isType(_Set, value),


  /**
   * Checks whether value is of `WeakMap` or not.
   * @function module:objectOps_.isWeakMap
   * @param value {*}
   * @returns {Boolean}
   */
  isWeakMap = exports.isWeakMap = value => isType(_WeakMap, value),


  /**
   * Checks whether value is of `WeakSet` or not.
   * @function module:objectOps_.isWeakSet
   * @param value {*}
   * @returns {Boolean}
   */
  isWeakSet = exports.isWeakSet = value => isType(_WeakSet, value),


  /**
   * Checks if value is undefined.
   * @function module:objectOps_.isUndefined
   * @param value {*}
   * @returns {Boolean}
   */
  isUndefined = exports.isUndefined = value => isType(_Undefined, value),


  /**
   * Checks if value is null.
   * @function module:objectOps_.isNull
   * @param value {*}
   * @returns {Boolean}
   */
  isNull = exports.isNull = value => isType(_Null, value),


  /**
   * Checks if value is a `Symbol`.
   * @function module:objectOps_.isSymbol
   * @param value {*}
   * @returns {Boolean}
   */
  isSymbol = exports.isSymbol = value => isType(_Symbol, value),


  /**
   * @tentative
   * @private
   */
  isPromise = exports.isPromise = value => isType('Promise', value),


  /**
   * Checks if given `x` is one of the four
   * "usable" immutable JS primitives; I.e.,
   *  One of [String, Boolean, Number, Symbol]
   * @function module:objectOps_.isUsableImmutablePrimitive
   * @param x {*}
   * @returns {Boolean}
   */
  isUsableImmutablePrimitive = exports.isUsableImmutablePrimitive = x => {
    const typeOfX = (0, _typeOf_.typeOf)(x);
    return [_String, _Number, _Boolean, _Symbol].some(Type => Type === typeOfX);
  },


  /**
   * Checks if !length.
   * @function module:objectOps.isEmptyList
   * @param x {*}
   * @returns {Boolean}
   */
  isEmptyList = exports.isEmptyList = x => !(0, _object_.length)(x),


  /**
   * Checks if object has own properties/enumerable-props or not.
   * @function module:objectOps.isEmptyObject
   * @param obj {*}
   * @returns {Boolean}
   */
  isEmptyObject = exports.isEmptyObject = obj => isEmptyList((0, _object_.keys)(obj)),


  /**
   * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
   * @function module:objectOps_.isEmptyCollection
   * @param x {*}
   * @returns {Boolean}
   */
  isEmptyCollection = exports.isEmptyCollection = x => x.size === 0,


  /**
   * Checks to see if passed in argument is empty.
   * @function module:objectOps_.isEmpty
   * @param value {*} - Value to check.
   * @returns {Boolean}
   */
  isEmpty = exports.isEmpty = value => {
    let typeOfValue = (0, _typeOf_.typeOf)(value),
        retVal;

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
   * @function module:objectOps_.notEmptyAndOfType
   * @tentative
   * @private
   * @param type {String|Function} - Type to check against (stringOps name or actual constructor).
   * @param value {*} - Value to check.
   * @returns {Boolean}
   */
  notEmptyAndOfType = exports.notEmptyAndOfType = (type, value) => !isEmpty(value) && isType(type, value),


  /**
   * Returns whether passed in values is defined and not null or not.
   * @function module:objectOps_.isset
   * @param x {*}
   * @returns {Boolean}
   */
  isset = exports.isset = x => !isNull(x) && !isUndefined(x);
});