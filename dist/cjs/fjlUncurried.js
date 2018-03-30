'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectOps = require('./uncurried/_objectOps/_objectOps');

Object.keys(_objectOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectOps[key];
    }
  });
});

var _booleanOps = require('./booleanOps');

Object.keys(_booleanOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _booleanOps[key];
    }
  });
});

var _functionOps = require('./uncurried/_functionOps/_functionOps');

Object.keys(_functionOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _functionOps[key];
    }
  });
});

var _listOps = require('./uncurried/_listOps/_listOps');

Object.keys(_listOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _listOps[key];
    }
  });
});

var _stringOps = require('./stringOps');

Object.keys(_stringOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _stringOps[key];
    }
  });
});