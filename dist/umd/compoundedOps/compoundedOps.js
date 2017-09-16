(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../functionOps/curry', '../objectOps/typeOf', '../listOps/listOps', '../objectOps/objectOps'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../functionOps/curry'), require('../objectOps/typeOf'), require('../listOps/listOps'), require('../objectOps/objectOps'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.typeOf, global.listOps, global.objectOps);
        global.compoundedOps = mod.exports;
    }
})(this, function (exports, _curry, _typeOf, _listOps, _objectOps) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = undefined;
    var complement = exports.complement = (0, _curry.curry)(function (functor) {
        for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            others[_key - 1] = arguments[_key];
        }

        switch ((0, _typeOf.typeOf)(functor)) {
            case 'Array':
                return _listOps.complement.apply(undefined, [functor].concat(others));
            default:
                return _objectOps.objComplement.apply(undefined, [functor].concat(others));
        }
    }),
        difference = exports.difference = (0, _curry.curry)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.difference)(functor1, functor2);
            default:
                return (0, _objectOps.objDifference)(functor1, functor2);
        }
    }),
        union = exports.union = (0, _curry.curry)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.union)(functor1, functor2);
            default:
                return (0, _objectOps.objUnion)(functor1, functor2);
        }
    }),
        intersect = exports.intersect = (0, _curry.curry)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _listOps.intersect)(functor1, functor2);
            default:
                return (0, _objectOps.objIntersect)(functor1, functor2);
        }
    });
});