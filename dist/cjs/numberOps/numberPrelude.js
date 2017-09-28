'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _curry = require('../functionOps/curry');

var _is = require('../objectOps/is');

/**
 * Created by edlc on 8/3/17.
 * @tentative
 */
exports.default = Object.getOwnPropertyNames(Math).reduce(function (agg, key) {
    if (!(0, _is.isFunction)(Math[key])) {
        return agg;
    }
    switch (Math[key].length) {
        case 0:
        case 1:
            agg[key] = Math[key];
            break;
        default:
            agg[key] = (0, _curry.curry)(Math[key]);
            break;
    }
    return agg;
}, {});
module.exports = exports['default'];