'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = undefined;

var _curry = require('./curry');

var _functionOpsUncurried = require('../uncurried/jsPlatform/functionOpsUncurried');

/**
 * Created by elydelacruz on 7/22/2017.
 */
var

/**
 * Functional `apply` functionOps (takes no context).
 * @functionOps module:fnOperators.apply
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */
apply = exports.apply = (0, _curry.curry)(_functionOpsUncurried.apply);