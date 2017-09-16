import {curry} from '../functionOps/curry';

import {
    instanceOf as pureInstanceOf,
    hasOwnProperty as pureHasOwnProperty,
    assign as pureAssign,
    assignDeep as pureAssignDeep
} from '../../src-uncurried/jsPlatform/objectOpsUncurried';

export {length, toString, keys} from '../../src-uncurried/jsPlatform/objectOpsUncurried';

export const

    instanceOf = curry(pureInstanceOf),

    hasOwnProperty = curry(pureHasOwnProperty),

    assign = curry(pureAssign),

    assignDeep = curry(pureAssignDeep);

export * from './typeOf';

export * from './is';

export * from './of';

export * from './setTheoryOps';
