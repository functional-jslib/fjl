import {typeOf} from '../object/typeOf';

const

    /**
     * Throws error if `f` is not a function, else returns it (`f`).
     * @private
     * @param symbolName {String}
     * @param f {*} - Expected function.
     * @returns {Function}
     */
    fnOrError = (symbolName, f) => {
        if (!f || typeof f !== 'function') {
            throw new Error(`${symbolName} should be a function. ` +
                `Type received: ${typeOf(f)};  Value received: ${f}.`);
        }
        return f;
    }

;

export default fnOrError;
