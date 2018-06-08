(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './_typeOf', '../_jsPlatform/_object'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./_typeOf'), require('../_jsPlatform/_object'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._typeOf, global._object);
    global._is = mod.exports;
  }
})(this, function (exports, _typeOf, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isArray = exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isCallable = exports.isClass = exports._isType = exports.isFunction = undefined;
  /**
   * Created by elyde on 12/18/2016.
   * @memberOf _objectOps
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

  /**
   * Returns whether a value is a _functionOps or not.
   * @function module:objectOps._isFunction
   * @param value {*}
   * @returns {Boolean}
   */
  var isFunction = function isFunction(value) {
    return (0, _object._instanceOf)(Function, value);
  },
      _isType = function _isType(type, obj) {
    return (0, _typeOf.typeOf)(obj) === (isFunction(type) ? type.name : type);
  },
      isClass = function isClass(x) {
    return x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10));
  },
      isCallable = function isCallable(x) {
    return isFunction(x) && !isClass(x);
  },
      isArray = Array.isArray,
      isObject = function isObject(value) {
    return _isType(_Object, value);
  },
      isBoolean = function isBoolean(value) {
    return _isType(_Boolean, value);
  },
      isNumber = function isNumber(value) {
    return _isType(_Number, value);
  },
      isString = function isString(value) {
    return _isType(_String, value);
  },
      isMap = function isMap(value) {
    return _isType(_Map, value);
  },
      isSet = function isSet(value) {
    return _isType(_Set, value);
  },
      isWeakMap = function isWeakMap(value) {
    return _isType(_WeakMap, value);
  },
      isWeakSet = function isWeakSet(value) {
    return _isType(_WeakSet, value);
  },
      isUndefined = function isUndefined(value) {
    return _isType(_Undefined, value);
  },
      isNull = function isNull(value) {
    return _isType(_Null, value);
  },
      isSymbol = function isSymbol(value) {
    return _isType(_Symbol, value);
  },
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
    } else if ((0, _object._hasOwnProperty)('size', value) && isNumber(value.size)) {
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
  exports._isType = _isType;
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
});