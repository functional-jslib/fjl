(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './_is', '../_jsPlatform/_object'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./_is'), require('../_jsPlatform/_object'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._is, global._object);
        global._assignDeep = mod.exports;
    }
})(this, function (exports, _is, _object) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = undefined;
    var
    /**
     * Merges all objects down into one.
     * @function module:jsPlatform._objectOps_.assignDeep
     * @param obj0 {Object}
     * @param objs {...{Object}}
     * @returns {Object}
     */
    assignDeep = exports.assignDeep = function assignDeep(obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return objs.reduce(function (topAgg, obj) {
            return (0, _object.keys)(obj).reduce(function (agg, key) {
                var propDescription = Object.getOwnPropertyDescriptor(agg, key);
                // If property is not writable move to next item in collection
                if ((0, _object.hasOwnProperty)(key, agg) && propDescription && !(propDescription.get && propDescription.set) && !propDescription.writable) {
                    return agg;
                }
                if ((0, _is.isObject)(agg[key]) && (0, _is.isObject)(obj[key])) {
                    assignDeep(agg[key], obj[key]);
                } else {
                    agg[key] = obj[key];
                }
                return agg;
            }, topAgg);
        }, obj0);
    };
});