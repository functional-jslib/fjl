(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Functor = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Created by edlc on 12/9/16.
   */
  var Functor = /*#__PURE__*/function () {
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

  _exports["default"] = Functor;
});