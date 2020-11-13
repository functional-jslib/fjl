export const 
/**
 * Negates an unary function (a function that takes one).
 * @function module:function.negateF
 * @param fn {UnaryPred<any>>}
 * @returns {UnaryPred<any>}
 * @generic
 */
negateF = (fn) => (x) => !fn(x), 
/**
 * Takes a function that takes two parameters and returns a negated version of given
 * function.
 * @function module:_negate.negateF2
 * @param fn {BinaryPredOf<any, any>}
 * @returns {BinaryPredOf<any, any>}
 * @generic
 */
negateF2 = (fn) => (a, b) => !fn(a, b), 
/**
 * Takes a function that takes three parameters and returns a
 * negated version of given function.
 * @function module:_negate.negateF3
 * @param fn {TernaryPredOf<any, any, any>}
 * @returns {TernaryPredOf<any, any, any>}
 */
negateF3 = (fn) => (a, b, c) => !fn(a, b, c), 
/**
 * Returns a negated version of given function.
 * Returned function is variadic and un-curried.
 * @function module:function.negateFN
 * @param fn {NaryPred<any>}
 * @returns {NaryPred<any>}
 */
negateFN = (fn) => (...args) => !fn(...args);
//# sourceMappingURL=negate.js.map