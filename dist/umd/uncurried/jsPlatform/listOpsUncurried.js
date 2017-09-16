(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../../utils/utils'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../../utils/utils'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.utils);
        global.listOpsUncurried = mod.exports;
    }
})(this, function (exports, _utils) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;


    // export {length, toString} from './objectOpsUnCurried';

    var concat = exports.concat = (0, _utils.fPureTakesOneOrMore)('concat'),
        slice = exports.slice = (0, _utils.fPureTakes2)('slice'),
        includes = exports.includes = function () {
        return 'includes' in Array.prototype ? (0, _utils.fPureTakesOne)('includes') : function (value, xs) {
            return xs.indexOf(value) > -1;
        };
    }(),


    /**
     * Searches list/list-like for given element `x`.
     * @function module:jsPlatform.listOpsUncurried.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = exports.indexOf = (0, _utils.fPureTakesOne)('indexOf'),
        lastIndexOf = exports.lastIndexOf = (0, _utils.fPureTakesOne)('lastIndexOf'); /**
                                                                                       *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
                                                                                       *      on both strings and arrays.
                                                                                       */
});