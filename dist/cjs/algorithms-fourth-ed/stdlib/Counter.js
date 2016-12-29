/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Extract = require('../../../src/functor/Extract');

var _Extract2 = _interopRequireDefault(_Extract);

var _Extend = require('../../../src/functor/Extend');

var _Extend2 = _interopRequireDefault(_Extend);

var _subClass = require('../../../src/subClass');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _subClass.subClassMulti)([_Extract2.default, _Extend2.default], function Counter(start) {
    if (!(this instanceof Counter)) {
        return new Counter(start);
    }
    _Extract2.default.call(this, start || 0);
    _Extend2.default.call(this);
}, {
    increment: function increment() {
        return this.extend(function (self) {
            self.value++;
            return self;
        });
    },
    toString: function toString() {
        return '[object ' + this.constructor.name + '(' + this.value + ')]';
    }
});