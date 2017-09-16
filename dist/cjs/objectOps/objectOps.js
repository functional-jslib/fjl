'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.keys = exports.toString = exports.length = undefined;

var _objectOpsUncurried = require('../uncurried/jsPlatform/objectOpsUncurried');

Object.defineProperty(exports, 'length', {
    enumerable: true,
    get: function get() {
        return _objectOpsUncurried.length;
    }
});
Object.defineProperty(exports, 'toString', {
    enumerable: true,
    get: function get() {
        return _objectOpsUncurried.toString;
    }
});
Object.defineProperty(exports, 'keys', {
    enumerable: true,
    get: function get() {
        return _objectOpsUncurried.keys;
    }
});

var _typeOf = require('../uncurried/objectOps/typeOf');

Object.keys(_typeOf).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _typeOf[key];
        }
    });
});

var _is = require('../uncurried/objectOps/is');

Object.keys(_is).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _is[key];
        }
    });
});

var _of = require('../uncurried/objectOps/of');

Object.keys(_of).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _of[key];
        }
    });
});

var _setTheoryOps = require('../uncurried/objectOps/setTheoryOps');

Object.keys(_setTheoryOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _setTheoryOps[key];
        }
    });
});

var _curry = require('../functionOps/curry');

var _assignDeep = require('../uncurried/objectOps/assignDeep');

var instanceOf = exports.instanceOf = (0, _curry.curry)(_objectOpsUncurried.instanceOf),
    hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_objectOpsUncurried.hasOwnProperty),
    assign = exports.assign = (0, _curry.curry2)(_objectOpsUncurried.assign),
    assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep.assignDeep);