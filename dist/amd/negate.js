define(['exports', './is'], function (exports, _is) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (x) {
    return (0, _is.isFunction)(x) ? function (value) {
      return !x(value);
    } : x * -1;
  };
});