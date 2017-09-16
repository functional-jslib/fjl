(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './assignDeep', '../jsPlatform/objectOpsUncurried', './typeOf', './is', './of', './setTheoryOps', '../functionOps/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./assignDeep'), require('../jsPlatform/objectOpsUncurried'), require('./typeOf'), require('./is'), require('./of'), require('./setTheoryOps'), require('../functionOps/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.assignDeep, global.objectOpsUncurried, global.typeOf, global.is, global.of, global.setTheoryOps, global.curry);
        global.objectOpsUncurried = mod.exports;
    }
})(this, function (exports, _assignDeep, _objectOpsUncurried, _typeOf, _is, _of, _setTheoryOps, _curry) {
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
    var instanceOf = exports.instanceOf = (0, _curry.curry)(_objectOpsUncurried.instanceOf),
        hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry)(_objectOpsUncurried.hasOwnProperty),
        assign = exports.assign = (0, _curry.curry)(_objectOpsUncurried.assign);
});