define(['exports', './Chainable', './../subClass'], function (exports, _Chainable, _subClass) {
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

    var _Chainable2 = _interopRequireDefault(_Chainable);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var ChainableRecursive = (0, _subClass.subClass)(_Chainable2.default, function ChainableRecursive(value) {
        if (!this) {
            return new _Chainable2.default(value);
        }
        _Chainable2.default.call(this, value);
    }, null, {
        chainRec: function chainRec() /*fn, baseValue*/{
            return this;
            // return fn(next, done, baseValue);
        }
    });

    exports.default = _Chainable2.default;
});