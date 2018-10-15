(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.trampoline = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Trampolines function calls in order to avoid stack overflow errors
     * on recursive function calls; Tail recursion replacement.
     * @example
     * // Instead of ... (which is prone to stack-overflow in
     * //   non-tail-call optimized environments (es5-es3))
     * const factorial = n => n ? n * factorial(n - 1) : 1;
     *
     * // We do
     * const
     *
     *  factorialProcess = (n, agg = 1) => {
     *      n ? () => factorialProcess(n - 1, agg * n) : agg,
     *  },
     *
     *  factorial = n => trampoline(factorialProcess)(n);
     *
     *  ;
     *
     * @performance https://jsperf.com/pure-trampoline/1
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
});