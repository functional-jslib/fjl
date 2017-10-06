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

var _is_ = require('./uncurried/objectOps/is_');

Object.keys(_is_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _is_[key];
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

var _setTheory_ = require('./uncurried/objectOps/setTheory_');

Object.keys(_setTheory_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _setTheory_[key];
        }
    });
});

var _curry = require('./functionOps/curry');

var _assignDeep_ = require('./uncurried/objectOps/assignDeep_');

var instanceOf = exports.instanceOf = (0, _curry.curry)(_object_.instanceOf),
    hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_object_.hasOwnProperty),
    assign = exports.assign = (0, _curry.curry2)(_object_.assign),
    assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep_.assignDeep);