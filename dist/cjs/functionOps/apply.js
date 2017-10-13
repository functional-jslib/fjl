'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = undefined;

var _curry_ = require('../uncurried/functionOps/curry_');

var _function_ = require('../uncurried/jsPlatform/function_');

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
var

/**
 * Functional `apply` functionOps (takes no context).
 * @function module:functionOps.apply
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */
apply = exports.apply = (0, _curry_.curry)(_function_.apply);