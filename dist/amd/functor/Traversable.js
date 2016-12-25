define(['exports', './Functor', './Foldable', './../subClass'], function (exports, _Functor, _Foldable, _subClass) {
    /**
     * Created by elyde on 12/25/2016.
     */
    /**
     * Created by edlc on 12/9/16.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _Functor2 = _interopRequireDefault(_Functor);

    var _Foldable2 = _interopRequireDefault(_Foldable);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = (0, _subClass.subClassMulti)([_Functor2.default, _Foldable2.default], function Traversable(value) {
        if (!(this instanceof Traversable)) {
            return new Traversable(value);
        }
        _Functor2.default.call(this, value);
        _Foldable2.default.call(this, value);
    }, {
        traverse: function traverse(fn, of) {
            return of(fn());
        }
    });
});