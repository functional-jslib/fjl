import {isset} from './_is';

export const

    /**
     * Gives you value at key/namespace-key;  E.g.,
     * ```
     *   _fromNamespace('all.your.base', {all: {your: {base: 99}}}) === 99
     * ```
     * @function module:object._fromNamespace
     * @param nsString {String}
     * @param obj {*}
     * @returns {*}
     */
    _fromNamespace = (nsString, obj) => {
        if (!obj) { return obj; }
        if (nsString.indexOf('.') === -1) {
            return obj[nsString];
        }
        const parts = nsString.split('.'),
            limit = parts.length;
        let ind = 0,
            parent = obj;
        for (; ind < limit; ind += 1) {
            const node = parent[parts[ind]];
            if (!isset(node)) {
                return node;
            }
            parent = node;
        }
        return parent;
    }
;
