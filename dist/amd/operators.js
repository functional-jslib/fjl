define(['exports', './curry', './typeOf', './objectOps', './arrayOps'], function (exports, _curry, _typeOf, _objectOps, _arrayOps) {
    /**
     * Created by elyde on 12/11/2016.
     * A place to put the common ops (ops that can split between array, object, and possibly other) here.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = undefined;
    const complement = exports.complement = (0, _curry.curry2)((functor, ...others) => {
        switch ((0, _typeOf.typeOf)(functor)) {
            case 'Array':
                return (0, _arrayOps.complement)(functor, ...others);
            default:
                return (0, _objectOps.complement)(functor, ...others);
        }
    }),
          difference = exports.difference = (0, _curry.curry2)((functor1, functor2) => {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOps.difference)(functor1, functor2);
            default:
                return (0, _objectOps.difference)(functor1, functor2);
        }
    }),
          union = exports.union = (0, _curry.curry2)((functor1, functor2) => {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOps.union)(functor1, functor2);
            default:
                return (0, _objectOps.union)(functor1, functor2);
        }
    }),
          intersect = exports.intersect = (0, _curry.curry2)((functor1, functor2) => {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOps.intersect)(functor1, functor2);
            default:
                return (0, _objectOps.intersect)(functor1, functor2);
        }
    });

    exports.default = {
        complement,
        difference,
        union,
        intersect
    };
});