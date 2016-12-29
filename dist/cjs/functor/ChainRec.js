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
var _arguments = arguments;

var _Chain = require('./Chain');

var _Chain2 = _interopRequireDefault(_Chain);

var _subClass = require('./../subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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