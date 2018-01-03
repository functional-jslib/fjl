define(['exports', './uncurried/_jsPlatform/object_', './uncurried/_objectOps/typeOf_', './uncurried/_objectOps/of_', './uncurried/_objectOps/is_', './uncurried/_functionOps/_curry', './uncurried/_objectOps/prop_', './uncurried/_objectOps/assignDeep_', './uncurried/_objectOps/setTheory_'], function (exports, _object_, _typeOf_, _of_, _is_, _curry, _prop_, _assignDeep_, _setTheory_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isType = exports.objComplement = exports.objDifference = exports.objIntersect = exports.objUnion = exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.prop = exports._objDifference = exports._objIntersect = exports._objComplement = exports._objUnion = exports._assignDeep = exports._prop = exports._assign = exports._hasOwnProperty = exports._isType = exports._instanceOf = exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isFunction = exports.keys = exports.length = undefined;
    Object.defineProperty(exports, 'length', {
        enumerable: true,
        get: function () {
            return _object_.length;
        }
    });
    Object.defineProperty(exports, 'keys', {
        enumerable: true,
        get: function () {
            return _object_.keys;
        }
    });
    Object.keys(_typeOf_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _typeOf_[key];
            }
        });
    });
    Object.keys(_of_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _of_[key];
            }
        });
    });
    Object.defineProperty(exports, 'isFunction', {
        enumerable: true,
        get: function () {
            return _is_.isFunction;
        }
    });
    Object.defineProperty(exports, 'isClass', {
        enumerable: true,
        get: function () {
            return _is_.isClass;
        }
    });
    Object.defineProperty(exports, 'isCallable', {
        enumerable: true,
        get: function () {
            return _is_.isCallable;
        }
    });
    Object.defineProperty(exports, 'isArray', {
        enumerable: true,
        get: function () {
            return _is_.isArray;
        }
    });
    Object.defineProperty(exports, 'isObject', {
        enumerable: true,
        get: function () {
            return _is_.isObject;
        }
    });
    Object.defineProperty(exports, 'isBoolean', {
        enumerable: true,
        get: function () {
            return _is_.isBoolean;
        }
    });
    Object.defineProperty(exports, 'isNumber', {
        enumerable: true,
        get: function () {
            return _is_.isNumber;
        }
    });
    Object.defineProperty(exports, 'isString', {
        enumerable: true,
        get: function () {
            return _is_.isString;
        }
    });
    Object.defineProperty(exports, 'isMap', {
        enumerable: true,
        get: function () {
            return _is_.isMap;
        }
    });
    Object.defineProperty(exports, 'isSet', {
        enumerable: true,
        get: function () {
            return _is_.isSet;
        }
    });
    Object.defineProperty(exports, 'isWeakMap', {
        enumerable: true,
        get: function () {
            return _is_.isWeakMap;
        }
    });
    Object.defineProperty(exports, 'isWeakSet', {
        enumerable: true,
        get: function () {
            return _is_.isWeakSet;
        }
    });
    Object.defineProperty(exports, 'isUndefined', {
        enumerable: true,
        get: function () {
            return _is_.isUndefined;
        }
    });
    Object.defineProperty(exports, 'isNull', {
        enumerable: true,
        get: function () {
            return _is_.isNull;
        }
    });
    Object.defineProperty(exports, 'isSymbol', {
        enumerable: true,
        get: function () {
            return _is_.isSymbol;
        }
    });
    Object.defineProperty(exports, 'isUsableImmutablePrimitive', {
        enumerable: true,
        get: function () {
            return _is_.isUsableImmutablePrimitive;
        }
    });
    Object.defineProperty(exports, 'isEmptyList', {
        enumerable: true,
        get: function () {
            return _is_.isEmptyList;
        }
    });
    Object.defineProperty(exports, 'isEmptyObject', {
        enumerable: true,
        get: function () {
            return _is_.isEmptyObject;
        }
    });
    Object.defineProperty(exports, 'isEmptyCollection', {
        enumerable: true,
        get: function () {
            return _is_.isEmptyCollection;
        }
    });
    Object.defineProperty(exports, 'isEmpty', {
        enumerable: true,
        get: function () {
            return _is_.isEmpty;
        }
    });
    Object.defineProperty(exports, 'isset', {
        enumerable: true,
        get: function () {
            return _is_.isset;
        }
    });
    exports._instanceOf = _object_.instanceOf;
    exports._isType = _is_.isType;
    exports._hasOwnProperty = _object_.hasOwnProperty;
    exports._assign = _object_.assign;
    exports._prop = _prop_.prop;
    exports._assignDeep = _assignDeep_.assignDeep;
    exports._objUnion = _setTheory_.objUnion;
    exports._objComplement = _setTheory_.objComplement;
    exports._objIntersect = _setTheory_.objIntersect;
    exports._objDifference = _setTheory_.objDifference;
    const prop = exports.prop = (0, _curry.curry)(_prop_.prop),


    /**
     * `instanceof` in function form.
     * @function module:_objectOps.instanceOf
     * @param instance {*}
     * @param Type {Function}
     * @returns {Boolean}
     */
    instanceOf = exports.instanceOf = (0, _curry.curry)(_object_.instanceOf),
          hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_object_.hasOwnProperty),
          assign = exports.assign = (0, _curry.curry2)(_object_.assign),
          assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep_.assignDeep),
          objUnion = exports.objUnion = (0, _curry.curry)(_setTheory_.objUnion),
          objIntersect = exports.objIntersect = (0, _curry.curry)(_setTheory_.objIntersect),
          objDifference = exports.objDifference = (0, _curry.curry)(_setTheory_.objDifference),
          objComplement = exports.objComplement = (0, _curry.curry2)(_setTheory_.objComplement),


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
    isType = exports.isType = (0, _curry.curry)(_is_.isType);

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