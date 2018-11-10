"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.split = void 0;

var _utils = require("../utils");

/**
 * Created by elydelacruz on 9/6/2017.
 */

/**
 * Functional version of `String.prototype.split`.
 * @function module:_string.split
 * @param separator {String|RegExp}
 * @param str {String}
 * @returns {Array}
 */
var split = (0, _utils.fPureTakesOne)('split');
exports.split = split;