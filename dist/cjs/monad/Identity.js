/**
 * Created by edlc on 12/9/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Identity = undefined;

var _Monad = require('./Monad');

var _Monad2 = _interopRequireDefault(_Monad);

var _subClass = require('../subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Identity = exports.Identity = (0, _subClass.subClass)(_Monad2.default, function Identity(value) {
  _Monad2.default.call(this, value);
});

exports.default = Identity;