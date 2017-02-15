/**
 * Created by elyde on 1/20/2017.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeOf = require('./typeOf');

var typesListToString = function typesListToString(types) {
    return types.reduce(function (agg, Type, index) {
        var typeName = Type instanceof Function ? Type.name : Type;
        return agg + '"' + typeName + '"' + (index !== types.length - 1 ? ', ' : ']');
    }, '[');
};

function errorIfNotTypeFactory(contextName) {
    contextName = contextName || 'unNamedContext';
    return function (key, value) {
        for (var _len = arguments.length, types = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            types[_key - 2] = arguments[_key];
        }

        if (types.some(function (Type) {
            return (0, _typeOf.typeOfIs)(value, Type);
        })) {
            return;
        }
        throw new Error(contextName + '.' + key + ' is required to be of one of the types : ' + typesListToString(types) + '.  Type received: ' + (0, _typeOf.typeOf)(value));
    };
}

errorIfNotTypeFactory.typeListToString = typesListToString;

exports.default = errorIfNotTypeFactory;
module.exports = exports['default'];