define(['exports', './uncurried/_jsPlatform/_object', './uncurried/_objectOps/_typeOf', './uncurried/_objectOps/_of', './uncurried/_objectOps/_is', './uncurried/_functionOps/_curry', './uncurried/_objectOps/_prop', './uncurried/_objectOps/_assignDeep', './uncurried/_objectOps/_setTheory'], function (exports, _object, _typeOf, _of, _is, _curry, _prop2, _assignDeep2, _setTheory) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isType = exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.prop = exports._objDifference = exports._objIntersect = exports._objComplement = exports._objUnion = exports._assignDeep = exports._prop = exports._assign = exports._hasOwnProperty = exports._isType = exports._instanceOf = exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isFunction = exports.keys = exports.length = undefined;
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
    const prop = exports.prop = (0, _curry.curry)(_prop2.prop),


    /**
     * `instanceof` in function form.
     * @function module:_objectOps.instanceOf
     * @param instance {*}
     * @param Type {Function}
     * @returns {Boolean}
     */
    instanceOf = exports.instanceOf = (0, _curry.curry)(_object.instanceOf),
          hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_object.hasOwnProperty),
          assign = exports.assign = (0, _curry.curry2)(_object.assign),
          assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep2.assignDeep),
          objUnion = exports.objUnion = (0, _curry.curry)(_setTheory.objUnion),
          objIntersect = exports.objIntersect = (0, _curry.curry)(_setTheory.objIntersect),
          objDifference = exports.objDifference = (0, _curry.curry)(_setTheory.objDifference),
          objComplement = exports.objComplement = (0, _curry.curry2)(_setTheory.objComplement),


    /**
     * Returns whether a value is a functionOps or not.
     * @function module:_objectOps.isFunction
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/_functionOps-instance;  E.g.,
     * ```
     *  _functionOps SomeName () {} // or
     *  var SomeName = _functionOps SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:_objectOps.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = exports.isType = (0, _curry.curry)(_is.isType);

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:_objectOps.isClass
     * @param x {*}
     * @returns {boolean}
     */

    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @function module:_objectOps.isCallable
     * @tentative
     * @private
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is an arrayOps.
     * @function module:_objectOps.isArray
     * @param value {*}
     * @returns {boolean}
     */

    /**
     * Checks whether value is an object or not.
     * @function module:_objectOps.isObject
     * @param value
     * @returns {Boolean}
     */

    /**
     * Checks if value is a booleanOps.
     * @function module:_objectOps.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:_objectOps.isNumber
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is a stringOps or not.
     * @function module:_objectOps.isString
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Map` or not.
     * @function module:_objectOps.isMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Set` or not.
     * @function module:_objectOps.isSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:_objectOps.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:_objectOps.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is undefined.
     * @function module:_objectOps.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is null.
     * @function module:_objectOps.isNull
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a `Symbol`.
     * @function module:_objectOps.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * @tentative
     * @private
     */

    /**
     * Checks if given `x` is one of the four
     * "usable" immutable JS primitives; I.e.,
     *  One of [String, Boolean, Number, Symbol]
     * @function module:_objectOps.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if !length.
     * @function module:_objectOps.isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:_objectOps.isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:_objectOps.isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks to see if passed in argument is empty.
     * @function module:_objectOps.isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */

    /**
     * Returns whether passed in values is defined and not null.
     * @function module:_objectOps.isset
     * @param x {*}
     * @returns {Boolean}
     */
});