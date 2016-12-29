define(['exports', './Functor', './../subClass'], function (exports, _Functor, _subClass) {
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

    var Extend = (0, _subClass.subClass)(_Functor2.default, function Extend(value) {
        if (!(this instanceof Extend)) {
            return new Extend(value);
        }
        _Functor2.default.call(this, value);
    }, {
        extend: function extend(fn) {
            return fn(this);
        }
    });

    exports.default = Extend;
});