import { typeOf } from '../object/typeOf';
export const 
/**
 * Returns a function or throws an error if given `f` is not a function.
 * @function module:function.fnOrError
 * @param symbolName {String} - Error message prefix.
 * @param f {Function|*} - Expected function.
 * @returns {Function}
 * @throws {Error} - Error if `f` is not of `function`
 */
fnOrError = (symbolName, f) => {
    if (!f || !(f instanceof Function)) {
        throw new Error(`${symbolName} should be a function. ` +
            `Type received: ${typeOf(f)};  Value received: ${f}.`);
    }
    return f;
};
//# sourceMappingURL=fnOrError.js.map