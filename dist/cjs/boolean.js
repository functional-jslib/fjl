'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.not = exports.or = exports.and = exports.isset = undefined;

var _negate2 = require('./negate');

var _negate3 = _interopRequireDefault(_negate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isset = exports.isset = function isset(value) {
    return !!value;
},
    and = exports.and = function and() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.every(isset);
},
    or = exports.or = function or() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return args.some(isset);
},
    not = exports.not = function not() {
    var _negate;

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
    }

    return (_negate = (0, _negate3.default)(isset)).apply.apply(_negate, [null].concat(args));
}; /**
    * Created by elyde on 7/15/2017.
    */

exports.default = {
    and: and,
    or: or,
    not: not
};