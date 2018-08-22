(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../jsPlatform/object', '../function/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../jsPlatform/object'), require('../function/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.object, global.curry);
        global.map = mod.exports;
    }
})(this, function (module, exports, _object, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    /**
     * @function module:list.map
     * @param fn {Function} - Function to map on array.
     * @param xs {Array}
     * @returns {Array}
     */
    var map = (0, _curry.curry)(function (fn, xs) {
        var ind = 0,
            limit = (0, _object.length)(xs),
            out = [];
        if (!limit) {
            return out;
        }
        while (ind < limit) {
            out.push(fn(xs[ind], ind, xs));
            ind += 1;
        }
        return out;
    });

    exports.default = map;
    module.exports = exports['default'];
});