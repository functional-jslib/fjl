(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.fnOperators = mod.exports;
    }
})(this, function (exports) {
    /**
     * Created by edlc on 5/1/17.
     * Functionally styled `call` and `apply`.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var call = exports.call = function call(fn) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return fn.call.apply(fn, [null].concat(args));
    },
        apply = exports.apply = function apply(fn, args) {
        return fn.apply(null, args);
    },
        flipN = exports.flipN = function flipN(fn) {
        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            return apply(fn, args.reverse());
        };
    },
        flip = exports.flip = function flip(fn) {
        return function (b, a) {
            return call(fn, a, b);
        };
    };

    exports.default = {
        call: call,
        apply: apply,
        flip: flip,
        flipN: flipN
    };
});