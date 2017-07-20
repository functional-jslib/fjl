define(['exports', './curry', './typeOf'], function (exports, _curry, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.instanceOf = undefined;
    exports.isClass = isClass;
    exports.isFunction = isFunction;
    exports.isset = isset;
    exports.issetAndOfType = issetAndOfType;
    exports.isArray = isArray;
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
    exports.isEmpty = isEmpty;
    exports.notEmptyAndOfType = notEmptyAndOfType;
    exports.isConstructablePrimitive = isConstructablePrimitive;
    /**
     * Created by elyde on 12/18/2016.
     */
    /**
     * @author elyde
     * @created 12/10/2016.
     * @module is
     * @type {{isset: module:is.isset, issetAndOfType: module:is.issetAndOfType, isNumber: module:is.isNumber, isFunction: module:is.isFunction, isClass: module:is.isClass, isArray: module:is.isArray, isBoolean: module:is.isBoolean, isObject: module:is.isObject, isString: module:is.isString, isMap: module:is.isMap, isSet: module:is.isSet, isWeakMap: module:is.isWeakMap, isWeakSet: module:is.isWeakSet, isUndefined: module:is.isUndefined, isNull: module:is.isNull, isSymbol: module:is.isSymbol, isEmpty: module:is.isEmpty, instanceOf: Function, isConstructablePrimitive: isConstructablePrimitive, notEmptyAndOfType: module:is.notEmptyAndOfType}}
     */

    let _String = String.name,
        _Function = Function.name,
        _Array = Array.name,
        _Number = Number.name,
        _Object = Object.name,
        _Boolean = Boolean.name,
        _Map = 'Map',
        _Set = 'Set',
        _WeakMap = 'WeakMap',
        _WeakSet = 'WeakSet',
        _Null = 'Null',
        _Undefined = 'Undefined',
        _undefined = 'undefined';

    /**
     * Returns whether constructor has derived object.
     * @instanceConstructor {Function|Class}
     * @instance {*}
     * @returns {Boolean}
     */
    const instanceOf = exports.instanceOf = (0, _curry.curry2)((instanceConstructor, instance) => {
        return instance instanceof instanceConstructor;
    });

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:is.isClass
     * @param value {*}
     * @returns {boolean}
     */
    function isClass(value) {
        return value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10));
    }

    /**
     * Returns whether a value is a function or not.
     * @function module:is.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    function isFunction(value) {
        return !isClass(value) && value instanceof Function;
    }

    /**
     * Checks to see if value passed in is set (not undefined and not null).
     * @function module:is.isset
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isset(value) {
        return typeof value !== _undefined && value !== null;
    }

    /**
     * Checks whether a value isset and if it's type is the same as the type name passed in.
     * @function module:is.issetAndOfType
     * @param value {*} - Value to check on.
     * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
     * @returns {Boolean}
     */
    function issetAndOfType(value, type) {
        return isset(value) && (0, _typeOf.typeOfIs)(type, value);
    }

    /**
     * Checks if value is an array.
     * @function module:is.isArray
     * @param value {*}
     * @returns {boolean}
     */
    function isArray(value) {
        return (0, _typeOf.typeOfIs)(Array, value);
    }

    /**
     * Checks whether value is an object or not.
     * @function module:is.isObject
     * @param value
     * @returns {Boolean}
     */
    function isObject(value) {
        return (0, _typeOf.typeOfIs)(_Object, value);
    }

    /**
     * Checks if value is a boolean.
     * @function module:is.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    function isBoolean(value) {
        return (0, _typeOf.typeOfIs)(_Boolean, value);
    }

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:is.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    function isNumber(value) {
        return (0, _typeOf.typeOfIs)(_Number, value);
    }

    /**
     * Checks whether value is a string or not.
     * @function module:is.isString
     * @param value {*}
     * @returns {Boolean}
     */
    function isString(value) {
        return (0, _typeOf.typeOfIs)(_String, value);
    }

    /**
     * Checks whether value is of `Map` or not.
     * @function module:is.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    function isMap(value) {
        return (0, _typeOf.typeOfIs)(_Map, value);
    }

    /**
     * Checks whether value is of `Set` or not.
     * @function module:is.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    function isSet(value) {
        return (0, _typeOf.typeOfIs)(_Set, value);
    }

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:is.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    function isWeakMap(value) {
        return (0, _typeOf.typeOfIs)(_WeakMap, value);
    }

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:is.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    function isWeakSet(value) {
        return (0, _typeOf.typeOfIs)(_WeakSet, value);
    }

    /**
     * Checks if value is undefined.
     * @function module:is.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    function isUndefined(value) {
        return (0, _typeOf.typeOfIs)(_Undefined, value);
    }

    /**
     * Checks if value is null.
     * @function module:is.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    function isNull(value) {
        return (0, _typeOf.typeOfIs)(_Null, value);
    }

    /**
     * Checks if value is a `Symbol`.
     * @function module:is.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    function isSymbol(value) {
        return (0, _typeOf.typeOfIs)('Symbol', value);
    }

    /**
     * Checks to see if passed in argument is empty.
     * @function module:is.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isEmpty(value) {
        let typeOfValue = (0, _typeOf.typeOf)(value),
            retVal;

        if (typeOfValue === _Array || typeOfValue === _String || typeOfValue === _Function) {
            retVal = value.length === 0;
        } else if (typeOfValue === _Number && value !== 0) {
            retVal = false;
        } else if (typeOfValue === _Object) {
            retVal = Object.keys(value).length === 0;
        } else {
            retVal = !value;
        }
        return retVal;
    }

    /**
     * Returns true if an element is not empty and is of type.
     * @function module:is.notEmptyAndOfType
     * @param type {String|Function} - Type to check against (string name or actual constructor).
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function notEmptyAndOfType(type, value) {
        return !isEmpty(value) && (0, _typeOf.typeOfIs)(type, value);
    }

    /**
     * Checks to see if value can be constructed from a constructor.
     * @param value {*}
     * @returns {Boolean}
     */
    function isConstructablePrimitive(value) {
        return [isNumber, isBoolean, isString, isObject, isArray, isFunction, isMap, isSet, isWeakMap, isWeakSet].some(fn => fn(value));
    }

    exports.default = {
        isset,
        issetAndOfType,
        isNumber,
        isFunction,
        isClass,
        isArray,
        isBoolean,
        isObject,
        isString,
        isMap,
        isSet,
        isWeakMap,
        isWeakSet,
        isUndefined,
        isNull,
        isSymbol,
        isEmpty,
        instanceOf,
        isConstructablePrimitive,
        notEmptyAndOfType
    };
});