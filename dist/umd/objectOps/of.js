(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is', './objectPrelude', '../functionOps/apply', './typeOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is'), require('./objectPrelude'), require('../functionOps/apply'), require('./typeOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.objectPrelude, global.apply, global.typeOf);
        global.of = mod.exports;
    }
})(this, function (exports, _is, _objectPrelude, _apply, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;
    var of = exports.of = function of(x) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        var constructor = x.constructor,
            typeOfX = (0, _typeOf.typeOf)(x);
        if ((0, _objectPrelude.hasOwnProperty)('of', constructor)) {
            return (0, _apply.apply)(constructor.of, args);
        } else if ((0, _is.isUsableImmutablePrimitive)(typeOfX)) {
            return (0, _apply.apply)(constructor, args);
        } else if ((0, _is.isFunction)(constructor)) {
            return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
        }
        return undefined;
    };
});