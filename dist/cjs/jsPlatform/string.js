'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = undefined;

var _curry_ = require('../uncurried/_functionOps/curry_');

var _string_ = require('../uncurried/jsPlatform/string_');

/**
 * Functional version of `String.prototype.split`.
 * @curried
 * @function module:jsPlatform_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
/**
 * Created by elydelacruz on 9/6/2017.
 * @module jsPlatform_string
 * @private
 */

var split = exports.split = (0, _curry_.curry)(_string_.split);