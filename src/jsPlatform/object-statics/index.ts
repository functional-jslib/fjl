/**
 * @module objectStatics
 * Static `Object` methods, flipped and curried.
 */
import {flip, flip3, flip4, flip5} from '../../function/flip';

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
const objectStatics = Object.getOwnPropertyNames(Object).reduce((agg, key) => {
    if (typeof Object[key] !== 'function') {
        return agg;
    }
    const operation = Object[key];
    switch (operation.length) {
        case 2:
            agg[key] = flip(operation);
            break;
        case 3:
            agg[key] = flip3(operation);
            break;
        case 4:
            agg[key] = flip4(operation);
            break;
        case 5:
            agg[key] = flip5(operation);
            break;
        default:
            agg[key] = Object[key];
            break;
    }
    return agg;
}, {});

export default objectStatics;