'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceOf = undefined;

var _curry_ = require('../uncurried/functionOps/curry_');

var _object_ = require('../uncurried/jsPlatform/object_');

/**
 * Created by elydelacruz on 7/22/2017.
 * @memberOf objectOps
 */

var

/**
 * `instanceof` in function form.
 * @function module:objectOps.instanceOf
 * @param instance {*}
 * @param Type {Function}
 * @returns {Boolean}
 */
instanceOf = exports.instanceOf = (0, _curry_.curry)(_object_.instanceOf);