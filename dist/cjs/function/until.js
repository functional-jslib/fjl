'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.until = undefined;

var _curry = require('./curry');

var

/**
 * Run `operation` until predicate returns `true` (like a functional
 *  version of a while loop).
 * @function module:function.until
 * @param predicate {Function} :: a -> Boolean
 * @param operation {Function} :: a -> a
 * @param typeInstance {*} :: * - A monoidal zero or some starting point.
 * @returns {*} - What ever type `typeInstance` is
 */
until = exports.until = (0, _curry.curry)(function (predicate, operation, typeInstance) {
    var result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
});