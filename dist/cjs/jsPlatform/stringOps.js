'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = undefined;

var _curry = require('../functionOps/curry');

var _stringOpsUnCurried = require('../uncurried/jsPlatform/stringOpsUnCurried');

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform.stringOps.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform.stringOps
 */

var split = exports.split = (0, _curry.curry)(_stringOpsUnCurried.split);