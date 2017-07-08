/**
 * Created by elyde on 12/11/2016.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.intersect = exports.union = exports.difference = exports.complement = undefined;

var _curry = require('./curry');

var _typeOf = require('./typeOf');

var _objOperators = require('./objOperators');

var _arrayOperators = require('./arrayOperators');

var complement = exports.complement = (0, _curry.curry2)(function (functor) {
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
    complement: complement,
    difference: difference,
    union: union,
    intersect: intersect
};