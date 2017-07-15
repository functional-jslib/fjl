(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './curry', './typeOf', './objectOps', './arrayOps'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./curry'), require('./typeOf'), require('./objectOps'), require('./arrayOps'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.typeOf, global.objectOps, global.arrayOps);
        global.operators = mod.exports;
    }
})(this, function (exports, _curry, _typeOf, _objectOps, _arrayOps) {
    /**
     * Created by elyde on 12/11/2016.
     * A place to put the common ops (ops that can split between array, object, and possibly other) here.
     */

    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = undefined;
    var complement = exports.complement = (0, _curry.curry2)(function (functor) {
        for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            others[_key - 1] = arguments[_key];
        }

        switch ((0, _typeOf.typeOf)(functor)) {
            case 'Array':
                return _arrayOps.complement.apply(undefined, [functor].concat(others));
            default:
                return _objectOps.complement.apply(undefined, [functor].concat(others));
        }
    }),
        difference = exports.difference = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOps.difference)(functor1, functor2);
            default:
                return (0, _objectOps.difference)(functor1, functor2);
        }
    }),
        union = exports.union = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOps.union)(functor1, functor2);
            default:
                return (0, _objectOps.union)(functor1, functor2);
        }
    }),
        intersect = exports.intersect = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOps.intersect)(functor1, functor2);
            default:
                return (0, _objectOps.intersect)(functor1, functor2);
        }
    });

    exports.default = {
        complement: complement,
        difference: difference,
        union: union,
        intersect: intersect
    };
});