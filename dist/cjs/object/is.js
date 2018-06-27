'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isCallable = exports.isClass = exports.isType = exports.isFunction = undefined;

var _typeOf = require('./typeOf');

var _object = require('../jsPlatform/object');

var _curry = require('../function/curry');

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
    _Undefined = 'Undefined'; /**
                               * Created by elyde on 12/18/2016.
                               * @memberOf object
                               */

/**
 * Returns whether a value is a function or not.
 * @function module:object.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
var isFunction = (0, _object.instanceOf)(Function),
    isType = (0, _curry.curry)(function (type, obj) {
  return (0, _typeOf.typeOf)(obj) === (isFunction(type) ? type.name : type);
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
  var retVal = void 0;
  if (!value) {
    // if '', 0, `null`, `undefined`, or `false` then is empty
    retVal = true;
  }
  var typeOfValue = (0, _typeOf.typeOf)(value);
  if (typeOfValue === _Array || typeOfValue === _Function) {
    retVal = isEmptyList(value);
  } else if (typeOfValue === _Number) {
    retVal = false;
  } else if (typeOfValue === _Object) {
    retVal = isEmptyObject(value);
  } else if ((0, _object.hasOwnProperty)('size', value) && isNumber(value.size)) {
    retVal = isEmptyCollection(value);
  } else {
    retVal = !value;
  }
  return retVal;
},
    isset = function isset(x) {
  return x !== null && x !== undefined;
};

exports.isFunction = isFunction;
exports.isType = isType;
exports.isClass = isClass;
exports.isCallable = isCallable;
exports.isObject = isObject;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isMap = isMap;
exports.isSet = isSet;
exports.isWeakMap = isWeakMap;
exports.isWeakSet = isWeakSet;
exports.isUndefined = isUndefined;
exports.isNull = isNull;
exports.isSymbol = isSymbol;
exports.isUsableImmutablePrimitive = isUsableImmutablePrimitive;
exports.isEmptyList = isEmptyList;
exports.isEmptyObject = isEmptyObject;
exports.isEmptyCollection = isEmptyCollection;
exports.isEmpty = isEmpty;
exports.isset = isset;
exports.isArray = isArray;