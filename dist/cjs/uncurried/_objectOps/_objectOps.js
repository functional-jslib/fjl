'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toArray = exports.fromArrayMap = exports.toArrayMap = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @module _objectOps
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @description Object operations (uncurried).
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @private
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _object = require('../_jsPlatform/_object');

Object.keys(_object).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _object[key];
        }
    });
});

var _prop = require('./_prop');

Object.keys(_prop).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _prop[key];
        }
    });
});

var _typeOf = require('./_typeOf');

Object.keys(_typeOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _typeOf[key];
        }
    });
});

var _is = require('./_is');

Object.keys(_is).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _is[key];
        }
    });
});

var _of = require('./_of');

Object.keys(_of).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _of[key];
        }
    });
});

var _assignDeep = require('./_assignDeep');

Object.keys(_assignDeep).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _assignDeep[key];
        }
    });
});

var _setTheory = require('./_setTheory');

Object.keys(_setTheory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _setTheory[key];
        }
    });
});
var toArrayMap = exports.toArrayMap = function toArrayMap(obj) {
    return Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
},
    fromArrayMap = exports.fromArrayMap = function fromArrayMap(xs) {
    return xs.reduce(function (agg, _ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        agg[key] = value;
        return agg;
    }, {});
},
    toArray = exports.toArray = function toArray(x) {
    var out = void 0;
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