(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Functor', './../subClass'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Functor'), require('./../subClass'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Functor, global.subClass);
        global.Applicable = mod.exports;
    }
})(this, function (exports, _Functor, _subClass) {
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

    var Applicable = (0, _subClass.subClass)(_Functor2.default, function Applicable(value) {
        if (!this) {
            return new Applicable(value);
        }
        _Functor2.default.call(this, value);
    }, {
        ap: function ap(functor) {
            return functor.map(this.value);
        }
    });

    exports.default = Applicable;
});