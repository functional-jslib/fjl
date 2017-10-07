(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/objectOps_', './uncurried/functionOps_', './uncurried/listOps_', './generated/version'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/objectOps_'), require('./uncurried/functionOps_'), require('./uncurried/listOps_'), require('./generated/version'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectOps_, global.functionOps_, global.listOps_, global.version);
    global.fjlUncurried = mod.exports;
  }
})(this, function (exports, _objectOps_, _functionOps_, _listOps_, _version) {
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
  Object.defineProperty(exports, 'version', {
    enumerable: true,
    get: function () {
      return _version.version;
    }
  });
});