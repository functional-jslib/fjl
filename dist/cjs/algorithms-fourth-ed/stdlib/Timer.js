/**
 * Created by elyde on 12/25/2016.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _subClass = require('../../../src/subClass');

var _Extract = require('../../../src/functor/Extract');

var _Extract2 = _interopRequireDefault(_Extract);

var _Bifunctor = require('../../../src/functor/Bifunctor');

var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _subClass.subClassMulti)([_Extract2.default, _Bifunctor2.default], function Timer() {
    _Bifunctor2.default.call(this, Date.now(), 0);
}, {
    elapsedTime: function elapsedTime() {
        return this.first(function (value) {
            return Date.now() - value;
        }).extract();
    }
});