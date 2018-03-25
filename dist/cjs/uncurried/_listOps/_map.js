'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _map;

var _object = require('../_jsPlatform/_object');

/**
 * @function module:_listOps.map
 * @param fn {Function} - Function to map on array.
 * @param xs {Array}
 * @returns {Array}
 */
function _map(fn, xs) {
    var ind = 0,
        limit = (0, _object.length)(xs),
        out = [];
    if (!limit) {
        return out;
    }
    while (ind < limit) {
        out.push(fn(xs[ind], ind, xs));
        ind += 1;
    }
    return out;
}
module.exports = exports['default'];