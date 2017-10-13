'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prop = undefined;

var _curry_ = require('../uncurried/functionOps/curry_');

/**
 * Returns property value if found; Else `undefined`.
 * @function module:objectOps.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
var prop = exports.prop = (0, _curry_.curry)(function (name, obj) {
  return obj[name];
}); /**
     * @memberOf objectOps
     */