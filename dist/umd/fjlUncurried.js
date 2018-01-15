(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/_objectOps', './booleanOps', './uncurried/_functionOps', './uncurried/_listOps', './stringOps'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/_objectOps'), require('./booleanOps'), require('./uncurried/_functionOps'), require('./uncurried/_listOps'), require('./stringOps'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._objectOps, global.booleanOps, global._functionOps, global._listOps, global.stringOps);
    global.fjlUncurried = mod.exports;
  }
})(this, function (exports, _objectOps, _booleanOps, _functionOps, _listOps, _stringOps) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_objectOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectOps[key];
      }
    });
  });
  Object.keys(_booleanOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _booleanOps[key];
      }
    });
  });
  Object.keys(_functionOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _functionOps[key];
      }
    });
  });
  Object.keys(_listOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _listOps[key];
      }
    });
  });
  Object.keys(_stringOps).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _stringOps[key];
      }
    });
  });
});