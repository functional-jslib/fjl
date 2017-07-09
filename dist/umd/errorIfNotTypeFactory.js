(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './typeOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./typeOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.typeOf);
        global.errorIfNotTypeFactory = mod.exports;
    }
})(this, function (module, exports, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    var typesListToString = function typesListToString(types) {
        return types.reduce(function (agg, Type, index) {
            var typeName = Type instanceof Function ? Type.name : Type;
            return agg + '"' + typeName + '"' + (index !== types.length - 1 ? ', ' : ']');
        }, '[');
    };

    /**
     * A factory for attaching a context name to a function that checks if recieved value is of given type.
     * The factory allows you to attach the context name to the returned type checker function.
     * @module errorIfNotTypeFactory
     * @param [contextName] {String} - Name of the context you want attached to the error message.
     * @returns {Function} - Function{key {String, value {*}, ...types {Function|Constructor}>
     * @type {Function}
     */
    /**
     * Created by elyde on 1/20/2017.
     */

    function errorIfNotTypeFactory(contextName) {
        /**
         * Throws error if `value` is not of one of the 'types' ({...types{Function}}) passed in.  Else returns {void}.
         * @param [typePrefix] {String} - Prefix of the type to use in the error message if `value` doesn't
         *  match one of the `...types` passed in.
         * @param value {*}
         * @param types {...Function}
         * @throws {Error}
         * @returns {void}
         */
        return function (typePrefix, value) {
            for (var _len = arguments.length, types = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                types[_key - 2] = arguments[_key];
            }

            if (types.some(function (Type) {
                return (0, _typeOf.typeOfIs)(Type, value);
            })) {
                return;
            }
            throw new Error((contextName || '') + '.' + (typePrefix || '') + ' is required to be of one of the types : ' + (typesListToString(types) + '.  Type received: ' + (0, _typeOf.typeOf)(value)));
        };
    }

    errorIfNotTypeFactory.typeListToString = typesListToString;

    exports.default = errorIfNotTypeFactory;
    module.exports = exports['default'];
});