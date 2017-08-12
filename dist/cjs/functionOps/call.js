'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = undefined;

var _curry = require('./curry');

var

/**
 * Functional `call` functionOps (takes no context).
 * @functionOps module:fnOperators.call
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */
call = exports.call = (0, _curry.curry2)(function (fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn.call.apply(fn, [null].concat(args));
}); /**
     * Created by elydelacruz on 7/22/2017.
     */