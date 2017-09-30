'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = undefined;

var _curry = require('./curry');

var _function_ = require('../uncurried/jsPlatform/function_');

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf functionOps
 */
var

/**
 * Functional `call` function (takes no context).
 * @function module:functionOps.call
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */
call = exports.call = (0, _curry.curry2)(_function_.call);