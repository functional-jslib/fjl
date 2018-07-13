'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Trampolines function calls in order to avoid stack overflow errors
 * on recursive function calls; Tail recursion replacement.
 * @see https://jsperf.com/pure-trampoline/1
 * @function module:function.trampoline
 * @param fn {Function} - Function to trampoline.
 * @param [fnName=undefined] {String} - Optionally restrict trampolining only to function with specific name.
 * @returns {*} - Finally returned value.
 */
var trampoline = function trampoline(fn, fnName) {
    return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var result = fn.apply(null, args);
        while (result && typeof result === 'function' && (!fnName || result.name === fnName)) {
            result = result();
        }
        return result;
    };
};

exports.default = trampoline;
module.exports = exports['default'];