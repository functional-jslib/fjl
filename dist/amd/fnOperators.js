define(['exports'], function (exports) {
    /**
     * Created by edlc on 5/1/17.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var call = exports.call = function call(fn, x) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        return fn.call.apply(fn, [x].concat(args));
    },
        apply = exports.apply = function apply(fn, x, args) {
        return fn.apply(x, args);
    };

    exports.default = {
        call: call,
        apply: apply
    };
});