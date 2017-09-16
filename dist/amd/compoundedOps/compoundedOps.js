define(['exports', '../functionOps/curry', '../listOps/listOps', '../objectOps/objectOps'], function (exports, _curry, _listOps, _objectOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = undefined;
    const complement = exports.complement = (0, _curry.curry)((functor, ...others) => {
        switch ((0, _objectOps.typeOf)(functor)) {
            case 'Array':
                return (0, _listOps.complement)(functor, ...others);
            default:
                return (0, _objectOps.objComplement)(functor, ...others);
        }
    }),
          difference = exports.difference = (0, _curry.curry)((functor1, functor2) => {
        switch ((0, _objectOps.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.difference)(functor1, functor2);
            default:
                return (0, _objectOps.objDifference)(functor1, functor2);
        }
    }),
          union = exports.union = (0, _curry.curry)((functor1, functor2) => {
        switch ((0, _objectOps.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.union)(functor1, functor2);
            default:
                return (0, _objectOps.objUnion)(functor1, functor2);
        }
    }),
          intersect = exports.intersect = (0, _curry.curry)((functor1, functor2) => {
        switch ((0, _objectOps.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.intersect)(functor1, functor2);
            default:
                return (0, _objectOps.objIntersect)(functor1, functor2);
        }
    });
});