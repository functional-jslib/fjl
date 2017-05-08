(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './Functor', '../subClass'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./Functor'), require('../subClass'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.Functor, global.subClass);
        global.Apply = mod.exports;
    }
})(this, function (module, exports, _Functor, _subClass) {
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

    var Apply = (0, _subClass.subClass)(_Functor2.default, function Apply(value) {
        if (!(this instanceof Apply)) {
            return new Apply(value);
        }
        _Functor2.default.call(this, value);
    }, {
        ap: function ap(functor) {
            return functor.map(this.value);
        }
    });

    exports.default = Apply;
    module.exports = exports['default'];
});