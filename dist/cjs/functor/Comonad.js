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

var _Apply = require('./Apply');

var _Apply2 = _interopRequireDefault(_Apply);

var _subClass = require('./../subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Comonad = (0, _subClass.subClass)(_Apply2.default, function Comonad(value) {
    if (!(this instanceof Comonad)) {
        return new Comonad(value);
    }
    _Apply2.default.call(this, value);
}, {
    extract: function extract() {
        return this.value;
    }
});

exports.default = Comonad;