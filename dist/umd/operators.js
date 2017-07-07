(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './curry', './typeOf', './objOperators', './arrayOperators'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./curry'), require('./typeOf'), require('./objOperators'), require('./arrayOperators'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.typeOf, global.objOperators, global.arrayOperators);
        global.operators = mod.exports;
    }
})(this, function (exports, _curry, _typeOf, _objOperators, _arrayOperators) {
    /**
     * Created by elyde on 12/11/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.intersect = exports.union = exports.difference = exports.complement = exports.reduceRight = exports.reduce = exports.filter = exports.map = undefined;
    var map = exports.map = (0, _curry.curry2)(function (fn, functor) {
        return functor.map(fn);
    }),
        filter = exports.filter = (0, _curry.curry2)(function (fn, functor) {
        return functor.filter(fn);
    }),
        reduce = exports.reduce = (0, _curry.curry3)(function (fn, agg, functor) {
        return functor.reduce(fn, agg);
    }),
        reduceRight = exports.reduceRight = (0, _curry.curry3)(function (fn, agg, functor) {
        return functor.reduceRight(fn, agg);
    }),
        complement = exports.complement = (0, _curry.curry2)(function (functor) {
        for (var _len = arguments.length, others = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            others[_key - 1] = arguments[_key];
        }

        switch ((0, _typeOf.typeOf)(functor)) {
            case 'Array':
                return _arrayOperators.complement.apply(undefined, [functor].concat(others));
            default:
                return _objOperators.complement.apply(undefined, [functor].concat(others));
        }
    }),
        difference = exports.difference = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOperators.difference)(functor1, functor2);
            default:
                return (0, _objOperators.difference)(functor1, functor2);
        }
    }),
        union = exports.union = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOperators.union)(functor1, functor2);
            default:
                return (0, _objOperators.union)(functor1, functor2);
        }
    }),
        intersect = exports.intersect = (0, _curry.curry2)(function (functor1, functor2) {
        switch ((0, _typeOf.typeOf)(functor1)) {
            case 'Array':
                return (0, _arrayOperators.intersect)(functor1, functor2);
            default:
                return (0, _objOperators.intersect)(functor1, functor2);
        }
    });

    exports.default = {
        map: map,
        filter: filter,
        reduce: reduce,
        reduceRight: reduceRight,
        complement: complement,
        difference: difference,
        union: union,
        intersect: intersect
    };
});