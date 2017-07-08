(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './curry', './typeOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./curry'), require('./typeOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.typeOf);
        global.is = mod.exports;
    }
})(this, function (exports, _curry, _typeOf) {
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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var _String = String.name,
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
    var instanceOf = exports.instanceOf = (0, _curry.curry2)(function (instanceConstructor, instance) {
        return instance instanceof instanceConstructor;
    });

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:fjl.isClass
     * @param value {*}
     * @returns {boolean}
     */
    function isClass(value) {
        return value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10));
    }

    /**
     * Returns whether a value is a function or not.
     * @function module:sjl.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    function isFunction(value) {
        return !isClass(value) && value instanceof Function;
    }

    /**
     * Checks to see if value passed in is set (not undefined and not null).
     * @function module:sjl.isset
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isset(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== _undefined && value !== null;
    }

    /**
     * Checks whether a value isset and if it's type is the same as the type name passed in.
     * @function module:sjl.issetAndOfType
     * @param value {*} - Value to check on.
     * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
     * @returns {Boolean}
     */
    function issetAndOfType(value, type) {
        return isset(value) && (0, _typeOf.typeOfIs)(type, value);
    }

    /**
     * Checks if value is an array.
     * @function module:sjl.isArray
     * @param value {*}
     * @returns {boolean}
     */
    function isArray(value) {
        return (0, _typeOf.typeOfIs)(Array, value);
    }

    /**
     * Checks whether value is an object or not.
     * @function module:sjl.isObject
     * @param value
     * @returns {Boolean}
     */
    function isObject(value) {
        return (0, _typeOf.typeOfIs)(_Object, value);
    }

    /**
     * Checks if value is a boolean.
     * @function module:sjl.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    function isBoolean(value) {
        return (0, _typeOf.typeOfIs)(_Boolean, value);
    }

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:sjl.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    function isNumber(value) {
        return (0, _typeOf.typeOfIs)(_Number, value);
    }

    /**
     * Checks whether value is a string or not.
     * @function module:sjl.isString
     * @param value {*}
     * @returns {Boolean}
     */
    function isString(value) {
        return (0, _typeOf.typeOfIs)(_String, value);
    }

    /**
     * Checks whether value is of `Map` or not.
     * @function module:sjl.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    function isMap(value) {
        return (0, _typeOf.typeOfIs)(_Map, value);
    }

    /**
     * Checks whether value is of `Set` or not.
     * @function module:sjl.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    function isSet(value) {
        return (0, _typeOf.typeOfIs)(_Set, value);
    }

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:sjl.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    function isWeakMap(value) {
        return (0, _typeOf.typeOfIs)(_WeakMap, value);
    }

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:sjl.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    function isWeakSet(value) {
        return (0, _typeOf.typeOfIs)(_WeakSet, value);
    }

    /**
     * Checks if value is undefined.
     * @function module:sjl.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    function isUndefined(value) {
        return (0, _typeOf.typeOfIs)(_Undefined, value);
    }

    /**
     * Checks if value is null.
     * @function module:sjl.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    function isNull(value) {
        return (0, _typeOf.typeOfIs)(_Null, value);
    }

    /**
     * Checks if value is a `Symbol`.
     * @function module:sjl.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    function isSymbol(value) {
        return (0, _typeOf.typeOfIs)('Symbol', value);
    }

    /**
     * Checks to see if passed in argument is empty.
     * @function module:sjl.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isEmpty(value) {
        var typeOfValue = (0, _typeOf.typeOf)(value),
            retVal = void 0;

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
     * @function module:sjl.notEmptyAndOfType
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
        return [isNumber, isBoolean, isString, isObject, isArray, isFunction, isMap, isSet, isWeakMap, isWeakSet].some(function (fn) {
            return fn(value);
        });
    }

    exports.default = {
        isset: isset,
        issetAndOfType: issetAndOfType,
        isNumber: isNumber,
        isFunction: isFunction,
        isClass: isClass,
        isArray: isArray,
        isBoolean: isBoolean,
        isObject: isObject,
        isString: isString,
        isMap: isMap,
        isSet: isSet,
        isWeakMap: isWeakMap,
        isWeakSet: isWeakSet,
        isUndefined: isUndefined,
        isNull: isNull,
        isSymbol: isSymbol,
        isEmpty: isEmpty,
        instanceOf: instanceOf,
        isConstructablePrimitive: isConstructablePrimitive,
        notEmptyAndOfType: notEmptyAndOfType
    };
});