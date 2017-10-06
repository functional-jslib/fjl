'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceOf = undefined;

var _curry = require('../functionOps/curry');

var _instanceOf_ = require('../uncurried/objectOps/instanceOf_');

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf objectOps
 */

var

/**
 * `instanceof` in function form.
 * @function module:objectOps.instanceOf
 * @param instance {*}
 * @param Type {Function|Class}
 * @returns {Boolean}
 */
instanceOf = exports.instanceOf = (0, _curry.curry)(_instanceOf_.instanceOf);