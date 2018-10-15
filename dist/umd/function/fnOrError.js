(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../object/typeOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../object/typeOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.typeOf);
        global.fnOrError = mod.exports;
    }
})(this, function (exports, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fnOrError = undefined;
    var

    /**
     * Returns a function or throws an error if given `f` is not a function.
     * @function module:function.fnOrError
     * @param symbolName {String} - Error message prefix.
     * @param f {Function|*} - Expected function.
     * @returns {Function}
     * @throws {Error} - Error if `f` is not of `function`
     */
    fnOrError = exports.fnOrError = function fnOrError(symbolName, f) {
        if (!f || !(f instanceof Function)) {
            throw new Error(symbolName + ' should be a function. ' + ('Type received: ' + (0, _typeOf.typeOf)(f) + ';  Value received: ' + f + '.'));
        }
        return f;
    };
});