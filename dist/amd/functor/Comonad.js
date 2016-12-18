define(['exports', './Applicable', './../subClass'], function (exports, _Applicable, _subClass) {
    /**
     * Created by edlc on 12/9/16.
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

    var _Applicable2 = _interopRequireDefault(_Applicable);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Chainable = (0, _subClass.subClass)(_Applicable2.default, function Chainable(value) {
        if (!this) {
            return new Chainable(value);
        }
        _Applicable2.default.call(this, value);
    }, {
        join: function join() {
            return this.value instanceof this.constructor ? this.value : new this.constructor(this.value);
        },

        chain: function chain(fn) {
            return this.map(fn).join();
        }
    });

    exports.default = Chainable;
});