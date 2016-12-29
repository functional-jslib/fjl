(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './Chain', './../subClass'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./Chain'), require('./../subClass'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Chain, global.subClass);
        global.ChainRec = mod.exports;
    }
})(this, function (exports, _Chain, _subClass) {
    /**
     * Created by elyde on 12/25/2016.
     */
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

    var _Chain2 = _interopRequireDefault(_Chain);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _arguments = arguments;


    var ChainRecursive = (0, _subClass.subClass)(_Chain2.default, function ChainRecursive(value) {
        if (!this) {
            return new _Chain2.default(value);
        }
        _Chain2.default.call(this, value);
    }, null, {
        chainRec: function chainRec() /*fn, baseValue*/{
            return undefined;
            // return fn(next, done, baseValue);
        },
        flatMapRec: function flatMapRec() {
            return ChainRecursive.chainRec.apply(null, _arguments);
        }
    });

    exports.default = _Chain2.default;
});