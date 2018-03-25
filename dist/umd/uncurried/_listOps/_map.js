(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../_jsPlatform/_object'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../_jsPlatform/_object'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global._object);
        global._map = mod.exports;
    }
})(this, function (module, exports, _object) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = _map;


    /**
     * @function module:_listOps.map
     * @param fn {Function} - Function to map on array.
     * @param xs {Array}
     * @returns {Array}
     */
    function _map(fn, xs) {
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
    }
    module.exports = exports['default'];
});