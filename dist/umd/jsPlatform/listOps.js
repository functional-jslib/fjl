(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/listOpsUncurried'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../functionOps/curry'), require('../uncurried/jsPlatform/listOpsUncurried'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.listOpsUncurried);
        global.listOps = mod.exports;
    }
})(this, function (exports, _curry, _listOpsUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;
    /**
     *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
     *      on both strings and arrays.
     *  @module jsPlatform.listOps
     */

    var concat = exports.concat = _listOpsUncurried.concat,


    /**
     * Calls `slice` method on passed in instance.
     * @function module:jsPlatform.listOps.slice
     * @param separator {String|RegExp}
     * @param list {Array|String|*}
     * @returns {Array|String|*}
     */
    slice = exports.slice = (0, _curry.curry)(_listOpsUncurried.slice),


    /**
     *
     */
    includes = exports.includes = _listOpsUncurried.includes,
        indexOf = exports.indexOf = _listOpsUncurried.indexOf,
        lastIndexOf = exports.lastIndexOf = _listOpsUncurried.lastIndexOf;
});