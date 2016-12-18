define(['exports', '../functor/Applicative', '../functor/Chainable', '../subClass'], function (exports, _Applicative, _Chainable, _subClass) {
    /**
     * Created by edlc on 12/9/16.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Monad = undefined;

    var _Applicative2 = _interopRequireDefault(_Applicative);

    var _Chainable2 = _interopRequireDefault(_Chainable);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var Monad = exports.Monad = (0, _subClass.subClassMulti)([_Applicative2.default, _Chainable2.default], function Monad(value) {
        if (!this) {
            return Monad.of(value);
        }
        _Applicative2.default.apply(this);
        _Chainable2.default.apply(this);
        this.value = value;
    }, null, {
        of: function of(value) {
            return new Monad(value);
        }
    });

    exports.default = Monad;
});