"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by edlc on 12/9/16.
 */
var Functor = function () {
    function Functor(value) {
        _classCallCheck(this, Functor);

        this.value = value;
    }

    _createClass(Functor, [{
        key: "valueOf",
        value: function valueOf() {
            return this.value;
        }
    }, {
        key: "map",
        value: function map(fn) {
            return new this.constructor(fn(this.valueOf()));
        }
    }, {
        key: "fmap",
        value: function fmap(fn) {
            return this.map(fn);
        }
    }]);

    return Functor;
}();

exports.default = Functor;
module.exports = exports["default"];