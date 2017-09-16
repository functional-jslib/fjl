/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

import {fPureTakesOne, fPureTakes2, fPureTakesOneOrMore} from '../../utils/utils';

// export {length, toString} from './objectOpsUnCurried';

export const

    concat = fPureTakesOneOrMore('concat'),

    slice = fPureTakes2('slice'),

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

    lastIndexOf = fPureTakesOne('lastIndexOf')

;
