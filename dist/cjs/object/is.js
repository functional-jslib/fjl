"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.isFunctor = exports.isOneOf = exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isCallable = exports.isClass = exports.isOfType = exports.isType = exports.isFunction = exports.toTypeRefNames = exports.toTypeRefName = exports.toTypeRefs = exports.toTypeRef = void 0;

var _typeOf = require("./typeOf");

var _object = require("../jsPlatform/object");

var _curry = require("../function/curry");

/**
 * Created by elyde on 12/18/2016.
 * @memberOf object
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
    _Undefined = 'Undefined',
    _NaN = 'NaN';

/**
 * Resolves/normalizes a type name from either a string or a constructor.
 * @function module:object.toTypeRef
 * @param type {Function|String} - String or function representing a type.
 * @returns {String}
 * @todo write tests for this function.
 */
var toTypeRef = function toTypeRef(type) {
  if (!type) {
    return (0, _typeOf.typeOf)(type);
  } else if (type.constructor === String || type instanceof Function) {
    return type;
  }

  return (0, _typeOf.typeOf)(type);
},
    toTypeRefs = function toTypeRefs() {
  for (var _len = arguments.length, types = new Array(_len), _key = 0; _key < _len; _key++) {
    types[_key] = arguments[_key];
  }

  return types.map(toTypeRef);
},
    toTypeRefName = function toTypeRefName(Type) {
  var ref = toTypeRef(Type);
  return ref instanceof Function ? ref.name : ref;
},
    toTypeRefNames = function toTypeRefNames() {
  for (var _len2 = arguments.length, types = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    types[_key2] = arguments[_key2];
  }

  return types.map(toTypeRefName);
},
    isFunction = (0, _object.instanceOf)(Function),
    isType = (0, _curry.curry)(function (type, obj) {
  return (0, _typeOf.typeOf)(obj) === toTypeRefName(type);
}),
    isOfType = (0, _curry.curry)(function (type, x) {
  return isType(type, x) || (0, _object.instanceOf)(type, x);
}),
    isClass = function isClass(x) {
  return x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
},
    isCallable = function isCallable(x) {
  return isFunction(x) && !isClass(x);
},
    isArray = Array.isArray,
    isObject = isType(_Object),
    isBoolean = isType(_Boolean),
    isNumber = isType(_Number),
    isString = isType(_String),
    isMap = isType(_Map),
    isSet = isType(_Set),
    isWeakMap = isType(_WeakMap),
    isWeakSet = isType(_WeakSet),
    isUndefined = isType(_Undefined),
    isNull = isType(_Null),
    isSymbol = isType(_Symbol),
    isUsableImmutablePrimitive = function isUsableImmutablePrimitive(x) {
  var typeOfX = (0, _typeOf.typeOf)(x);
  return isset(x) && [_String, _Number, _Boolean, _Symbol].some(function (Type) {
    return Type === typeOfX;
  });
},
    isEmptyList = function isEmptyList(x) {
  return !(0, _object.length)(x);
},
    isEmptyObject = function isEmptyObject(obj) {
  return isEmptyList((0, _object.keys)(obj));
},
    isEmptyCollection = function isEmptyCollection(x) {
  return x.size === 0;
},
    isEmpty = function isEmpty(value) {
  if (!value) {
    // if '', 0, `null`, `undefined`, or `false` then is empty
    return true;
  }

  switch ((0, _typeOf.typeOf)(value)) {
    case _Array:
    case _Function:
      return !value.length;

    case _Number:
      // zero and NaN checks happened above so `if number` then it's 'not-an-empty-number' (lol)
      return false;

    case _Object:
      return !(0, _object.keys)(value).length;

    case _Map:
    case _Set:
    case _WeakSet:
    case _WeakMap:
      return !value.size;

    case _NaN:
      return true;

    default:
      return !value;
  }
},
    isset = function isset(x) {
  return x !== null && x !== undefined;
},
    isOneOf = function isOneOf(x) {
  var typeName = (0, _typeOf.typeOf)(x);

  for (var _len3 = arguments.length, types = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    types[_key3 - 1] = arguments[_key3];
  }

  return toTypeRefNames(types).some(function (name) {
    return typeName === name;
  });
},
    isFunctor = function isFunctor(x) {
  return x && x.map && (0, _object.instanceOf)(Function, x.map);
};

exports.isFunctor = isFunctor;
exports.isOneOf = isOneOf;
exports.isset = isset;
exports.isEmpty = isEmpty;
exports.isEmptyCollection = isEmptyCollection;
exports.isEmptyObject = isEmptyObject;
exports.isEmptyList = isEmptyList;
exports.isUsableImmutablePrimitive = isUsableImmutablePrimitive;
exports.isSymbol = isSymbol;
exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isWeakSet = isWeakSet;
exports.isWeakMap = isWeakMap;
exports.isSet = isSet;
exports.isMap = isMap;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isCallable = isCallable;
exports.isClass = isClass;
exports.isOfType = isOfType;
exports.isType = isType;
exports.isFunction = isFunction;
exports.toTypeRefNames = toTypeRefNames;
exports.toTypeRefName = toTypeRefName;
exports.toTypeRefs = toTypeRefs;
exports.toTypeRef = toTypeRef;