define(['exports', './_jsPlatform/_object', './_objectOps/_prop', './_objectOps/_typeOf', './_objectOps/_is', './_objectOps/_of', './_objectOps/_assignDeep', './_objectOps/_setTheory'], function (exports, _object, _prop, _typeOf, _is, _of, _assignDeep, _setTheory) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.toArray = exports.fromArrayMap = exports.toArrayMap = undefined;
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
    /**
     * @module _objectOps
     * @description Object operations (uncurried).
     * @private
     */
    const toArrayMap = exports.toArrayMap = obj => Object.keys(obj).map(key => [key, obj[key]]),
          fromArrayMap = exports.fromArrayMap = xs => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, {}),
          toArray = exports.toArray = x => {
        let out;
        switch ((0, _typeOf.typeOf)(x)) {
            case 'Null':
            case 'Undefined':
                out = [];
                break;
            case String.name:
            case Array.name:
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case 'Set':
                out = Array.from(x);
                break;
            case Object.name:
            default:
                out = toArrayMap(x);
                break;
        }
        return out;
    };
});