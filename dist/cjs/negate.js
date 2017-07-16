'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _is = require('./is');

exports.default = function (x) {
  return (0, _is.isFunction)(x) ? function (value) {
    return !x(value);
  } : x * -1;
}; /**
    * Created by elyde on 7/15/2017.
    */

module.exports = exports['default'];