import {typeOf} from './typeOf';
import {toAssocList} from './assocList';

export const

    /**
     * Converts incoming value to an array.
     * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
     * @note For `null`, `undefined`, `NaN`, `Number{}`, `Symbol{}`, `Boolean{}` returns an empty array.
     * @note Method does a shallow conversion;
     * @function module:object.toArray
     * @param x {*} - Thing to convert from.
     * @returns {Array}
     */
    toArray = x => {
        switch (typeOf(x)) {
            case 'Null':
            case 'Undefined':
                return [];
            case String.name:
            case Array.name:
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case 'Set':
                return Array.from(x);
            case Object.name:
            default:
                return toAssocList(x);
        }
    }

;
