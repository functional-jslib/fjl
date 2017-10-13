'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.until = undefined;

var _curry_ = require('../uncurried/functionOps/curry_');

var _until_ = require('../uncurried/functionOps/until_');

/**
 * @memberOf functionOps
 */
var

/**
 * Run `operation` `until` predicate returns `true`.
 * @function module:functionOps.until
 * @param predicate {Function} :: a -> Boolean
 * @param operation {Function} :: a -> a
 * @param typeInstance {*} :: * - A monoidal zero or some starting point.
 * @returns {*} - What ever type `typeInstance` is
 * @curried
 */
until = exports.until = (0, _curry_.curry)(_until_.until);