import {curry} from '../functionOps/curry';
import {typeOf} from '../objectOps/typeOf';
import {
    complement as arrayComplement,
    difference as arrayDifference,
    union as arrayUnion,
    intersect as arrayIntersect
} from '../listOps/listOps';

import {
    objComplement,
    objDifference,
    objUnion,
    objIntersect
} from '../objectOps/objectOps';

export const

    complement = curry((functor, ...others) => {
        switch (typeOf(functor)) {
            case 'Array':
                return arrayComplement(functor, ...others);
            default:
                return objComplement(functor, ...others);
        }
    }),

    difference = curry((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayDifference(functor1, functor2);
            default:
                return objDifference(functor1, functor2);
        }
    }),

    union = curry((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayUnion(functor1, functor2);
            default:
                return objUnion(functor1, functor2);
        }
    }),

    intersect = curry((functor1, functor2) => {
        switch (typeOf(functor1)) {
            case 'Array':
                return arrayIntersect(functor1, functor2);
            default:
                return objIntersect(functor1, functor2);
        }
    });
