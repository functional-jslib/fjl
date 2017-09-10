
import {fPureTakesOne, fPureTakes2, fPureTakesOneOrMore} from '../utils/utils';

export {length, toString} from '../objectOps/objectPrelude';

export const

    concat = fPureTakesOneOrMore('concat'),

    slice = fPureTakes2('slice'),

    includes = fPureTakesOne('includes'), // @todo shim here if not supported necessary

    indexOf = fPureTakesOne('indexOf'),

    lastIndexOf = fPureTakesOne('lastIndexOf')

;
