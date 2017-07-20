define(['exports', './is'], function (exports, _is) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = x => (0, _is.isFunction)(x) ? value => !x(value) : x * -1;
});