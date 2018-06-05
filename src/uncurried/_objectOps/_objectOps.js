/**
 * @module _objectOps
 * @description Object operations (uncurried).
 * @private
 */
export * from '../_jsPlatform/_object';
export * from './_prop';
export * from './_typeOf';
export * from './_is';
export * from './_of';
export * from './_assignDeep';
export * from './_setTheory';
export * from './_console';
export * from './_errorThrowing';

import {typeOf} from './_typeOf';

export const

    /**
     * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
     * @function module:objectOps.jsonClone
     * @param x {*}
     * @returns {*}
     */
    jsonClone = x => JSON.parse(JSON.stringify(x)),

    /**
     * Returns an array map (associated list) representing incoming value (object, array, etc.).
     * @function module:objectOps.toArrayMap
     * @param obj {(Object|Array|*)}
     * @returns {*}
     */
    toArrayMap = obj => Object.keys(obj).map(key => {
        if (typeof obj[key] === 'object') {
            return [key, toArrayMap(obj[key])];
        }
        return [key, obj[key]];
    }),

    /**
     * Converts an array-map into an object (one level).
     * @param xs {Array|*} - Array-map (associated list).
     * @returns {*}
     */
    fromArrayMap = xs => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, {}),

    /**
     * Attempts to convert incoming value into an array.  This method will yield
     * an array for most cases and throw errors where it cannot convert given value
     * to an array.
     * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
     * @note For `null` and `undefined` we are returning an empty array (since method name implies 'anything to array' etc.)..
     * @param x {*}
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
                return toArrayMap(x);
        }
    }

;
