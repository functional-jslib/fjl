'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prop = undefined;

var _curry = require('../functionOps/curry');

var prop = exports.prop = (0, _curry.curry)(function (name, obj) {
  return obj[name];
}); /**
     *
     */