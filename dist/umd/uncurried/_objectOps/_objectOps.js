(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../_jsPlatform/_object', './_prop', './_typeOf', './_is', './_of', './_assignDeep', './_setTheory', './_console'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../_jsPlatform/_object'), require('./_prop'), require('./_typeOf'), require('./_is'), require('./_of'), require('./_assignDeep'), require('./_setTheory'), require('./_console'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._object, global._prop, global._typeOf, global._is, global._of, global._assignDeep, global._setTheory, global._console);
        global._objectOps = mod.exports;
    }
})(this, function (exports, _object, _prop, _typeOf, _is, _of, _assignDeep, _setTheory, _console) {
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

    var _slicedToArray = function () {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;

            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);

                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }

            return _arr;
        }

        return function (arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var

    /**
     * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
     * @function module:objectOps.jsonClone
     * @param x {*}
     * @returns {*}
     */
    jsonClone = exports.jsonClone = function jsonClone(x) {
        return JSON.parse(JSON.stringify(x));
    },


    /**
     * Returns an array map (associated list) representing incoming value (object, array, etc.).
     * @function module:objectOps.toArrayMap
     * @param obj {(Object|Array|*)}
     * @returns {*}
     */
    toArrayMap = exports.toArrayMap = function toArrayMap(obj) {
        return Object.keys(obj).map(function (key) {
            if (_typeof(obj[key]) === 'object') {
                return [key, toArrayMap(obj[key])];
            }
            return [key, obj[key]];
        });
    },


    /**
     * Converts an array-map into an object (one level).
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = exports.fromArrayMap = function fromArrayMap(xs) {
        return xs.reduce(function (agg, _ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                value = _ref2[1];

            agg[key] = value;
            return agg;
        }, {});
    },


    /**
     * Attempts to convert incoming value into an array.  This method will yield
     * an array for most cases and throw errors where it cannot convert given value
     * to an array.
     * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
     * @note For `null` and `undefined` we are returning an empty array (since method name implies 'anything to array' etc.)..
     * @param x {*}
     * @returns {Array}
     */
    toArray = exports.toArray = function toArray(x) {
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