"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = void 0;

/**
 * No-op ('op' as in 'operation') - Performs no operation 'always' (good for places where
 * a value should always be a function etc.).
 * @function module:function.noop
 * @returns {undefined}
 */
var noop = function noop() {
  return undefined;
};

exports.noop = noop;