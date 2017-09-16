(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/objectOps/objectOpsUncurried', './uncurried/functionOps/functionOpsUncurried', './uncurried/listOps/listOpsUncurried', '../generated-for-src/version'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/objectOps/objectOpsUncurried'), require('./uncurried/functionOps/functionOpsUncurried'), require('./uncurried/listOps/listOpsUncurried'), require('../generated-for-src/version'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectOpsUncurried, global.functionOpsUncurried, global.listOpsUncurried, global.version);
    global.fjlUncurried = mod.exports;
  }
})(this, function (exports, _objectOpsUncurried, _functionOpsUncurried, _listOpsUncurried, _version) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_objectOpsUncurried).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _objectOpsUncurried[key];
      }
    });
  });
  Object.keys(_functionOpsUncurried).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _functionOpsUncurried[key];
      }
    });
  });
  Object.keys(_listOpsUncurried).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _listOpsUncurried[key];
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