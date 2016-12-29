/**
 * Created by edlc on 12/9/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Functor = require('./Functor');

var _Functor2 = _interopRequireDefault(_Functor);

var _subClass = require('./../subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Extract = (0, _subClass.subClass)(_Functor2.default, function Extract(value) {
    if (!(this instanceof Extract)) {
        return new Extract(value);
    }
    _Functor2.default.call(this, value);
}, {
    extract: function extract() {
        return this.value;
    }
});

exports.default = Extract;