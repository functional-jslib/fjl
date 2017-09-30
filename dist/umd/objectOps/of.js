(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is', '../uncurried/jsPlatform/object_', '../functionOps/apply'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is'), require('../uncurried/jsPlatform/object_'), require('../functionOps/apply'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.object_, global.apply);
        global.of = mod.exports;
    }
})(this, function (exports, _is, _object_, _apply) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;
    var of = exports.of = function of(x) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (!(0, _is.isset)(x)) {
            return undefined;
        }
        var constructor = x.constructor;
        if ((0, _object_.hasOwnProperty)('of', constructor)) {
            return (0, _apply.apply)(constructor.of, args);
        } else if ((0, _is.isUsableImmutablePrimitive)(x)) {
            return (0, _apply.apply)(constructor, args);
        } else if ((0, _is.isFunction)(constructor)) {
            return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
        }
        return undefined;
    };
});