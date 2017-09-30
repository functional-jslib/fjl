(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/list_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../functionOps/curry'), require('../uncurried/jsPlatform/list_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.list_);
        global.list = mod.exports;
    }
})(this, function (exports, _curry, _list_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;
    /**
     * List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
     * on both strings and arrays.
     * @module jsPlatform_list
     * @private
     */

    var concat = exports.concat = (0, _curry.curry)(_list_.concat),
        slice = exports.slice = (0, _curry.curry)(_list_.slice),
        includes = exports.includes = (0, _curry.curry)(_list_.includes),
        indexOf = exports.indexOf = (0, _curry.curry)(_list_.indexOf),
        lastIndexOf = exports.lastIndexOf = (0, _curry.curry)(_list_.lastIndexOf);
});