import {typeOf} from './typeOf';
import {of} from './of';

export const

    /**
     * Make a copy of a value or optionally copy incoming value onto an outgoing value (second parameter).
     * @note If incoming thing is an immmutable primitive (string, number, symbol, null, undefined, boolean)
     *  it is returned as is.
     * @function module:object.copy
     * @param x {*} - Thing to copy.
     * @param [out = undefined] {*} - Optional value to copy on to.  Not required.
     * @returns {*} - Copied thing or optionally outgoing value copied onto.
     */
    copy = (x, out) => {
        // if `null`, `undefined`, `''`, `0`, `false` return
        if (!x) { return x; }
        switch (typeOf(x)) {
            case Array.name:
                return !out ? x.slice(0) : Object.assign(out, x);

            // If immutable primitive, return it
            case Symbol.name:
            case Boolean.name:
            case String.name:
            case Number.name:
            case Promise.name:
            case Function.name:
            case 'NaN':
            case 'Null':
            case 'Undefined':
                return x;

            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
                return new x.constructor(Array.from(x));

            // Else make copy
            default:
                return Object.assign(!out ? of(x) : out, x);
        }
    }
;

export default copy;
