(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './Monad', '../subClassOf'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./Monad'), require('../subClassOf'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Monad, global.subClassOf);
    global.Identity = mod.exports;
  }
})(this, function (exports, _Monad, _subClassOf) {
  /**
   * Created by edlc on 12/9/16.
   */
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Identity = undefined;

  var _Monad2 = _interopRequireDefault(_Monad);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Identity = exports.Identity = (0, _subClassOf.subClassOf)(_Monad2.default, function Identity(value) {
    _Monad2.default.call(this, value);
  });

  exports.default = Identity;
});