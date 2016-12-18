(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './typeOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./typeOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.typeOf);
        global.is = mod.exports;
    }
})(this, function (exports, _typeOf) {
    /**
     * Created by elyde on 12/18/2016.
     */
    /**
     * Created by elyde on 12/10/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isFunction = isFunction;
    exports.isset = isset;
    exports.issetMulti = issetMulti;
    exports.issetAndOfType = issetAndOfType;
    exports.isArray = isArray;
    exports.isObject = isObject;
    exports.isBoolean = isBoolean;
    exports.isNumber = isNumber;
    exports.isString = isString;
    exports.isUndefined = isUndefined;
    exports.isNull = isNull;
    exports.isSymbol = isSymbol;
    exports.isEmptyObj = isEmptyObj;
    exports.isEmpty = isEmpty;
    exports.isEmptyMulti = isEmptyMulti;

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
        _Null = 'Null',
        _Undefined = 'Undefined',
        _undefined = 'undefined';

    /**
     * Returns whether a value is a function or not.
     * @function module:sjl.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    function isFunction(value) {
        return value instanceof Function;
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
     * Checks if one or more parameters are set (not null and not undefined).
     * @function module:sjl.issetMulti
     * @params {*} - One or more values to check of any type.
     * @returns {Boolean} - True if all params passed in are not null or undefined.
     */
    function issetMulti() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return !args.some(function (value) {
            return !isset(value);
        });
    }

    /**
     * Checks whether a value isset and if it's type is the same as the type name passed in.
     * @function module:sjl.issetAndOfType
     * @param value {*} - Value to check on.
     * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
     * @returns {Boolean}
     */
    function issetAndOfType(value, type) {
        return isset(value) && (0, _typeOf.typeOfIs)(value, type);
    }

    /**
     * Checks if value is an array.
     * @function module:sjl.isArray
     * @param value {*}
     * @returns {boolean}
     */
    function isArray(value) {
        return Array.isArray(value);
    }

    /**
     * Checks whether value is an object or not.
     * @function module:sjl.isObject
     * @param value
     * @returns {Boolean}
     */
    function isObject(value) {
        return (0, _typeOf.typeOfIs)(value, _Object);
    }

    /**
     * Checks if value is a boolean.
     * @function module:sjl.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    function isBoolean(value) {
        return (0, _typeOf.typeOfIs)(value, _Boolean);
    }

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:sjl.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    function isNumber(value) {
        return (0, _typeOf.typeOfIs)(value, _Number);
    }

    /**
     * Checks whether value is a string or not.
     * @function module:sjl.isString
     * @param value {*}
     * @returns {Boolean}
     */
    function isString(value) {
        return (0, _typeOf.typeOfIs)(value, _String);
    }

    /**
     * Checks if value is undefined.
     * @function module:sjl.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    function isUndefined(value) {
        return (0, _typeOf.typeOfIs)(value, _Undefined);
    }

    /**
     * Checks if value is null.
     * @function module:sjl.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    function isNull(value) {
        return (0, _typeOf.typeOfIs)(value, _Null);
    }

    /**
     * Checks if value is a `Symbol`.
     * @function module:sjl.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    function isSymbol(value) {
        return (0, _typeOf.typeOfIs)(value, 'Symbol');
    }

    /**
     * Checks object's own properties to see if it is empty (Object.keys check).
     * @function module:sjl.isEmptyObj
     * @param obj object to be checked
     * @returns {Boolean}
     */
    function isEmptyObj(obj) {
        return Object.keys(obj).length === 0;
    }

    /**
     * Checks to see if passed in argument is empty.
     * @function module:sjl.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    function isEmpty(value) {
        var typeOfValue = (0, _typeOf.typeOf)(value);
        var retVal;

        if (typeOfValue === _Array || typeOfValue === _String || typeOfValue === _Function) {
            retVal = value.length === 0;
        } else if (typeOfValue === _Number && value !== 0) {
            retVal = false;
        } else if (typeOfValue === _Object) {
            retVal = isEmptyObj(value);
        } else {
            retVal = !value;
        }

        return retVal;
    }

    /**
     * Checks to see if any of the values passed in are empty (null, undefined, empty object, empty array, or empty string).
     * @function module:sjl.emptyMulti
     * @params {*} - One or more params of any type.
     * @returns {Boolean} - Returns true if any of the values passed in are empty (null, undefined, empty object, empty array, or empty string).
     */
    function isEmptyMulti() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return args.some(function (value) {
            return isEmpty(value);
        });
    }

    exports.default = {
        isset: isset,
        issetMulti: issetMulti,
        issetAndOfType: issetAndOfType,
        isNumber: isNumber,
        isFunction: isFunction,
        isArray: isArray,
        isBoolean: isBoolean,
        isObject: isObject,
        isString: isString,
        isUndefined: isUndefined,
        isNull: isNull,
        isSymbol: isSymbol,
        isEmpty: isEmpty,
        isEmptyMulti: isEmptyMulti,
        isEmptyObj: isEmptyObj
    };
});