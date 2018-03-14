/**
 * @module _objectOps
 * @description Object operations (uncurried).
 * @private
 */
export * from './_jsPlatform/_object';
export * from './_objectOps/_prop';
export * from './_objectOps/_typeOf';
export * from './_objectOps/_is';
export * from './_objectOps/_of';
export * from './_objectOps/_assignDeep';
export * from './_objectOps/_setTheory';

import {typeOf} from './_objectOps/_typeOf';

export const

    toArrayMap = obj => Object.keys(obj).map(key => [key, obj[key]]),

    fromArrayMap = xs => xs.reduce((agg, [key, value]) => {
        agg[key] = value;
        return agg;
    }, {}),

    toArray = x => {
        let out;
        switch (typeOf(x)) {
            case 'Null':
            case 'Undefined':
                out = [];
                break;
            case String.name:
            case Array.name:
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case 'Set':
                out = Array.from(x);
                break;
            case Object.name:
            default:
                out = toArrayMap(x);
                break;
        }
        return out;
    }

;
