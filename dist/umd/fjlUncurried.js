(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/objectOps_', './booleanOps', './uncurried/functionOps_', './uncurried/listOps_', './stringOps', './generated/version'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/objectOps_'), require('./booleanOps'), require('./uncurried/functionOps_'), require('./uncurried/listOps_'), require('./stringOps'), require('./generated/version'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectOps_, global.booleanOps, global.functionOps_, global.listOps_, global.stringOps, global.version);
    global.fjlUncurried = mod.exports;
  }
})(this, function (exports, _objectOps_, _booleanOps, _functionOps_, _listOps_, _stringOps, _version) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_objectOps_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectOps_[key];
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
  Object.keys(_functionOps_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _functionOps_[key];
      }
    });
  });
  Object.keys(_listOps_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _listOps_[key];
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
  Object.defineProperty(exports, 'version', {
    enumerable: true,
    get: function () {
      return _version.version;
    }
  });
});