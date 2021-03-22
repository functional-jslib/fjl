import {isset} from '../object/isset';
import {of} from "../object/of";
import {typeOf} from "../object/typeOf";

export const
    /**
     * Returns a copy of the passed in list reverses.
     */
    reverse = xs => {
        if (!isset(xs) || !xs.length) {
            return xs;
        }
        let out = of(xs),
            i = xs.length - 1;
        if (typeOf(xs) === 'String') {
            for (; i >= 0; i -= 1) {
                out += xs[i];
            }
            return out;
        }
        for (; i >= 0; i -= 1) {
            out.push(xs[i]);
        }
        return out;
    };
