define(['exports', './assignDeep', '../jsPlatform/objectOpsUncurried', './typeOf', './is', './of', './setTheoryOps', '../functionOps/curry'], function (exports, _assignDeep, _objectOpsUncurried, _typeOf, _is, _of, _setTheoryOps, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assign = exports.hasOwnProperty = exports.instanceOf = exports.keys = exports.toString = exports.length = exports.assignDeep = undefined;
    Object.defineProperty(exports, 'assignDeep', {
        enumerable: true,
        get: function () {
            return _assignDeep.assignDeep;
        }
    });
    Object.defineProperty(exports, 'length', {
        enumerable: true,
        get: function () {
            return _objectOpsUncurried.length;
        }
    });
    Object.defineProperty(exports, 'toString', {
        enumerable: true,
        get: function () {
            return _objectOpsUncurried.toString;
        }
    });
    Object.defineProperty(exports, 'keys', {
        enumerable: true,
        get: function () {
            return _objectOpsUncurried.keys;
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
    Object.keys(_setTheoryOps).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheoryOps[key];
            }
        });
    });
    const instanceOf = exports.instanceOf = (0, _curry.curry)(_objectOpsUncurried.instanceOf),
          hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_objectOpsUncurried.hasOwnProperty),
          assign = exports.assign = (0, _curry.curry)(_objectOpsUncurried.assign);
});