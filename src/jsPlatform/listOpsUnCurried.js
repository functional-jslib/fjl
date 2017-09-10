/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

import {fPureTakesOne, fPureTakes2, fPureTakesOneOrMore} from '../utils/utils';

// export {length, toString} from './objectOpsUnCurried';

export const

    concat = fPureTakesOneOrMore('concat'),

    slice = fPureTakes2('slice'),

    includes = (() => 'includes' in Array.prototype ?
            fPureTakesOne('includes') :
            (value, x) => x.indexOf(value) > -1)(),

    indexOf = fPureTakesOne('indexOf'),

    lastIndexOf = fPureTakesOne('lastIndexOf')

;
