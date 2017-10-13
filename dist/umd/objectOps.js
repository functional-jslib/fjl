(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './uncurried/jsPlatform/object_', './uncurried/objectOps/typeOf_', './objectOps/is', './uncurried/objectOps/of_', './objectOps/setTheory', './uncurried/functionOps/curry_', './uncurried/objectOps/assignDeep_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./uncurried/jsPlatform/object_'), require('./uncurried/objectOps/typeOf_'), require('./objectOps/is'), require('./uncurried/objectOps/of_'), require('./objectOps/setTheory'), require('./uncurried/functionOps/curry_'), require('./uncurried/objectOps/assignDeep_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.object_, global.typeOf_, global.is, global.of_, global.setTheory, global.curry_, global.assignDeep_);
        global.objectOps = mod.exports;
    }
})(this, function (exports, _object_, _typeOf_, _is, _of_, _setTheory, _curry_, _assignDeep_) {
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
    Object.keys(_is).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _is[key];
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
    Object.keys(_setTheory).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _setTheory[key];
            }
        });
    });
    var instanceOf = exports.instanceOf = (0, _curry_.curry)(_object_.instanceOf),
        hasOwnProperty = exports.hasOwnProperty = (0, _curry_.curry)(_object_.hasOwnProperty),
        assign = exports.assign = (0, _curry_.curry2)(_object_.assign),
        assignDeep = exports.assignDeep = (0, _curry_.curry2)(_assignDeep_.assignDeep);
});