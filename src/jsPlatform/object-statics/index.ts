/**
 * @module objectStatics
 * Static `Object` methods, flipped and curried.
 */
import {flip, flip3, flip4, flip5} from '../../function/flip';
import {ObjectStatics} from "./types";
import {curry, CurryOf2, CurryOf3, CurryOf4, CurryOf5} from "../../function";

/**
 * Contains all the static functions from `Object` but curried and flipped;
 * @example
 * // E.g., `Object.defineProperties(obj, descriptor)` can now be used like
 * import {defineProperties} from 'fjl'
 * defineProperties(descriptor, someObj),
 * // Et. al.
 * @memberOf module:objectStatics
 * @type {{...Object}}
 */
const objectStatics: ObjectStatics = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
    if (typeof Object[key] !== 'function') {
        return agg;
    }
    if (key === 'is') { // should flip `is` method
        agg[key] = curry(Object[key]);
        return agg;
    }
    const operation = Object[key];
    switch (operation.length) {
        case 2:
            agg[key] = flip(operation) as CurryOf2<any, any, any>;
            break;
        case 3:
            agg[key] = flip3(operation) as CurryOf3<any, any, any, any>;
            break;
        case 4:
            agg[key] = flip4(operation) as CurryOf4<any, any, any, any, any>;
            break;
        case 5:
            agg[key] = flip5(operation) as CurryOf5<any, any, any, any, any, any>;
            break;
        default:
            agg[key] = Object[key];
            break;
    }
    return agg;
}, {}) as ObjectStatics;

export default objectStatics;
