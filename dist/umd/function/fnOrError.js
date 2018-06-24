(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../object/typeOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../object/typeOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.typeOf);
        global.fnOrError = mod.exports;
    }
})(this, function (module, exports, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var

    /**
     * Throws error if `f` is not a function, else returns it (`f`).
     * @private
     * @param symbolName {String}
     * @param f {*} - Expected function.
     * @returns {Function}
     */
    fnOrError = function fnOrError(symbolName, f) {
        if (!f || typeof f !== 'function') {
            throw new Error(symbolName + ' should be a function. ' + ('Type received: ' + (0, _typeOf.typeOf)(f) + ';  Value received: ' + f + '.'));
        }
        return f;
    };

    exports.default = fnOrError;
    module.exports = exports['default'];
});