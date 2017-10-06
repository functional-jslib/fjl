(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is_', '../jsPlatform/object_', '../functionOps/apply_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is_'), require('../jsPlatform/object_'), require('../functionOps/apply_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is_, global.object_, global.apply_);
        global.of_ = mod.exports;
    }
})(this, function (exports, _is_, _object_, _apply_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;
    var of = exports.of = function of(x) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        if (!(0, _is_.isset)(x)) {
            return undefined;
        }
        var constructor = x.constructor;
        if ((0, _object_.hasOwnProperty)('of', constructor)) {
            return (0, _apply_.apply)(constructor.of, args);
        } else if ((0, _is_.isUsableImmutablePrimitive)(x)) {
            return (0, _apply_.apply)(constructor, args);
        } else if ((0, _is_.isFunction)(constructor)) {
            return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
        }
        return undefined;
    };
});