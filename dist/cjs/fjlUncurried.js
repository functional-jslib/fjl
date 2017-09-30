'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectOpsUncurried = require('./uncurried/objectOpsUncurried');

Object.keys(_objectOpsUncurried).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectOpsUncurried[key];
    }
  });
});

var _functionOpsUncurried = require('./uncurried/functionOpsUncurried');

Object.keys(_functionOpsUncurried).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _functionOpsUncurried[key];
    }
  });
});

var _listOpsUncurried = require('./uncurried/listOpsUncurried');

Object.keys(_listOpsUncurried).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _listOpsUncurried[key];
    }
  });
});

var _version = require('../generated-for-src/version');

Object.defineProperty(exports, 'version', {
  enumerable: true,
  get: function get() {
    return _version.version;
  }
});