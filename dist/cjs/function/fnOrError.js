'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeOf = require('../object/typeOf');

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