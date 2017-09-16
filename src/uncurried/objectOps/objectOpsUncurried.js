import {curry} from '../functionOps/curry';

import {
    instanceOf as pureInstanceOf,
    hasOwnProperty as pureHasOwnProperty,
    assign as pureAssign
} from '../jsPlatform/objectOpsUncurried';

export {assignDeep} from './assignDeep';

export {length, toString, keys} from '../jsPlatform/objectOpsUncurried';

export const

    instanceOf = curry(pureInstanceOf),

    hasOwnProperty = curry(pureHasOwnProperty),

    assign = curry(pureAssign);

export * from './typeOf';

export * from './is';

export * from './of';

export * from './setTheoryOps';
