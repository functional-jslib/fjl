'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apply = require('./functionOps/apply');

Object.keys(_apply).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _apply[key];
    }
  });
});

var _call = require('./functionOps/call');

Object.keys(_call).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _call[key];
    }
  });
});

var _compose = require('./functionOps/compose');

Object.keys(_compose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _compose[key];
    }
  });
});

var _curry = require('./functionOps/curry');

Object.keys(_curry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry[key];
    }
  });
});

var _curry_ = require('./functionOps/curry_');

Object.keys(_curry_).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _curry_[key];
    }
  });
});

var _flip = require('./functionOps/flip');

Object.keys(_flip).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _flip[key];
    }
  });
});

var _id = require('./functionOps/id');

Object.keys(_id).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _id[key];
    }
  });
});

var _negate = require('./functionOps/negate');

Object.keys(_negate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _negate[key];
    }
  });
});

var _until = require('./functionOps/until');

Object.keys(_until).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _until[key];
    }
  });
});