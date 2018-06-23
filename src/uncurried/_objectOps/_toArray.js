import {typeOf} from './_typeOf';
import {toAssocList} from './_assocList';

export const

    /**
     * Attempts to convert incoming value into an array.  This method will yield
     * an array for most cases and throw errors where it cannot convert given value
     * to an array.
     * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
     * @note For `null` and `undefined` we are returning an empty array (since method name implies 'anything to array' etc.)..
     * @note Method does a shallow conversion;  E.g., Doesn't 'deeply' convert value to array (for in, the case of a pojo, for example)
     * @param x {*} - Anything
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
