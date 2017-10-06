'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectOps_ = require('./uncurried/objectOps_');

Object.keys(_objectOps_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectOps_[key];
    }
  });
});

var _functionOps_ = require('./uncurried/functionOps_');

Object.keys(_functionOps_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _functionOps_[key];
    }
  });
});

var _listOps_ = require('./uncurried/listOps_');

Object.keys(_listOps_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _listOps_[key];
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