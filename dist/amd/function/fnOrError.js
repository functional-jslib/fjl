define(['exports', '../object/typeOf'], function (exports, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    const

    /**
     * Throws error if `f` is not a function, else returns it (`f`).
     * @private
     * @param symbolName {String}
     * @param f {*} - Expected function.
     * @returns {Function}
     */
    fnOrError = (symbolName, f) => {
        if (!f || !(f instanceof Function)) {
            throw new Error(`${symbolName} should be a function. ` + `Type received: ${(0, _typeOf.typeOf)(f)};  Value received: ${f}.`);
        }
        return f;
    };

    exports.default = fnOrError;
});