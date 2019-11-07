import native from '../object-statics';

/**
 * Contains all the static functions from `Object` but curried and flipped;
 * @example
 * // E.g., `Object.defineProperties(obj, descriptor)` can now be used like
 * import {defineProperties} from 'fjl'
 * defineProperties(descriptor, someObj),
 * // Et. al.
 * @memberOf module:jsPlatform/object
 * @type {{...Object}}
 */
export default native;
