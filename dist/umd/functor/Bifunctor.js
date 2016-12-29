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
        global.Bifunctor = mod.exports;
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

    var Bifunctor = (0, _subClass.subClass)(_Functor2.default, function Bifunctor(value1, value2) {
        if (!(this instanceof Bifunctor)) {
            return new Bifunctor(value1, value2);
        }
        _Functor2.default.call(this, value1);
        Bifunctor.addValue2Property(this, value2);
    }, {
        first: function first(fn) {
            return new this.constructor(fn(this.value), this.value2);
        },
        second: function second(fn) {
            return new this.constructor(this.value, fn(this.value2));
        },


        bimap: function bimap(fn1, fn2) {
            return new this.constructor(fn1(this.value), fn2(this.value2));
        }
    });

    Bifunctor.addValue2Property = function (instance, value) {
        if (!instance.hasOwnProperty('value2')) {
            Object.defineProperty(instance, 'value2', {
                value: value,
                writable: true
            });
        }
        return instance;
    };

    exports.default = Bifunctor;
});