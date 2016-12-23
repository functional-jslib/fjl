(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Functor', './../subClassOf'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Functor'), require('./../subClassOf'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Functor, global.subClassOf);
        global.Extendable = mod.exports;
    }
})(this, function (exports, _Functor, _subClassOf) {
    /**
     * Created by edlc on 12/9/16.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Functor2 = _interopRequireDefault(_Functor);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Extendable = (0, _subClassOf.subClassOf)(_Functor2.default, function Extendable(value) {
        if (!(this instanceof Extendable)) {
            return new Extendable(value);
        }
        _Functor2.default.call(this, value);
    }, {
        extend: function extend(fn) {
            return this.map(fn);
        }
    });

    exports.default = Extendable;
});