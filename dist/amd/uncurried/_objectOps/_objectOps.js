define(['exports', '../_jsPlatform/_object', './_prop', './_typeOf', './_is', './_of', './_assignDeep', './_setTheory', './_console', './_errorThrowing'], function (exports, _object, _prop, _typeOf, _is, _of, _assignDeep, _setTheory, _console, _errorThrowing) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.toArray = exports.fromArrayMap = exports.toArrayMap = exports.jsonClone = undefined;
    Object.keys(_object).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _object[key];
            }
        });
    });
    Object.keys(_prop).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _prop[key];
            }
        });
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
    Object.keys(_is).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _is[key];
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
    Object.keys(_assignDeep).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _assignDeep[key];
            }
        });
    });
    Object.keys(_setTheory).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheory[key];
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
    Object.keys(_errorThrowing).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _errorThrowing[key];
            }
        });
    });
    /**
     * @module _objectOps
     * @description Object operations (uncurried).
     * @private
     */
    const

    /**
     * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
     * @function module:objectOps.jsonClone
     * @param x {*}
     * @returns {*}
     */
    jsonClone = exports.jsonClone = x => JSON.parse(JSON.stringify(x)),


    /**
     * Returns an array map (associated list) representing incoming value (object, array, etc.).
     * @function module:objectOps.toArrayMap
     * @param obj {(Object|Array|*)}
     * @returns {*}
     */
    toArrayMap = exports.toArrayMap = obj => Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') {
            return [key, toArrayMap(obj[key])];
        }
        return [key, obj[key]];
    }),


    /**
     * Converts an array-map into an object (one level).
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = exports.fromArrayMap = xs => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, {}),


    /**
     * Attempts to convert incoming value into an array.  This method will yield
     * an array for most cases and throw errors where it cannot convert given value
     * to an array.
     * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
     * @note For `null` and `undefined` we are returning an empty array (since method name implies 'anything to array' etc.)..
     * @param x {*}
     * @returns {Array}
     */
    toArray = exports.toArray = x => {
        switch ((0, _typeOf.typeOf)(x)) {
            case 'Null':
            case 'Undefined':
                return [];
            case String.name:
            case Array.name:
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case 'Set':
                return Array.from(x);
            case Object.name:
            default:
                return toArrayMap(x);
        }
    };
});