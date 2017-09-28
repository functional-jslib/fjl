import {curry, curry2} from   '../functionOps/curry';

import {
    instanceOf as pureInstanceOf,
    hasOwnProperty as pureHasOwnProperty,
    assign as pureAssign
} from '../uncurried/jsPlatform/objectUncurried';

import {assignDeep as pureAssignDeep} from   '../uncurried/objectOps/assignDeep';

export {length, toString, keys} from '../uncurried/jsPlatform/objectUncurried';

export const

    instanceOf = curry(pureInstanceOf),

    hasOwnProperty = curry(pureHasOwnProperty),

    assign = curry2(pureAssign),

    assignDeep = curry2(pureAssignDeep);

export * from  '../uncurried/objectOps/typeOf';

export * from  '../uncurried/objectOps/is';

export * from  '../uncurried/objectOps/of';

export * from  '../uncurried/objectOps/setTheoryOps';
