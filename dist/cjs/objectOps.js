'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.keys = exports.toString = exports.length = undefined;

var _object_ = require('./uncurried/jsPlatform/object_');

Object.defineProperty(exports, 'length', {
    enumerable: true,
    get: function get() {
        return _object_.length;
    }
});
Object.defineProperty(exports, 'toString', {
    enumerable: true,
    get: function get() {
        return _object_.toString;
    }
});
Object.defineProperty(exports, 'keys', {
    enumerable: true,
    get: function get() {
        return _object_.keys;
    }
});

var _typeOf_ = require('./uncurried/objectOps/typeOf_');

Object.keys(_typeOf_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _typeOf_[key];
        }
    });
});

var _is = require('./objectOps/is');

Object.keys(_is).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _is[key];
        }
    });
});

var _of_ = require('./uncurried/objectOps/of_');

Object.keys(_of_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _of_[key];
        }
    });
});

var _setTheory = require('./objectOps/setTheory');

Object.keys(_setTheory).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _setTheory[key];
        }
    });
});

var _curry_ = require('./uncurried/functionOps/curry_');

var _assignDeep_ = require('./uncurried/objectOps/assignDeep_');

var instanceOf = exports.instanceOf = (0, _curry_.curry)(_object_.instanceOf),
    hasOwnProperty = exports.hasOwnProperty = (0, _curry_.curry)(_object_.hasOwnProperty),
    assign = exports.assign = (0, _curry_.curry2)(_object_.assign),
    assignDeep = exports.assignDeep = (0, _curry_.curry2)(_assignDeep_.assignDeep);