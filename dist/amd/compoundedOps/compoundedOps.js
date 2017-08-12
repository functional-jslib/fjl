define(['exports', '../functionOps/curry', '../objectOps/typeOf', '../listOps/listOps', '../objectOps/objectOps'], function (exports, _curry, _typeOf, _listOps, _objectOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = undefined;
    const complement = exports.complement = (0, _curry.curry)((functor, ...others) => {
        switch ((0, _typeOf.typeOf)(functor)) {
            case 'Array':
                return (0, _listOps.arrayComplement)(functor, ...others);
            default:
                return (0, _objectOps.objComplement)(functor, ...others);
        }
    }),
          difference = exports.difference = (0, _curry.curry)((functor1, functor2) => {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.arrayDifference)(functor1, functor2);
            default:
                return (0, _objectOps.objDifference)(functor1, functor2);
        }
    }),
          union = exports.union = (0, _curry.curry)((functor1, functor2) => {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.arrayUnion)(functor1, functor2);
            default:
                return (0, _objectOps.objUnion)(functor1, functor2);
        }
    }),
          intersect = exports.intersect = (0, _curry.curry)((functor1, functor2) => {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.arrayIntersect)(functor1, functor2);
            default:
                return (0, _objectOps.objIntersect)(functor1, functor2);
        }
    });
});