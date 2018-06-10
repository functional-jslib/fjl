(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/_objectOps/_objectOps', './uncurried/_jsPlatform/_object', './uncurried/_objectOps/_typeOf', './uncurried/_objectOps/_of', './uncurried/_objectOps/_console', './uncurried/_objectOps/_is', './uncurried/_functionOps/_curry', './uncurried/_objectOps/_prop', './uncurried/_objectOps/_assignDeep', './uncurried/_objectOps/_setTheory'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/_objectOps/_objectOps'), require('./uncurried/_jsPlatform/_object'), require('./uncurried/_objectOps/_typeOf'), require('./uncurried/_objectOps/_of'), require('./uncurried/_objectOps/_console'), require('./uncurried/_objectOps/_is'), require('./uncurried/_functionOps/_curry'), require('./uncurried/_objectOps/_prop'), require('./uncurried/_objectOps/_assignDeep'), require('./uncurried/_objectOps/_setTheory'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._objectOps, global._object, global._typeOf, global._of, global._console, global._is, global._curry, global._prop, global._assignDeep, global._setTheory);
    global.objectOps = mod.exports;
  }
})(this, function (exports, _objectOps, _object, _typeOf, _of, _console, _is, _curry, _prop2, _assignDeep2, _setTheory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isType = exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.prop = exports._objDifference = exports._objIntersect = exports._objComplement = exports._objUnion = exports._assignDeep = exports._prop = exports._assign = exports._hasOwnProperty = exports._isType = exports._instanceOf = exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isFunction = exports.keys = exports.length = exports.toArray = exports.toArrayMap = exports.fromArrayMap = exports.jsonClone = undefined;
  Object.defineProperty(exports, 'jsonClone', {
    enumerable: true,
    get: function () {
      return _objectOps.jsonClone;
    }
  });
  Object.defineProperty(exports, 'fromArrayMap', {
    enumerable: true,
    get: function () {
      return _objectOps.fromArrayMap;
    }
  });
  Object.defineProperty(exports, 'toArrayMap', {
    enumerable: true,
    get: function () {
      return _objectOps.toArrayMap;
    }
  });
  Object.defineProperty(exports, 'toArray', {
    enumerable: true,
    get: function () {
      return _objectOps.toArray;
    }
  });
  Object.defineProperty(exports, 'length', {
    enumerable: true,
    get: function () {
      return _object.length;
    }
  });
  Object.defineProperty(exports, 'keys', {
    enumerable: true,
    get: function () {
      return _object.keys;
    }
  });
  Object.keys(_typeOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _typeOf[key];
      }
    });
  });
  Object.keys(_of).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _of[key];
      }
    });
  });
  Object.keys(_console).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _console[key];
      }
    });
  });
  Object.defineProperty(exports, 'isFunction', {
    enumerable: true,
    get: function () {
      return _is.isFunction;
    }
  });
  Object.defineProperty(exports, 'isClass', {
    enumerable: true,
    get: function () {
      return _is.isClass;
    }
  });
  Object.defineProperty(exports, 'isCallable', {
    enumerable: true,
    get: function () {
      return _is.isCallable;
    }
  });
  Object.defineProperty(exports, 'isArray', {
    enumerable: true,
    get: function () {
      return _is.isArray;
    }
  });
  Object.defineProperty(exports, 'isObject', {
    enumerable: true,
    get: function () {
      return _is.isObject;
    }
  });
  Object.defineProperty(exports, 'isBoolean', {
    enumerable: true,
    get: function () {
      return _is.isBoolean;
    }
  });
  Object.defineProperty(exports, 'isNumber', {
    enumerable: true,
    get: function () {
      return _is.isNumber;
    }
  });
  Object.defineProperty(exports, 'isString', {
    enumerable: true,
    get: function () {
      return _is.isString;
    }
  });
  Object.defineProperty(exports, 'isMap', {
    enumerable: true,
    get: function () {
      return _is.isMap;
    }
  });
  Object.defineProperty(exports, 'isSet', {
    enumerable: true,
    get: function () {
      return _is.isSet;
    }
  });
  Object.defineProperty(exports, 'isWeakMap', {
    enumerable: true,
    get: function () {
      return _is.isWeakMap;
    }
  });
  Object.defineProperty(exports, 'isWeakSet', {
    enumerable: true,
    get: function () {
      return _is.isWeakSet;
    }
  });
  Object.defineProperty(exports, 'isUndefined', {
    enumerable: true,
    get: function () {
      return _is.isUndefined;
    }
  });
  Object.defineProperty(exports, 'isNull', {
    enumerable: true,
    get: function () {
      return _is.isNull;
    }
  });
  Object.defineProperty(exports, 'isSymbol', {
    enumerable: true,
    get: function () {
      return _is.isSymbol;
    }
  });
  Object.defineProperty(exports, 'isUsableImmutablePrimitive', {
    enumerable: true,
    get: function () {
      return _is.isUsableImmutablePrimitive;
    }
  });
  Object.defineProperty(exports, 'isEmptyList', {
    enumerable: true,
    get: function () {
      return _is.isEmptyList;
    }
  });
  Object.defineProperty(exports, 'isEmptyObject', {
    enumerable: true,
    get: function () {
      return _is.isEmptyObject;
    }
  });
  Object.defineProperty(exports, 'isEmptyCollection', {
    enumerable: true,
    get: function () {
      return _is.isEmptyCollection;
    }
  });
  Object.defineProperty(exports, 'isEmpty', {
    enumerable: true,
    get: function () {
      return _is.isEmpty;
    }
  });
  Object.defineProperty(exports, 'isset', {
    enumerable: true,
    get: function () {
      return _is.isset;
    }
  });
  exports._instanceOf = _object.instanceOf;
  exports._isType = _is.isType;
  exports._hasOwnProperty = _object.hasOwnProperty;
  exports._assign = _object.assign;
  exports._prop = _prop2.prop;
  exports._assignDeep = _assignDeep2.assignDeep;
  exports._objUnion = _setTheory.objUnion;
  exports._objComplement = _setTheory.objComplement;
  exports._objIntersect = _setTheory.objIntersect;
  exports._objDifference = _setTheory.objDifference;
  var

  /**
   * Gives `undefined` or prop value if it is available.
   * @function module:objectOps.prop
   * @param propName {String}
   * @param obj {*} - Object to search.
   * @returns {*|undefined}
   * @curried
   */
  prop = exports.prop = (0, _curry.curry)(_prop2.prop),


  /**
   * `instanceof` in function form.
   * @function module:objectOps.instanceOf
   * @param instance {*}
   * @param Type {Function}
   * @returns {Boolean}
   * @curried
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(_object.instanceOf),


  /**
   * `hasOwnProperty` as a method (takes object last).
   * @function module:objectOps.hasOwnProperty
   * @param propName {String}
   * @param obj {*} - Object to search.
   * @returns {Boolean}
   * @curried
   */
  hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_object.hasOwnProperty),


  /**
   * `Object.assign` if it is available else a shim.
   * @function module:objectOps.assign
   * @param [...obj]{Object} - One or more objects to merge onto first object.
   * @returns {Object}
   * @curried - Called after having two or more args
   */
  assign = exports.assign = (0, _curry.curry2)(_object.assign),


  /**
   * Same as `Object.assign` except does a deep merge.
   * @function module:objectOps.assignDeep
   * @param [...obj]{Object} - One or more objects to deep merge onto first object.
   * @returns {Object}
   * @curried - Called after having two or more args
   */
  assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep2.assignDeep),


  /**
   * Cartesian union for objects (operates on two objects).
   * @function module:objectOps.objUnion
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Unified obj.
   * @curried
   */
  objUnion = exports.objUnion = (0, _curry.curry)(_setTheory.objUnion),


  /**
   * Returns the cartesian intersection of two objects.
   * @function module:objectOps.objIntersect
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Intersection of given objects.
   * @curried
   */
  objIntersect = exports.objIntersect = (0, _curry.curry)(_setTheory.objIntersect),


  /**
   * Returns the cartesian difference of two objects.
   * @function module:objectOps.objDifference
   * @param obj1 {Object}
   * @param obj2 {Object}
   * @returns {Object} - Difference of given objects.
   * @curried
   */
  objDifference = exports.objDifference = (0, _curry.curry)(_setTheory.objDifference),


  /**
   * Returns the cartesian complement of one or more objects on given object.
   * @function module:objectOps.objDifference
   * @param obj {Object}
   * @param [...obj]{Object} - One or more objects to calculate complement from.
   * @returns {Object} - Complement of given objects.
   * @curried
   */
  objComplement = exports.objComplement = (0, _curry.curry2)(_setTheory.objComplement),


  /**
   * Returns a boolean indicating whether a value is of given type or not.
   * @function module:objectOps.isType
   * @param Type {Function|String} - Constructor or constructor name
   * @param value {*}
   * @return {Boolean}
   */
  isType = exports.isType = (0, _curry.curry)(_is.isType);
});