'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceOf = undefined;

var _curry = require('../functionOps/curry');

var

/**
 * Returns whether constructor has derived objectOps.
 * @instanceConstructor {Function|Class}
 * @instance {*}
 * @returns {Boolean}
 */
instanceOf = exports.instanceOf = (0, _curry.curry)(function (instanceConstructor, instance) {
  return instance instanceof instanceConstructor;
}); /**
     * Created by elydelacruz on 7/22/2017.
     */