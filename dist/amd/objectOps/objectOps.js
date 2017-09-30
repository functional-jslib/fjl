define(['exports', '../uncurried/jsPlatform/object_', '../uncurried/objectOps/typeOf', '../uncurried/objectOps/is', '../uncurried/objectOps/of', '../uncurried/objectOps/setTheory', '../functionOps/curry', '../uncurried/objectOps/assignDeep'], function (exports, _objectUncurried, _typeOf, _is, _of, _setTheory, _curry, _assignDeep) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.keys = exports.toString = exports.length = undefined;
    Object.defineProperty(exports, 'length', {
        enumerable: true,
        get: function () {
            return _objectUncurried.length;
        }
    });
    Object.defineProperty(exports, 'toString', {
        enumerable: true,
        get: function () {
            return _objectUncurried.toString;
        }
    });
    Object.defineProperty(exports, 'keys', {
        enumerable: true,
        get: function () {
            return _objectUncurried.keys;
        }
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
    Object.keys(_setTheory).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheory[key];
            }
        });
    });
    const instanceOf = exports.instanceOf = (0, _curry.curry)(_objectUncurried.instanceOf),
          hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_objectUncurried.hasOwnProperty),
          assign = exports.assign = (0, _curry.curry2)(_objectUncurried.assign),
          assignDeep = exports.assignDeep = (0, _curry.curry2)(_assignDeep.assignDeep);
});