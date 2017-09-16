define(['exports', './uncurried/objectOps/objectOpsUncurried', './uncurried/functionOps/functionOpsUncurried', './uncurried/listOps/listOpsUncurried', '../generated-for-src/version'], function (exports, _objectOpsUncurried, _functionOpsUncurried, _listOpsUncurried, _version) {
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