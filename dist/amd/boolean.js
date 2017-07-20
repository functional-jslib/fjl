define(['exports', './negate'], function (exports, _negate) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.not = exports.or = exports.and = exports.isset = undefined;

    var _negate2 = _interopRequireDefault(_negate);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    const isset = exports.isset = value => !!value,
          and = exports.and = (...args) => args.every(isset),
          or = exports.or = (...args) => args.some(isset),
          not = exports.not = (...args) => (0, _negate2.default)(isset).apply(null, ...args); /**
                                                                                               * Created by elyde on 7/15/2017.
                                                                                               */

    exports.default = {
        and,
        or,
        not
    };
});