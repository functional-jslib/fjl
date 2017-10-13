define(['exports', './uncurried/jsPlatform/object_', './uncurried/objectOps/typeOf_', './uncurried/objectOps/is_', './uncurried/objectOps/of_', './uncurried/objectOps/setTheory_', './uncurried/functionOps/curry_', './uncurried/objectOps/assignDeep_'], function (exports, _object_, _typeOf_, _is_, _of_, _setTheory_, _curry_, _assignDeep_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.keys = exports.toString = exports.length = undefined;
    Object.defineProperty(exports, 'length', {
        enumerable: true,
        get: function () {
            return _object_.length;
        }
    });
    Object.defineProperty(exports, 'toString', {
        enumerable: true,
        get: function () {
            return _object_.toString;
        }
    });
    Object.defineProperty(exports, 'keys', {
        enumerable: true,
        get: function () {
            return _object_.keys;
        }
    });
    Object.keys(_typeOf_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _typeOf_[key];
            }
        });
    });
    Object.keys(_is_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _is_[key];
            }
        });
    });
    Object.keys(_of_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _of_[key];
            }
        });
    });
    Object.keys(_setTheory_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheory_[key];
            }
        });
    });
    const instanceOf = exports.instanceOf = (0, _curry_.curry)(_object_.instanceOf),
          hasOwnProperty = exports.hasOwnProperty = (0, _curry_.curry)(_object_.hasOwnProperty),
          assign = exports.assign = (0, _curry_.curry2)(_object_.assign),
          assignDeep = exports.assignDeep = (0, _curry_.curry2)(_assignDeep_.assignDeep);
});