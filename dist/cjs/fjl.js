'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectOps = require('./objectOps/objectOps');

Object.keys(_objectOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _objectOps[key];
    }
  });
});

var _booleanOps = require('./booleanOps/booleanOps');

Object.keys(_booleanOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _booleanOps[key];
    }
  });
});

var _functionOps = require('./functionOps/functionOps');

Object.keys(_functionOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _functionOps[key];
    }
  });
});

var _listOps = require('./listOps/listOps');

Object.keys(_listOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _listOps[key];
    }
  });
});

var _numberOps = require('./numberOps/numberOps');

Object.keys(_numberOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _numberOps[key];
    }
  });
});

var _stringOps = require('./stringOps/stringOps');

Object.keys(_stringOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _stringOps[key];
    }
  });
});

var _compoundedOps = require('./compoundedOps/compoundedOps');

Object.keys(_compoundedOps).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compoundedOps[key];
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