/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

import {fPureTakesOne, fPureTakes2, fPureTakesOneOrMore} from   '../../utils/utils';

// export {length, toString} from './objectOpsUnCurried';

export const

    /**
     * @function module:jsPlatform.listOpsUncurried.concat
     */
    concat = fPureTakesOneOrMore('concat'),

    /**
     * @function module:jsPlatform.listOpsUncurried.slice
     */
    slice = fPureTakes2('slice'),

    /**
     * `Array.prototype.includes` or shim.
     * @function module:jsPlatform.listOpsUncurried.includes
     * @param value {*}
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, xs) => xs.indexOf(value) > -1)(),

    /**
     * Searches list/list-like for given element `x`.
     * @function module:jsPlatform.listOpsUncurried.indexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = fPureTakesOne('indexOf'),

    /**
     * Last index of (`Array.prototype.lastIndexOf`).
     * @function module:jsPlatform.listOpsUncurried.lastIndexOf
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    lastIndexOf = fPureTakesOne('lastIndexOf')

;
