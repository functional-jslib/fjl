define(['exports', './Functor', '../subClass'], function (exports, _Functor, _subClass) {
    /**
     * Created by edlc on 12/9/16.
     */
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

    var Profunctor = (0, _subClass.subClass)(_Functor2.default, function Profunctor(value1, value2) {
        if (!(this instanceof Profunctor)) {
            return new Profunctor(value1, value2);
        }
        _Functor2.default.call(this, value1);
        this.value2 = value2;
    }, {
        first: function first(fn) {
            return new this.constructor(fn(this.value), this.value2);
        },
        second: function second(fn) {
            return new this.constructor(this.value, fn(this.value2));
        },


        promap: function promap(fn1, fn2) {
            return new this.constructor(fn1(this.value), fn2(this.value2));
        }
    });

    exports.default = Profunctor;
});