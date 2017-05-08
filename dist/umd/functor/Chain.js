(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './Apply', '../subClass'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./Apply'), require('../subClass'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.Apply, global.subClass);
        global.Chain = mod.exports;
    }
})(this, function (module, exports, _Apply, _subClass) {
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

    var _Apply2 = _interopRequireDefault(_Apply);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Chain = (0, _subClass.subClass)(_Apply2.default, function Chain(value) {
        if (!(this instanceof Chain)) {
            return new Chain(value);
        }
        _Apply2.default.call(this, value);
    }, {
        join: function join() {
            return this.value instanceof this.constructor ? this.value : new this.constructor(this.value);
        },
        chain: function chain(fn) {
            return this.map(fn).join();
        },
        flatMap: function flatMap(fn) {
            return this.chain(fn);
        }
    });

    exports.default = Chain;
    module.exports = exports['default'];
});