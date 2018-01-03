"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var

/**
 * Run `operation` until predicate returns `true`.
 * @function module:_functionOps.until
 * @param predicate {Function} :: a -> Boolean
 * @param operation {Function} :: a -> a
 * @param typeInstance {*} :: * - A monoidal zero or some starting point.
 * @returns {*} - What ever type `typeInstance` is
 */
until = exports.until = function until(predicate, operation, typeInstance) {
    var result = typeInstance;
    while (!predicate(result)) {
        result = operation(result);
    }
    return result;
};