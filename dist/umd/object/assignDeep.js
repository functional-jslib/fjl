(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is', '../jsPlatform/object', '../function/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is'), require('../jsPlatform/object'), require('../function/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.object, global.curry);
        global.assignDeep = mod.exports;
    }
})(this, function (exports, _is, _object, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.assignDeep = undefined;
    var
    /**
     * Merges all objects down into one (takes two or more args).
     * @function module:object.assignDeep
     * @param obj0 {Object}
     * @param [objs] {...{Object}} - One or more objects to merge onto `obj0`.
     * @returns {Object}
     */
    assignDeep = exports.assignDeep = (0, _curry.curry2)(function (obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return !obj0 ? obj0 : objs.reduce(function (topAgg, obj) {
            return !obj ? topAgg : (0, _object.keys)(obj).reduce(function (agg, key) {
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
    });
});