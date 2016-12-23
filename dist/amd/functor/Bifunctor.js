define(['exports', './Functor', './../subClassOf'], function (exports, _Functor, _subClassOf) {
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

    exports.default = (0, _subClassOf.subClassOf)(_Functor2.default, function Bifunctor(value1, value2) {
        if (!(this instanceof Bifunctor)) {
            return new Bifunctor(value1, value2);
        }
        _Functor2.default.call(this, value1);
        Object.defineProperty(this, 'value2', {
            value: value2,
            writable: true
        });
    }, {
        map1: function map1(fn) {
            return this.map(fn);
        },
        map2: function map2(fn) {
            return new this.constructor(this.value, fn(this.value2));
        },
        first: function first(fn) {
            return this.map1(fn);
        },
        second: function second(fn) {
            return this.map2(fn);
        },


        bimap: function bimap(fn1, fn2) {
            return new this.constructor(fn1(this.value), fn2(this.value2));
        }
    });
});