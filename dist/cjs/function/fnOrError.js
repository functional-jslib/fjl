'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fnOrError = undefined;

var _typeOf = require('../object/typeOf');

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