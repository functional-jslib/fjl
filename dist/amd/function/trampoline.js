define(['exports'], function (exports) {
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
    const trampoline = (fn, fnName) => {
        return (...args) => {
            let result = fn.apply(null, args);
            while (result && typeof result === 'function' && (!fnName || result.name === fnName)) {
                result = result();
            }
            return result;
        };
    };

    exports.default = trampoline;
});