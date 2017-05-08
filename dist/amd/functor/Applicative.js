define(['exports', './Apply', '../subClass'], function (exports, _Apply, _subClass) {
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

    var Applicative = (0, _subClass.subClass)(_Apply2.default, function Applicative(value) {
        if (!(this instanceof Applicative)) {
            return Applicative.of(value);
        }
        _Apply2.default.call(this, value);
    }, null, {
        of: function of(value) {
            return new Applicative(value);
        }
    });

    exports.default = Applicative;
});