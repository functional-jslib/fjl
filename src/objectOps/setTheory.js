import {curry, curry2} from   '../uncurried/functionOps/curry_';
import {
    objUnion as _objUnion,
    objComplement as _objComplement,
    objIntersect as _objIntersect,
    objDifference as _objDifference
} from '../uncurried/objectOps/setTheory_';

export const

    objUnion = curry(_objUnion),

    objIntersect = curry(_objIntersect),

    objDifference = curry(_objDifference),

    objComplement = curry2(_objComplement);
